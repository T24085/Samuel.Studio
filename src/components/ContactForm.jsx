import { useState } from 'react'
import { motion } from 'framer-motion'
import { submitInquiry } from '../lib/submitInquiry.js'
import { site } from '../data/site'
import { bookingServiceOptions } from '../data/services'

const initialState = {
  name: '',
  email: '',
  phone: '',
  service: '',
  preferredDate: '',
  message: '',
  website: '',
}

export function ContactForm() {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now())
  const isSubmitting = status === 'sending'

  function validate(nextValues) {
    const nextErrors = {}
    if (!nextValues.name.trim()) nextErrors.name = 'Please add your name.'
    if (!nextValues.email.trim()) nextErrors.email = 'Please add your email.'
    else if (!/^\S+@\S+\.\S+$/.test(nextValues.email)) nextErrors.email = 'Please enter a valid email.'
    if (!nextValues.phone.trim()) nextErrors.phone = 'Please add a phone number.'
    if (!nextValues.service.trim()) nextErrors.service = 'Please select a service.'
    if (!nextValues.preferredDate.trim()) nextErrors.preferredDate = 'Please select a preferred date.'
    if (!nextValues.message.trim()) nextErrors.message = 'Please tell us a little about the session.'
    return nextErrors
  }

  function onChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    if (status === 'error') {
      setStatus('idle')
      setFeedback('')
    }
  }

  async function onSubmit(event) {
    event.preventDefault()
    if (isSubmitting) return
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('sending')
    setFeedback('')

    try {
      await submitInquiry({ ...values, formStartedAt })

      setStatus('success')
      setValues(initialState)
      setErrors({})
    } catch {
      setStatus('error')
      setFeedback('Something went wrong while sending your inquiry. Please try again or email studiodefiant@gmail.com directly.')
    }
  }

  return (
    <div className="gold-frame scroll-mt-32 p-8">
      {status === 'success' ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs uppercase tracking-[0.36em] text-gold/80">Inquiry received</p>
          <h3 className="mt-4 font-display text-4xl text-ivory">Thank You. We Will Be in Touch Soon.</h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-parchment/72">
            Your inquiry has been sent to {site.email}. The studio will follow up with availability and next steps.
          </p>
          <button
            type="button"
            onClick={() => {
              setValues(initialState)
              setStatus('idle')
              setErrors({})
              setFeedback('')
              setFormStartedAt(Date.now())
            }}
            className="mt-8 inline-flex items-center justify-center rounded-full border border-gold/40 bg-gold/10 px-5 py-3 text-xs uppercase tracking-[0.3em] text-gold transition hover:border-gold/70"
          >
            Send another inquiry
          </button>
        </motion.div>
      ) : (
        <form id="booking-form" onSubmit={onSubmit}>
          <div className="hidden" aria-hidden="true">
            <label>
              Website
              <input name="website" value={values.website} onChange={onChange} tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Name" error={errors.name}>
              <input
                name="name"
                value={values.name}
                onChange={onChange}
                disabled={isSubmitting}
                autoComplete="name"
                maxLength={100}
                className="input-field"
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                name="email"
                type="email"
                value={values.email}
                onChange={onChange}
                disabled={isSubmitting}
                autoComplete="email"
                maxLength={254}
                className="input-field"
              />
            </Field>
            <Field label="Phone" error={errors.phone}>
              <input
                name="phone"
                value={values.phone}
                onChange={onChange}
                disabled={isSubmitting}
                autoComplete="tel"
                maxLength={60}
                className="input-field"
              />
            </Field>
            <Field label="Service" error={errors.service}>
              <select
                name="service"
                value={values.service}
                onChange={onChange}
                disabled={isSubmitting}
                className="input-field"
              >
                <option value="" disabled>
                  Select a service
                </option>
                {bookingServiceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Preferred Date" error={errors.preferredDate}>
              <input
                name="preferredDate"
                type="date"
                value={values.preferredDate}
                onChange={onChange}
                disabled={isSubmitting}
                className="input-field"
              />
            </Field>
          </div>
          <Field label="Message" error={errors.message} className="mt-5">
            <textarea
              name="message"
              rows={6}
              maxLength={4000}
              value={values.message}
              onChange={onChange}
              disabled={isSubmitting}
              className="input-field resize-none"
              placeholder="Tell us about your vision, wardrobe, timeline, and any details you want to preserve."
            />
          </Field>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full border border-gold/70 bg-gold/12 px-6 py-3 text-xs uppercase tracking-[0.3em] text-ivory transition hover:translate-y-[-1px] hover:border-gold hover:bg-gold/20 hover:text-gold-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Sending...' : 'Submit inquiry'}
            </button>
            <p className="text-xs uppercase tracking-[0.28em] text-parchment/45">
              Replies within one business day
            </p>
          </div>
          {feedback ? (
            <p className="mt-4 text-sm leading-6 text-red-200" aria-live="polite">
              {feedback}
            </p>
          ) : null}
        </form>
      )}
    </div>
  )
}

function Field({ label, error, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.34em] text-gold/80">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-xs text-red-300">{error}</span> : null}
    </label>
  )
}
