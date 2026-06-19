import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, Send, Sparkles, X } from 'lucide-react'
import {
  assistantChatUrl,
  assistantName,
  assistantSystemPrompt,
  chatLogEndpoint,
  ollamaModelCandidates,
} from '../data/assistant'
import { site, siteKey } from '../data/site'

const storageKey = 'samuel-studio-chat-assistant'
const requestTimeoutMs = 60000

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `chat_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

function createGreeting(profile) {
  const name = profile?.name?.trim()

  return {
    id: createId(),
    role: 'assistant',
    content: name
      ? `${assistantName} is ready, ${name}. Tell me what kind of session you are planning, what the images are for, and when you want to shoot.`
      : `${assistantName} is ready. Tell me what kind of session you are planning, what the images are for, and when you want to shoot.`,
    createdAt: Date.now(),
    source: 'seed',
  }
}

function normalizeClientProfile(profile) {
  if (!profile) {
    return null
  }

  const name = typeof profile.name === 'string' ? profile.name.trim() : ''
  const email = typeof profile.email === 'string' ? profile.email.trim() : ''
  const phone = typeof profile.phone === 'string' ? profile.phone.trim() : ''

  if (!name || !email || !phone) {
    return null
  }

  return { name, email, phone }
}

function loadChatState() {
  if (typeof window === 'undefined') {
    return {
      sessionId: createId(),
      messages: [createGreeting()],
    }
  }

  try {
    const raw = window.localStorage.getItem(storageKey)

    if (raw) {
      const parsed = JSON.parse(raw)

      if (typeof parsed.sessionId === 'string' && Array.isArray(parsed.messages) && parsed.messages.length > 0) {
        const clientProfile = normalizeClientProfile(parsed.clientProfile)

        return {
          sessionId: parsed.sessionId,
          messages: parsed.messages,
          clientProfile: clientProfile || undefined,
        }
      }
    }
  } catch {
    // Fall back to a fresh session when storage is unavailable or corrupt.
  }

  return {
    sessionId: createId(),
    messages: [createGreeting()],
  }
}

function saveChatState(state) {
  window.localStorage.setItem(storageKey, JSON.stringify(state))
}

function buildFallbackReply(userText) {
  const query = userText.toLowerCase()

  if (query.includes('price') || query.includes('pricing') || query.includes('cost')) {
    return [
      'Pricing depends on the session type, location, and deliverables, so I would rather scope it correctly than guess.',
      'What kind of session are you planning, and when do you want to shoot?',
    ].join(' ')
  }

  if (
    query.includes('campaign') ||
    query.includes('editorial') ||
    query.includes('lookbook') ||
    query.includes('launch') ||
    query.includes('brand')
  ) {
    return [
      'Editorial & Campaign Work is the best fit for launch visuals, lookbooks, and brand-led image sets.',
      'What is the launch date, and what do you want the images to do?',
    ].join(' ')
  }

  if (
    query.includes('personal brand') ||
    query.includes('founder') ||
    query.includes('speaker') ||
    query.includes('linkedin') ||
    query.includes('profile') ||
    query.includes('headshot')
  ) {
    return [
      'Personal Identity is the best fit for founder portraits, speaker images, and polished profile work.',
      'What is the audience, and where will these images be used?',
    ].join(' ')
  }

  if (query.includes('story') || query.includes('artist') || query.includes('narrative') || query.includes('creative')) {
    return [
      'Visual Story Projects are ideal when the images need to feel sequenced and intentional.',
      'What is the story, and what kind of mood should I note?',
    ].join(' ')
  }

  if (
    query.includes('family') ||
    query.includes('couple') ||
    query.includes('portrait') ||
    query.includes('milestone') ||
    query.includes('private')
  ) {
    return [
      'Private Portraits are the right fit for individuals, couples, families, and milestone sessions.',
      'What date and location should I put on the brief?',
    ].join(' ')
  }

  if (query.includes('booking') || query.includes('contact') || query.includes('email')) {
    return `Use the booking page or email ${site.email}. What kind of session are you planning?`
  }

  return 'Tell me what kind of session you need, what the images are for, and when you want to shoot.'
}

function requestAssistantReply(payload) {
  let lastError = null

  return Promise.resolve().then(async () => {
    for (const model of ollamaModelCandidates) {
      const controller = new AbortController()
      const timeoutId = window.setTimeout(() => controller.abort(), requestTimeoutMs)

      try {
        const response = await fetch(assistantChatUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
          body: JSON.stringify({
            assistant: payload.assistant,
            sessionId: payload.sessionId,
            pageUrl: payload.pageUrl,
            siteKey: payload.siteKey,
            clientProfile: payload.clientProfile,
            systemPrompt: assistantSystemPrompt,
            modelCandidates: ollamaModelCandidates,
            model,
            messages: payload.messages,
          }),
        })

        if (!response.ok) {
          lastError = new Error(`Assistant request failed with status ${response.status}`)
          continue
        }

        const data = await response.json()
        const content = data.content?.trim() || ''

        if (content) {
          return {
            content,
            model: data.model?.trim() || model,
            usedFallback: Boolean(data.usedFallback),
          }
        }
      } catch (error) {
        lastError = error
      } finally {
        window.clearTimeout(timeoutId)
      }
    }

    return {
      content: buildFallbackReply(payload.userText),
      model: 'fallback',
      usedFallback: true,
      error: lastError instanceof Error ? lastError.message : 'Assistant request failed.',
    }
  })
}

async function persistTranscript(payload) {
  if (!chatLogEndpoint) {
    return
  }

  const body = JSON.stringify({
    assistant: assistantName,
    sessionId: payload.sessionId,
    pageUrl: payload.pageUrl,
    siteKey: payload.siteKey,
    model: payload.model,
    clientProfile: payload.clientProfile,
    loggedAt: new Date().toISOString(),
    sendEmail: payload.sendEmail ?? false,
    messages: payload.messages,
  })

  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    const sent = navigator.sendBeacon(chatLogEndpoint, new Blob([body], { type: 'application/json' }))
    if (sent) {
      return
    }
  }

  await fetch(chatLogEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    keepalive: true,
  })
}

export function ChatAssistant() {
  const initialState = useMemo(() => loadChatState(), [])
  const reducedMotion = useReducedMotion()
  const [sessionId, setSessionId] = useState(initialState.sessionId)
  const [messages, setMessages] = useState(initialState.messages)
  const [clientProfile, setClientProfile] = useState(initialState.clientProfile ?? null)
  const [intakeDraft, setIntakeDraft] = useState({
    name: initialState.clientProfile?.name ?? '',
    email: initialState.clientProfile?.email ?? '',
    phone: initialState.clientProfile?.phone ?? '',
  })
  const [draft, setDraft] = useState('')
  const [open, setOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [intakeError, setIntakeError] = useState('')
  const [error, setError] = useState('')
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const intakeNameRef = useRef(null)

  const hasProfile = Boolean(clientProfile)
  const visibleMessages = hasProfile ? messages.slice(-24) : []

  useEffect(() => {
    saveChatState({
      sessionId,
      messages,
      clientProfile: clientProfile || undefined,
    })
  }, [clientProfile, messages, sessionId])

  useEffect(() => {
    if (!open) {
      return
    }

    if (!hasProfile) {
      intakeNameRef.current?.focus()
      return
    }

    inputRef.current?.focus()
  }, [hasProfile, open])

  useEffect(() => {
    const node = listRef.current
    if (!node || !hasProfile) {
      return
    }

    node.scrollTop = node.scrollHeight
  }, [hasProfile, messages, open, sending])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const handleIntakeChange = (field) => (event) => {
    setIntakeError('')
    setIntakeDraft((current) => ({
      ...current,
      [field]: event.target.value,
    }))
  }

  const handleIntakeSubmit = async (event) => {
    event.preventDefault()

    const nextProfile = normalizeClientProfile(intakeDraft)
    if (!nextProfile) {
      setIntakeError('Please add your name, email, and phone before starting the chat.')
      return
    }

    const nextSessionId = sessionId || createId()
    const nextGreeting = createGreeting(nextProfile)
    setSessionId(nextSessionId)
    setClientProfile(nextProfile)
    setMessages([nextGreeting])
    setDraft('')
    setError('')
    setIntakeError('')
    setOpen(true)

    try {
      await persistTranscript({
        sessionId: nextSessionId,
        pageUrl: window.location.href,
        siteKey,
        model: 'seed',
        clientProfile: nextProfile,
        messages: [nextGreeting],
      })
    } catch {
      // Logging should not block chat use.
    }
  }

  const handleSend = async () => {
    const text = draft.trim()
    if (!text || sending || !clientProfile) {
      return
    }

    const nextUserMessage = {
      id: createId(),
      role: 'user',
      content: text,
      createdAt: Date.now(),
    }
    const nextMessages = [...messages, nextUserMessage]

    setMessages(nextMessages)
    setDraft('')
    setSending(true)
    setError('')

    try {
      const reply = await requestAssistantReply({
        assistant: assistantName,
        sessionId,
        pageUrl: window.location.href,
        siteKey,
        clientProfile,
        messages: nextMessages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
        userText: text,
      })

      const assistantMessage = {
        id: createId(),
        role: 'assistant',
        content: reply.content,
        createdAt: Date.now(),
        source: reply.usedFallback ? 'fallback' : 'ollama',
        model: reply.model,
      }

      const updatedMessages = [...nextMessages, assistantMessage]
      setMessages(updatedMessages)

      await persistTranscript({
        sessionId,
        pageUrl: window.location.href,
        siteKey,
        model: reply.model,
        clientProfile,
        messages: updatedMessages,
      })
    } catch (requestError) {
      const assistantMessage = {
        id: createId(),
        role: 'assistant',
        content: buildFallbackReply(text),
        createdAt: Date.now(),
        source: 'fallback',
        model: 'fallback',
      }

      const updatedMessages = [...nextMessages, assistantMessage]
      setMessages(updatedMessages)
      setError(requestError instanceof Error ? requestError.message : 'The assistant is temporarily unavailable.')

      try {
        await persistTranscript({
          sessionId,
          pageUrl: window.location.href,
          siteKey,
          model: 'fallback',
          clientProfile,
          messages: updatedMessages,
        })
      } catch {
        // Ignore logging failures.
      }
    } finally {
      setSending(false)
    }
  }

  const onComposerKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void handleSend()
    }
  }

  return (
    <div className="fixed bottom-5 left-5 z-50 sm:bottom-6 sm:left-6">
      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close chat"
              className="fixed inset-0 z-40 cursor-default bg-black/40 backdrop-blur-[1px]"
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1 }}
              exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
              animate={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="relative z-50 flex h-[78vh] w-[min(92vw,26rem)] flex-col overflow-hidden rounded-[1.8rem] border border-gold/20 bg-[linear-gradient(180deg,rgba(11,11,11,0.96),rgba(6,6,6,0.98))] shadow-[0_28px_90px_rgba(0,0,0,0.45)] sm:h-[74vh]"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-[0.62rem] uppercase tracking-[0.36em] text-gold/70">Nova</p>
                  <h2 className="mt-2 font-display text-3xl leading-[0.92] text-ivory">Samuel Studio chat</h2>
                  <p className="mt-2 text-sm leading-6 text-parchment/68">
                    Tell me about the shoot, and I will help scope the right session path.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ivory transition hover:border-gold/50 hover:bg-gold/10"
                  aria-label="Close chat"
                >
                  <X size={18} />
                </button>
              </div>

              <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto px-4 py-3 sm:space-y-3 sm:px-5 sm:py-4">
                {hasProfile ? (
                  visibleMessages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))
                ) : (
                  <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-parchment/72">
                    Before we start, I need your name, email, and phone so the inquiry stays organized.
                  </div>
                )}

                {sending ? (
                  <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-parchment/72">
                    {assistantName} is thinking...
                  </div>
                ) : null}
              </div>

              <div className="border-t border-white/10 px-4 py-4 sm:px-5">
                {hasProfile ? (
                  <>
                    <div className="flex gap-3">
                      <textarea
                        ref={inputRef}
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        onKeyDown={onComposerKeyDown}
                        rows={3}
                        className="input-field min-h-[5.25rem] resize-none"
                        placeholder="Describe the shoot, the mood, and when you want it done..."
                      />
                      <button
                        type="button"
                        onClick={() => void handleSend()}
                        disabled={!draft.trim() || sending}
                        className="inline-flex h-[5.25rem] w-12 shrink-0 items-center justify-center rounded-[1rem] border border-gold/30 bg-gold/10 text-gold transition hover:border-gold/60 hover:bg-gold/20 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Send message"
                      >
                        <Send size={18} />
                      </button>
                    </div>

                    {error ? <p className="mt-3 text-xs leading-6 text-red-300">{error}</p> : null}
                  </>
                ) : (
                  <form
                    className="grid gap-3"
                    onSubmit={(event) => {
                      event.preventDefault()
                      void handleIntakeSubmit(event)
                    }}
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-[0.62rem] uppercase tracking-[0.32em] text-gold/70">Name</span>
                        <input
                          ref={intakeNameRef}
                          value={intakeDraft.name}
                          onChange={handleIntakeChange('name')}
                          className="input-field"
                          autoComplete="name"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-[0.62rem] uppercase tracking-[0.32em] text-gold/70">Email</span>
                        <input
                          value={intakeDraft.email}
                          onChange={handleIntakeChange('email')}
                          className="input-field"
                          autoComplete="email"
                        />
                      </label>
                    </div>

                    <label className="block">
                      <span className="mb-2 block text-[0.62rem] uppercase tracking-[0.32em] text-gold/70">Phone</span>
                      <input
                        value={intakeDraft.phone}
                        onChange={handleIntakeChange('phone')}
                        className="input-field"
                        autoComplete="tel"
                      />
                    </label>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-full border border-gold/70 bg-gold/12 px-5 py-3 text-xs uppercase tracking-[0.28em] text-ivory transition hover:border-gold hover:bg-gold/20 hover:text-gold-100"
                      >
                        Start chat
                      </button>
                      <p className="text-xs uppercase tracking-[0.24em] text-parchment/45">Need a faster path? Use booking.</p>
                    </div>

                    {intakeError ? <p className="text-xs leading-6 text-red-300">{intakeError}</p> : null}
                  </form>
                )}
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        animate={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="group inline-flex items-center gap-3 rounded-full border border-gold/40 bg-[linear-gradient(180deg,rgba(245,240,230,0.14),rgba(198,161,91,0.18)),linear-gradient(135deg,rgba(17,17,17,0.92),rgba(10,51,45,0.88))] px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-ivory shadow-[0_18px_50px_rgba(0,0,0,0.34),0_0_0_1px_rgba(198,161,91,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-gold/70 hover:text-gold-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/55 focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:px-5"
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
      >
        <span className="relative z-10 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full rounded-full bg-gold/60 opacity-75 transition group-hover:opacity-100" />
          <span className="relative inline-flex h-3 w-3 rounded-full border border-gold/70 bg-gold/35" />
        </span>
        <span className="relative z-10">{open ? 'Close chat' : 'Chat with Nova'}</span>
        <Sparkles size={16} className="relative z-10 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </motion.button>
    </div>
  )
}

function MessageBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={[
          'max-w-[90%] rounded-[1.15rem] px-3 py-2 text-[0.82rem] leading-6 sm:max-w-[88%] sm:rounded-[1.4rem] sm:px-4 sm:py-3 sm:text-sm sm:leading-7',
          isUser
            ? 'border border-gold/24 bg-gold/12 text-ivory'
            : 'border border-white/10 bg-white/[0.03] text-parchment/76',
        ].join(' ')}
      >
        <div className="mb-1 flex items-center gap-2 text-[0.5rem] uppercase tracking-[0.18em] text-gold/60 sm:text-[0.58rem] sm:tracking-[0.24em]">
          {isUser ? 'You' : assistantName}
        </div>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  )
}
