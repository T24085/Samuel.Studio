import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { services } from '../data/services'

function ServiceGatewayCard({ service, index, reduceMotion }) {
  const preview = service.included.slice(0, 3)

  return (
    <motion.article
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, ease: 'easeOut', delay: index * 0.06 }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className="group relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)_28%,rgba(0,0,0,0.28))] shadow-[0_24px_90px_rgba(0,0,0,0.28)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-90 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          backgroundImage:
            'radial-gradient(circle at 16% 12%, rgba(198,161,91,0.18), transparent 22%), radial-gradient(circle at 86% 8%, rgba(255,255,255,0.08), transparent 18%), linear-gradient(145deg, rgba(255,255,255,0.06), transparent 40%)',
        }}
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="px-6 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-display text-5xl leading-none tracking-[-0.06em] text-ivory/16 md:text-6xl">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="rounded-full border border-gold/20 bg-black/20 px-4 py-2 text-[0.66rem] uppercase tracking-[0.32em] text-gold/82">
              {service.label}
            </span>
          </div>

          <p className="mt-6 text-[0.64rem] uppercase tracking-[0.36em] text-gold/65">{service.eyebrow}</p>
          <h2 className="mt-4 max-w-3xl font-display text-[2.5rem] leading-[0.92] tracking-[-0.055em] text-ivory sm:text-[3.2rem] lg:text-[3.8rem]">
            {service.title}
          </h2>
          <p className="mt-5 max-w-2xl text-[1rem] leading-8 text-parchment/74">{service.subheader}</p>

          <p className="mt-7 max-w-2xl text-sm leading-7 text-parchment/68 sm:text-[0.98rem]">
            {service.description[0]}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.62rem] uppercase tracking-[0.3em] text-parchment/72">
              {service.mood}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.62rem] uppercase tracking-[0.3em] text-parchment/72">
              {service.audience}
            </span>
          </div>
        </div>

        <div className="border-t border-white/10 bg-black/20 px-6 py-7 sm:px-8 sm:py-9 lg:border-l lg:border-t-0 lg:px-9 lg:py-10">
          <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-[0.64rem] uppercase tracking-[0.34em] text-gold/68">Included preview</p>
            <ul className="mt-4 space-y-3">
              {preview.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-parchment/76">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.025] px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-gold/60">Audience</p>
              <p className="mt-2 text-sm leading-7 text-parchment/72">{service.audience}</p>
            </div>
            <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.025] px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-gold/60">Mood</p>
              <p className="mt-2 text-sm leading-7 text-parchment/72">{service.mood}</p>
            </div>
          </div>

          <p className="mt-6 text-sm leading-7 text-parchment/66">
            {service.quote}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to={`/services/${service.slug}`}
              className="group inline-flex items-center justify-between gap-4 rounded-full border border-gold/35 bg-[linear-gradient(180deg,rgba(198,161,91,0.24),rgba(198,161,91,0.1))] px-6 py-4 text-xs uppercase tracking-[0.3em] text-ivory transition duration-300 hover:border-gold/70 hover:bg-[linear-gradient(180deg,rgba(198,161,91,0.34),rgba(198,161,91,0.12))]"
            >
              <span>{service.cta}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <div className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-4 text-[0.62rem] uppercase tracking-[0.3em] text-parchment/72">
              View full details
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function ServicesPage() {
  const reduceMotion = useReducedMotion()

  return (
    <>
      <SEO
        title="Services"
        description="Samuel Studio services for editorial campaigns, personal identity, visual story projects, and private portrait commissions."
        path="/services"
      />

      <main className="relative isolate overflow-hidden bg-[#070605] text-ivory">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#0d0b09_0%,#090807_42%,#050505_100%)]" />
          <motion.div
            aria-hidden="true"
            className="absolute left-[-10%] top-[-12%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(198,161,91,0.22),transparent_65%)] blur-3xl"
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, 18, 0],
                    y: [0, 14, 0],
                    opacity: [0.45, 0.7, 0.45],
                  }
            }
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute right-[-12%] top-[16%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_68%)] blur-3xl"
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, -16, 0],
                    y: [0, -10, 0],
                    opacity: [0.3, 0.5, 0.3],
                  }
            }
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,rgba(245,240,230,0.92)_1px,transparent_0)] [background-size:18px_18px]" />
        </div>

        <div className="relative z-10">
          <section className="studio-shell pt-24 pb-12 sm:pt-28 lg:pb-16 lg:pt-32">
            <div className="grid gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:items-end">
              <div className="max-w-5xl">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-gold/70">Services</p>
                <h1 className="mt-6 max-w-5xl font-display text-[3.2rem] leading-[0.86] tracking-[-0.055em] text-ivory sm:text-6xl md:text-[4.6rem] lg:text-[5.7rem] xl:text-[6.5rem]">
                  Cinematic services <span className="italic text-gold/90">built as gateways</span>
                  <span className="block">into bespoke image-making.</span>
                </h1>
                <p className="mt-8 max-w-2xl text-base leading-8 text-parchment/74 md:text-lg">
                  Four distinct commissions, each shaped with the same editorial discipline: clear direction, refined
                  atmosphere, and final imagery that feels considered from first frame to delivery.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  {services.map((service) => (
                    <span
                      key={service.slug}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-[0.64rem] uppercase tracking-[0.3em] text-parchment/76"
                    >
                      {service.label}
                    </span>
                  ))}
                </div>
              </div>

              <aside className="relative overflow-hidden rounded-[2.2rem] border border-gold/16 bg-[linear-gradient(180deg,rgba(14,12,10,0.98),rgba(5,5,5,0.98))] p-7 shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-[22px] sm:p-8 lg:p-9">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-90"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 18% 18%, rgba(198,161,91,0.16), transparent 24%), radial-gradient(circle at 84% 14%, rgba(255,255,255,0.06), transparent 20%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.14))',
                  }}
                />
                <div aria-hidden="true" className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent" />
                <div aria-hidden="true" className="absolute inset-y-8 left-6 w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent" />

                <div className="relative">
                  <p className="text-[0.67rem] uppercase tracking-[0.38em] text-gold/72">What to expect</p>
                  <p className="mt-6 max-w-sm font-display text-3xl leading-[0.92] tracking-[-0.04em] text-ivory">
                    A curated service menu, not a generic package grid.
                  </p>

                  <div className="mt-7 space-y-4 text-sm leading-7 text-parchment/74">
                    <p>Every commission is tailored around audience, use case, and visual atmosphere.</p>
                    <p>Planning includes concept direction, tone-setting, and a guided creative process.</p>
                    <p>The delivery is built to hold up across web, print, social, and campaign systems.</p>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {['Editorial campaigns', 'Personal identity', 'Visual stories', 'Private portraits'].map((item) => (
                      <div
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-[0.67rem] uppercase tracking-[0.26em] text-parchment/78"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-[1.4rem] border border-white/10 bg-black/20 px-5 py-4">
                    <p className="text-[0.64rem] uppercase tracking-[0.34em] text-gold/68">Studio cadence</p>
                    <p className="mt-2 text-sm leading-7 text-parchment/72">
                      By appointment, with limited commissions held to preserve attention and quality.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <section className="studio-shell pb-14 lg:pb-18">
            <div className="relative overflow-hidden rounded-full border border-white/10 bg-white/[0.03] px-5 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-80"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(198,161,91,0.05) 24%, rgba(255,255,255,0.02) 52%, rgba(198,161,91,0.04) 76%, rgba(255,255,255,0.02))',
                }}
              />
              <div className="relative flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.64rem] uppercase tracking-[0.34em] text-parchment/68">
                <span className="text-gold/70">Selected for</span>
                <span className="text-white/20">/</span>
                <span>Fashion labels</span>
                <span className="text-white/20">/</span>
                <span>Founders</span>
                <span className="text-white/20">/</span>
                <span>Narrative campaigns</span>
                <span className="text-white/20">/</span>
                <span>Private portrait sessions</span>
              </div>
            </div>
          </section>

          <section className="studio-shell pb-18 lg:pb-24">
            <div className="space-y-6 lg:space-y-8">
              {services.map((service, index) => (
                <ServiceGatewayCard key={service.slug} service={service} index={index} reduceMotion={reduceMotion} />
              ))}
            </div>
          </section>

          <section className="studio-shell pb-24 lg:pb-28">
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-[2.6rem] border border-white/10 bg-[#040404] px-7 py-16 sm:px-10 sm:py-20 lg:min-h-[28rem] lg:px-16 lg:py-24"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 16% 14%, rgba(198,161,91,0.16), transparent 26%), radial-gradient(circle at 78% 18%, rgba(255,255,255,0.08), transparent 20%), radial-gradient(circle at 50% 100%, rgba(198,161,91,0.06), transparent 35%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.18))',
                }}
              />
              <div aria-hidden="true" className="absolute inset-y-0 left-8 hidden w-px bg-gradient-to-b from-transparent via-gold/35 to-transparent lg:block" />
              <div
                aria-hidden="true"
                className="absolute -right-8 -top-10 font-display text-[8rem] uppercase tracking-[-0.08em] text-ivory/5 sm:text-[10rem] lg:text-[14rem]"
              >
                story
              </div>

              <div className="relative grid gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:items-end">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-gold/70">Studio position</p>
                  <h2 className="mt-5 max-w-4xl font-display text-4xl leading-[0.9] tracking-[-0.05em] text-ivory md:text-6xl lg:text-[5.2rem] xl:text-[6rem]">
                    Four routes, one editorial standard.
                    <span className="block italic text-gold/90">Every project starts with direction.</span>
                  </h2>
                </div>

                <p className="max-w-xl text-sm leading-8 text-parchment/72 md:text-base">
                  Each service page expands the offer into a dedicated commission flow so clients can understand the
                  positioning, the process, and the final result before they inquire.
                </p>
              </div>

              <div className="relative mt-12 grid gap-4 sm:grid-cols-3">
                {['Concept first', 'Tailored delivery', 'Limited booking calendar'].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.3rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-parchment/76"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="studio-shell pb-24 lg:pb-28">
            <div className="grid gap-8 rounded-[2.4rem] border border-gold/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(17,17,17,0.92))] p-7 shadow-[0_28px_100px_rgba(0,0,0,0.34)] sm:p-10 lg:grid-cols-[1.08fr_0.92fr] lg:p-12">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-gold/70">Inquiry</p>
                <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[0.92] tracking-[-0.04em] text-ivory md:text-5xl xl:text-[4.5rem]">
                  Ready to choose the right commission path?
                </h2>
                <p className="mt-6 max-w-2xl text-sm leading-8 text-parchment/72 md:text-base">
                  Explore the full service pages for details, then move into booking or direct contact when the
                  direction feels right.
                </p>
              </div>

              <div className="flex flex-col justify-end gap-4">
                <Link
                  to="/booking"
                  className="group relative inline-flex items-center justify-between gap-4 overflow-hidden rounded-full border border-gold/40 bg-[linear-gradient(180deg,rgba(198,161,91,0.24),rgba(198,161,91,0.1))] px-6 py-4 text-xs uppercase tracking-[0.3em] text-ivory shadow-[0_16px_42px_rgba(0,0,0,0.28)] transition duration-300 hover:border-gold/70 hover:bg-[linear-gradient(180deg,rgba(198,161,91,0.34),rgba(198,161,91,0.12))] hover:shadow-[0_20px_55px_rgba(0,0,0,0.38)]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1/2 -translate-x-[130%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)] transition-transform duration-700 group-hover:translate-x-[260%]"
                  />
                  <span className="relative">Inquire about a project</span>
                  <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-between gap-4 rounded-full border border-white/12 bg-white/[0.03] px-6 py-4 text-xs uppercase tracking-[0.3em] text-parchment/82 transition duration-300 hover:border-gold/35 hover:bg-white/[0.05] hover:text-ivory"
                >
                  <span>Book a consultation</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <div className="mt-2 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-gold/65">
                  <Sparkles className="h-4 w-4" />
                  <span>Refined response within 1-2 business days</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
