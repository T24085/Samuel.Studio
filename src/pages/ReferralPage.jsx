import { ArrowUpRight, Camera, Code2, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { partnerEmail, partnerEmailHref, referralOffer, referralQuestions, referralSteps } from '../data/referrals'
import { withBase } from '../utils/paths'

export function ReferralPage() {
  return (
    <>
      <SEO title="Referral Partners" description={`Refer photography, websites, and applications to Samuel Studio. Earn ${referralOffer}`} path="/refer" />
      <section className="relative isolate mt-20 overflow-hidden bg-black text-ivory">
        <img src={withBase('photos/portfolio-intake/creative-portraits/01.webp')} alt="Portrait reflected in a red sports car mirror, photographed by Samuel Cary." className="absolute inset-0 h-full w-full object-cover object-[68%_center]" fetchPriority="high" />
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
        <div className="studio-shell relative flex min-h-[30rem] flex-col justify-center py-12 sm:min-h-[34rem] sm:py-16">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-100">Samuel Studio</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl leading-tight sm:text-6xl">Referral Partners</h1>
          <p className="mt-5 max-w-xl text-xl leading-8 text-ivory">Know someone who needs photographs or a website? Introduce us.</p>
          <p className="mt-5 max-w-xl text-base leading-7 text-ivory">Earn <strong>{referralOffer}</strong></p>
          <div className="mt-7 flex flex-wrap gap-4">
            <a href={partnerEmailHref} className="inline-flex min-h-12 items-center gap-3 rounded-lg border border-ivory/60 bg-ink/80 px-5 py-3 text-sm text-ivory transition hover:bg-ink"><Mail size={18} aria-hidden="true" /> Request Partner Information</a>
            <Link to="/booking#booking-form" className="inline-flex min-h-12 items-center gap-2 px-1 py-3 text-sm text-ivory underline underline-offset-4">Send Someone to the Inquiry Form <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="border-b border-white/15 bg-ink text-ivory">
        <div className="studio-shell grid gap-8 py-12 md:grid-cols-3">
          {referralSteps.map((step, index) => (
            <div key={step.title}>
              <p className="text-sm text-gold">0{index + 1}</p>
              <h2 className="mt-3 font-display text-2xl leading-tight">{step.title}</h2>
              <p className="mt-4 text-sm leading-7 text-parchment/80">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="studio-shell py-14 text-ivory sm:py-20" aria-labelledby="referral-services">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">What You Can Refer</p>
        <h2 id="referral-services" className="mt-4 font-display text-4xl leading-tight">Creative Work. Useful Introductions.</h2>
        <div className="mt-9 grid gap-10 md:grid-cols-2">
          <div className="border-t border-white/20 pt-6">
            <Camera size={25} className="text-gold" aria-hidden="true" />
            <h3 className="mt-4 font-display text-3xl">Photography</h3>
            <p className="mt-4 max-w-xl text-base leading-8 text-parchment/80">Personal portraits and dating-profile photographs. Headshots, personal branding, and team sessions. Fashion, campaign work, and private or business events.</p>
            <Link to="/portfolio" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-gold underline underline-offset-4">See the Photographs <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="border-t border-white/20 pt-6">
            <Code2 size={25} className="text-gold" aria-hidden="true" />
            <h3 className="mt-4 font-display text-3xl">Websites & Applications</h3>
            <p className="mt-4 max-w-xl text-base leading-8 text-parchment/80">Business websites, website refreshes, and online portfolios. Booking and inquiry workflows. Custom applications and integrations, scoped around the business.</p>
            <a href="https://dev.samuel.studio/" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-gold underline underline-offset-4">Explore Web Services <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
        <p className="mt-10 max-w-3xl border-l-2 border-gold/60 pl-5 text-base leading-8 text-parchment/80">A new business may need both: portraits of the people behind it and a website that puts the work in front of customers. You can introduce the whole project; Sam will work out the scope.</p>
      </section>

      <section className="border-y border-white/15 bg-white/[0.025] text-ivory">
        <div className="studio-shell py-14 sm:py-16">
          <h2 className="font-display text-4xl leading-tight">What 20% Looks Like</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[[500, 100], [1500, 300], [3000, 600]].map(([fee, commission]) => (
              <div key={fee} className="border-t border-white/20 pt-5">
                <p className="text-sm text-parchment/80">${fee.toLocaleString('en-US')} in eligible service fees</p>
                <p className="mt-3 font-display text-4xl text-gold">${commission.toLocaleString('en-US')}</p>
                <p className="mt-2 text-sm text-parchment/80">Referral commission</p>
              </div>
            ))}
          </div>
          <p className="mt-7 text-sm leading-7 text-parchment/70">Illustrative calculations, not package prices or guaranteed earnings. Each client&apos;s first eligible paid project is considered separately.</p>
        </div>
      </section>

      <section className="studio-shell py-14 text-ivory sm:py-20" aria-labelledby="referral-details">
        <h2 id="referral-details" className="font-display text-4xl leading-tight">A Few Details</h2>
        <div className="mt-8 max-w-4xl divide-y divide-white/15 border-y border-white/15">
          {referralQuestions.map(item => (
            <details key={item.question} className="py-5">
              <summary className="cursor-pointer pr-4 text-base font-medium leading-7 text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">{item.question}</summary>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-parchment/80">{item.answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-7 max-w-3xl text-sm leading-7 text-parchment/70">Be open about the arrangement when recommending the studio: &ldquo;I may earn a referral fee if you book.&rdquo; Referral details submitted by a client are checked before commission is approved.</p>
      </section>

      <section className="border-t border-white/15 bg-emerald-950/30 text-ivory">
        <div className="studio-shell py-14 pb-28 sm:py-16 sm:pb-24">
          <h2 className="max-w-2xl font-display text-4xl leading-tight">Start With a Conversation.</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-parchment/80">Tell Sam a little about yourself and whether you are interested in photography, web services, or both. Partner details and payment arrangements are confirmed directly before you get started.</p>
          <a href={partnerEmailHref} className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-lg border border-gold/60 px-5 py-3 text-sm text-ivory transition hover:bg-white/5"><Mail size={18} aria-hidden="true" /> Request Partner Information</a>
          <a href={`mailto:${partnerEmail}`} className="mt-5 block w-fit break-all text-sm text-parchment/80 underline underline-offset-4">{partnerEmail}</a>
        </div>
      </section>
    </>
  )
}
