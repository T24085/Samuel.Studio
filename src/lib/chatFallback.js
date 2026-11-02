export function buildFallbackReply(messages, email) {
  const users = messages.filter((message) => message.role === 'user')
  const latest = users.at(-1)?.content ?? ''
  const text = users.map((message) => message.content).join('\n').toLowerCase()
  const latestText = latest.toLowerCase()
  const facts = {
    purpose: '',
    timing: /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday|today|tomorrow|weekend|next week|next month|this week|this month|january|february|march|april|may|june|july|august|september|october|november|december|flexible|no rush|not sure when|no date yet)\b|\bin (?:about )?(?:\d+|a|one|two|three|four|five|six|several) (?:days?|weeks?|months?)\b|\b\d{4}-\d{2}-\d{2}\b|\b\d{1,2}\/\d{1,2}\b/.test(text),
    location: /\b(houston|katy|cypress|woodlands|sugar land|austin|studio|outdoor|outdoors|on location|at home|office|park|beach|downtown)\b/.test(text),
    style: /\b(candid|natural|relaxed|casual|formal|dramatic|cinematic|bright|moody|black and white|wardrobe|outfits?|styling)\b/.test(text),
  }

  // Short answers to the preceding question count even without a known keyword.
  for (let index = 1; index < messages.length; index += 1) {
    const answer = messages[index]
    const question = messages[index - 1]
    if (answer.role !== 'user' || question.role !== 'assistant' || !answer.content.trim()) continue
    // Questions about pricing or another topic are not answers to the previous slot.
    if (/\b(price|pricing|cost|how much|why|what do you|can you explain)\b/i.test(answer.content)) continue
    if (answer.content.includes('?') && !/\b(help|suggest|recommend|choose)\b/i.test(answer.content)) continue
    const prompt = question.content.toLowerCase()
    if (/what kind of photographs|what will you use them for/.test(prompt)) facts.purpose = 'We can plan the session around those photographs.'
    if (/when would you|date or timing/.test(prompt)) facts.timing = true
    if (/where would you|location do you/.test(prompt)) facts.location = true
    if (/look or mood|style do you/.test(prompt)) facts.style = true
  }

  if (/\b(website|websites|web app|application|app development)\b/.test(text)) {
    return 'For website and application projects, explore https://dev.samuel.studio or email ' + email + ' with what you want to build. Samuel can help scope the project and next steps.'
  } else if (/\b(conference|corporate event|events?|sweet ?16|wedding|engagement party)\b/.test(text)) {
    facts.purpose = 'We can discuss photography for your event and the moments you want covered.'
  } else if (/\b(dating|tinder|bumble|hinge)\b/.test(text)) {
    facts.purpose = 'Dating-profile portraits can focus on natural expressions and photographs that feel like you.'
  } else if (/\b(personal brand|founder|speaker|linkedin|headshots?|professional|team)\b/.test(text)) {
    facts.purpose = 'Personal branding and professional portraits can be planned around you and the work you do.'
  } else if (/\b(boudoir|intimate)\b/.test(text)) {
    facts.purpose = 'An intimate portrait session can be planned around your comfort and the look you have in mind.'
  } else if (/\b(campaign|editorial|lookbook|launch|brand|fashion)\b/.test(text)) {
    facts.purpose = 'We can plan the editorial or campaign shoot around the brief, styling, and how the photographs will be used.'
  } else if (/\b(story|artist|musician|creative)\b/.test(text)) {
    facts.purpose = 'We can build a creative portrait session around your idea and the photographs you need.'
  } else if (/\b(family|couple|portraits?|milestone|private|engagement|birthday)\b/.test(text)) {
    facts.purpose = 'We can plan a portrait session around you and the occasion.'
  }

  if (/\b(contact|email|booking)\b|\b(?:want to|like to|ready to|can i|how (?:do|can) i) book\b|\bbook (?:a|the|my|your|it|this)\b/.test(latestText)) {
    return `You can send a session inquiry through the booking page or email ${email}. Samuel will confirm the details and availability.`
  }

  const pricing = /\b(price|pricing|cost|budget|how much)\b/.test(latestText)
    ? 'Pricing depends on the shoot and the finished image selection; Samuel can quote once the details are clear. '
    : ''
  const intro = users.length === 1 ? facts.purpose : ''
  const question = !facts.purpose
    ? 'What kind of photographs would you like, and what will you use them for?'
    : !facts.timing
      ? 'When would you like to shoot? A rough timeframe is fine.'
      : !facts.location
        ? 'Where would you like to shoot, or would you like help choosing a location?'
        : !facts.style
          ? 'What look or mood do you have in mind, or would you like some suggestions?'
          : `You can add those details to the booking form or email ${email} so Samuel can follow up with availability and a quote.`

  return [pricing.trim(), intro, question].filter(Boolean).join(' ')
}
