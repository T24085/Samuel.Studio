import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { services } from '../data/services'

const serviceTreatments = [
  {
    mood: 'Sharper light, higher contrast',
    audience: 'Fashion labels, campaign worlds, lookbooks',
    note: 'Built for collection launches and polished editorial seasons.',
    accent: 'rgba(198,161,91,0.35)',
    glow: 'rgba(198,161,91,0.18)',
    chip: 'Fashion energy',
  },
  {
    mood: 'Warmer, polished, assured',
    audience: 'Founders, influencers, visible personal brands',
    note: 'Designed to carry authority without losing warmth or ease.',
    accent: 'rgba(233,197,141,0.3)',
    glow: 'rgba(233,197,141,0.14)',
    chip: 'Signature tier',
  },
  {
    mood: 'Moodier, slower, cinematic',
    audience: 'Startups, artists, concept-driven launches',
    note: 'More atmosphere, more sequence, more emotional pacing.',
    accent: 'rgba(160,130,87,0.3)',
    glow: 'rgba(160,130,87,0.14)',
    chip: 'Narrative-led',
  },
  {
    mood: 'Softer, intimate, quieter',
    audience: 'Private portrait clients, personal keepsakes',
    note: 'Private sessions with a calm pace and refined final imagery.',
    accent: 'rgba(245,240,230,0.26)',
    glow: 'rgba(245,240,230,0.12)',
    chip: 'Private session',
  },
]

function ServicePanel({ service, index, reduceMotion }) {
  const treatment = serviceTreatments[index]
  const reversed = false
  const leftColumnClass = reversed ? 'lg:order-2' : 'lg:order-1'
  const rightColumnClass = reversed ? 'lg:order-1' : 'lg:order-2'

  return (
    <motion.article
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 32 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      whileHover={reduceMotion ? undefined : { y: -7 }}
      className="group relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02)_38%,rgba(0,0,0,0.22))] backdrop-blur-2xl"
      style={{
        boxShadow: `0 28px 90px rgba(0,0,0,0.34), 0 0 0 1px rgba(255,255,255,0.02), 0 0 40px -18px ${treatment.glow}`,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-90 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          backgroundImage: `linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02) 34%, rgba(0,0,0,0.12) 100%), radial-gradient(circle at 16% 18%, ${treatment.glow}, transparent 30%), radial-gradient(circle at 84% 10%, rgba(255,255,255,0.08), transparent 22%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px opacity-80"
        style={{ backgroundImage: `linear-gradient(90deg, transparent, ${treatment.accent}, transparent)` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-px opacity-80"
        style={{ backgroundImage: `linear-gradient(180deg, transparent, ${treatment.accent}, transparent)` }}
      />

      <div className="relative grid gap-0 lg:grid-cols-[1.06fr_0.94fr]">
        <div className={`${leftColumnClass} px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12`}>
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-display text-5xl leading-none tracking-[-0.05em] text-ivory/12 md:text-6xl lg:text-7xl">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="rounded-full border border-gold/18 bg-black/20 px-4 py-2 text-[0.66rem] uppercase tracking-[0.32em] text-gold/80">
              {service.label}
            </span>
          </div>

          <p className="mt-6 max-w-2xl text-[0.66rem] uppercase tracking-[0.34em] text-gold/60">{treatment.audience}</p>

          <h2 className="mt-5 max-w-2xl font-display text-[2.9rem] leading-[0.88] tracking-[-0.05em] text-ivory md:text-5xl lg:text-[4rem] xl:text-[4.6rem]">
            {service.title}
          </h2>

          <p className="mt-6 max-w-2xl text-[0.98rem] leading-8 text-parchment/74 md:text-[1.05rem]">
            {service.description}
          </p>

          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
            <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-4">
              <p className="text-[0.64rem] uppercase tracking-[0.32em] text-gold/65">Atmosphere</p>
              <p className="mt-2 text-sm leading-7 text-parchment/76">{treatment.mood}</p>
            </div>
            <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-4">
              <p className="text-[0.64rem] uppercase tracking-[0.32em] text-gold/65">Brief note</p>
              <p className="mt-2 text-sm leading-7 text-parchment/76">{treatment.note}</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold/70">
            <span>Quote only</span>
            <span className="text-gold/35">/</span>
            <span className="normal-case tracking-[0.18em] text-parchment/70">{service.quote}</span>
          </div>
        </div>

        <div
          className={`${rightColumnClass} border-t border-white/10 bg-black/22 px-6 py-8 sm:px-8 sm:py-10 lg:border-l lg:border-t-0 lg:px-10 lg:py-12`}
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.34em] text-gold/70">Engagement</p>
              <p className="mt-3 font-display text-3xl leading-none tracking-[-0.04em] text-ivory md:text-4xl">By inquiry</p>
            </div>
          </div>

          <div className="mt-8 rounded-[1.4rem] border border-white/10 bg-white/[0.025] p-5">
            <p className="text-[0.64rem] uppercase tracking-[0.34em] text-gold/68">Designed for</p>
            <p className="mt-3 text-sm leading-7 text-parchment/76">{treatment.audience}</p>
          </div>

          <ul className="mt-8 space-y-3">
            {service.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-7 text-parchment/76">
                <Check className="mt-1 h-4 w-4 shrink-0 text-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3">
            <Link
              to="/booking"
              className="group relative inline-flex items-center justify-between gap-4 overflow-hidden rounded-full border border-gold/36 bg-[linear-gradient(180deg,rgba(198,161,91,0.24),rgba(198,161,91,0.1))] px-6 py-4 text-xs uppercase tracking-[0.3em] text-ivory shadow-[0_14px_38px_rgba(0,0,0,0.26)] transition duration-300 hover:border-gold/65 hover:bg-[linear-gradient(180deg,rgba(198,161,91,0.34),rgba(198,161,91,0.12))] hover:shadow-[0_18px_50px_rgba(0,0,0,0.34)]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1/2 -translate-x-[130%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)] transition-transform duration-700 group-hover:translate-x-[260%]"
              />
              <span className="relative">{service.cta}</span>
              <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <p className="text-xs leading-6 text-parchment/58">
              Each commission is shaped around the brief, the atmosphere, and the final use of the imagery.
            </p>
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
        description="Samuel Studio services for editorial campaigns, personal brand identity, visual story projects, and private portrait commissions."
        path="/services"
      />

      <main className="relative isolate overflow-hidden bg-[#070605] text-ivory">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#0d0b09_0%,#090807_38%,#050505_100%)]" />
          <motion.div
            aria-hidden="true"
            className="absolute left-[-8%] top-[-10%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(198,161,91,0.22),transparent_65%)] blur-3xl"
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, 22, 0],
                    y: [0, 18, 0],
                    opacity: [0.45, 0.72, 0.45],
                  }
            }
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute right-[-10%] top-[16%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_68%)] blur-3xl"
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, -18, 0],
                    y: [0, -12, 0],
                    opacity: [0.35, 0.55, 0.35],
                  }
            }
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,rgba(245,240,230,0.95)_1px,transparent_0)] [background-size:18px_18px]" />
        </div>

        <div className="relative z-10">
          <section className="studio-shell pt-24 pb-12 sm:pt-28 lg:pb-16 lg:pt-32">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div className="max-w-5xl">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-gold/70">Services</p>
                <h1 className="mt-6 max-w-5xl font-display text-[3.2rem] leading-[0.86] tracking-[-0.055em] text-ivory sm:text-6xl md:text-[4.6rem] lg:text-[5.6rem] xl:text-[6.4rem]">
                  Cinematic imagery <span className="italic text-gold/90">crafted with intention,</span>
                  <span className="block">identity, and narrative depth.</span>
                </h1>
                <p className="mt-8 max-w-2xl text-base leading-8 text-parchment/74 md:text-lg">
                  A limited, highly directed studio experience for fashion labels, founders, and private clients who want
                  work that feels editorial, emotionally precise, and unmistakably premium.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  {['Editorial campaigns', 'Brand identity', 'Narrative projects', 'Private portraits'].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-[0.64rem] uppercase tracking-[0.3em] text-parchment/76"
                    >
                      {item}
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
                    A studio process, not a package menu.
                  </p>

                  <div className="mt-7 space-y-4 text-sm leading-7 text-parchment/74">
                    <p>Creative direction that starts with mood, context, and use case.</p>
                    <p>Calm, editorial pacing designed to keep the session polished and efficient.</p>
                    <p>Retouching that preserves texture, depth, and the natural elegance of the subject.</p>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {['Fashion brands', 'Founders', 'Private clients', 'By inquiry'].map((item) => (
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
                  <p className="mt-2 text-sm leading-7 text-parchment/72">By appointment, with limited commissions held to preserve attention and quality.</p>
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

          <section className="studio-shell pb-16 lg:pb-24">
            <div className="space-y-6 lg:space-y-8">
              {services.map((service, index) => (
                <ServicePanel key={service.title} service={service} index={index} reduceMotion={reduceMotion} />
              ))}
            </div>
          </section>

          <section className="studio-shell pb-16 lg:pb-24">
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
                identity
              </div>

              <div className="relative grid gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:items-end">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-gold/70">Studio position</p>
                  <h2 className="mt-5 max-w-4xl font-display text-4xl leading-[0.9] tracking-[-0.05em] text-ivory md:text-6xl lg:text-[5.2rem] xl:text-[6rem]">
                    This isn&apos;t photography.
                    <span className="block italic text-gold/90">It&apos;s identity direction.</span>
                  </h2>
                </div>

                <p className="max-w-xl text-sm leading-8 text-parchment/72 md:text-base">
                  Every commission is built to feel considered from the first conversation to final delivery. The process
                  is calm, but the outcome carries presence, clarity, and a distinctly premium finish.
                </p>
              </div>

              <div className="relative mt-12 grid gap-4 sm:grid-cols-3">
                {[
                  'Creative direction included',
                  'Custom quotes available',
                  'Limited booking calendar',
                ].map((item) => (
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
                  Ready to shape a project with intention?
                </h2>
                <p className="mt-6 max-w-2xl text-sm leading-8 text-parchment/72 md:text-base">
                  Whether you need campaign imagery, a personal brand system, a visual story, or a private portrait
                  session, the process begins with a tailored inquiry and a clear creative conversation.
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
