import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { services } from '../data/services'

const sectionMotion = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

function RevealSection({ children, reduceMotion, className = '' }) {
  return (
    <motion.section
      initial={reduceMotion ? { opacity: 1 } : 'hidden'}
      whileInView={reduceMotion ? { opacity: 1 } : 'visible'}
      variants={sectionMotion}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.85, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

function GalleryBlock({ item, index }) {
  const gradients = [
    'from-[#1d1711] via-[#0d0c0b] to-[#050505]',
    'from-[#241812] via-[#0e0b09] to-[#050505]',
    'from-[#181412] via-[#0b0a09] to-[#040404]',
  ]

  return (
    <div
      className={`relative min-h-[16rem] overflow-hidden rounded-[1.8rem] border border-white/10 bg-gradient-to-br ${gradients[index % gradients.length]} p-6 shadow-[0_20px_70px_rgba(0,0,0,0.28)] sm:min-h-[19rem]`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 18%, rgba(198,161,91,0.18), transparent 22%), radial-gradient(circle at 82% 20%, rgba(255,255,255,0.08), transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.2))',
        }}
      />
      <div className="relative flex h-full min-h-[13rem] flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <span className="text-[0.62rem] uppercase tracking-[0.34em] text-gold/72">Gallery {String(index + 1).padStart(2, '0')}</span>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.58rem] uppercase tracking-[0.3em] text-parchment/68">
            Placeholder
          </span>
        </div>
        <div>
          <p className="max-w-[18ch] font-display text-3xl leading-[0.92] tracking-[-0.05em] text-ivory">
            {item.label}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-parchment/72">{item.tone}</p>
        </div>
      </div>
    </div>
  )
}

export function ServiceDetailPage() {
  const { slug } = useParams()
  const reduceMotion = useReducedMotion()
  const service = services.find((entry) => entry.slug === slug)

  if (!service) {
    return <Navigate to="/services" replace />
  }

  const serviceIndex = services.findIndex((entry) => entry.slug === service.slug)
  const serviceNumber = String(serviceIndex + 1).padStart(2, '0')
  const pageTitle = `${service.title} | Services`

  return (
    <>
      <SEO
        title={pageTitle}
        description={service.subheader}
        path={`/services/${service.slug}`}
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
                    x: [0, 20, 0],
                    y: [0, 14, 0],
                    opacity: [0.4, 0.68, 0.4],
                  }
            }
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute right-[-12%] top-[14%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_68%)] blur-3xl"
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, -14, 0],
                    y: [0, -10, 0],
                    opacity: [0.28, 0.52, 0.28],
                  }
            }
            transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,rgba(245,240,230,0.92)_1px,transparent_0)] [background-size:18px_18px]" />
        </div>

        <div className="relative z-10">
          <section className="studio-shell min-h-[92svh] pt-24 pb-14 sm:pt-28 lg:pb-18 lg:pt-32">
            <div className="grid min-h-[calc(92svh-8rem)] gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
              <div className="max-w-4xl">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-gold/70">
                  {service.eyebrow}
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <span className="font-display text-6xl leading-none tracking-[-0.06em] text-ivory/18 sm:text-7xl">
                    {serviceNumber}
                  </span>
                  <span className="rounded-full border border-gold/20 bg-black/20 px-4 py-2 text-[0.66rem] uppercase tracking-[0.32em] text-gold/82">
                    {service.label}
                  </span>
                </div>
                <h1 className="mt-6 max-w-5xl font-display text-[3.2rem] leading-[0.86] tracking-[-0.055em] text-ivory sm:text-6xl md:text-[4.8rem] lg:text-[5.8rem] xl:text-[6.5rem]">
                  {service.title}
                </h1>
                <p className="mt-8 max-w-2xl text-base leading-8 text-parchment/74 md:text-lg">
                  {service.subheader}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/booking"
                    className="group inline-flex items-center justify-between gap-4 rounded-full border border-gold/40 bg-[linear-gradient(180deg,rgba(198,161,91,0.24),rgba(198,161,91,0.1))] px-6 py-4 text-xs uppercase tracking-[0.3em] text-ivory shadow-[0_16px_42px_rgba(0,0,0,0.28)] transition duration-300 hover:border-gold/70 hover:bg-[linear-gradient(180deg,rgba(198,161,91,0.34),rgba(198,161,91,0.12))]"
                  >
                    <span>{service.cta}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <Link
                    to="/contact"
                    className="group inline-flex items-center justify-between gap-4 rounded-full border border-white/12 bg-white/[0.03] px-6 py-4 text-xs uppercase tracking-[0.3em] text-parchment/82 transition duration-300 hover:border-gold/35 hover:bg-white/[0.05] hover:text-ivory"
                  >
                    <span>{service.secondaryCta || 'Request Details'}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2.35rem] border border-gold/16 bg-[linear-gradient(180deg,rgba(14,12,10,0.98),rgba(5,5,5,0.98))] p-7 shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-[22px] sm:p-8 lg:p-9">
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
                  <p className="text-[0.67rem] uppercase tracking-[0.38em] text-gold/72">Quote</p>
                  <p className="mt-5 max-w-sm font-display text-3xl leading-[0.94] tracking-[-0.04em] text-ivory">
                    {service.quote}
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-4">
                      <p className="text-[0.62rem] uppercase tracking-[0.32em] text-gold/60">Mood</p>
                      <p className="mt-2 text-sm leading-7 text-parchment/72">{service.mood}</p>
                    </div>
                    <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-4">
                      <p className="text-[0.62rem] uppercase tracking-[0.32em] text-gold/60">Audience</p>
                      <p className="mt-2 text-sm leading-7 text-parchment/72">{service.audience}</p>
                    </div>
                  </div>

                  <div className="mt-8 rounded-[1.35rem] border border-white/10 bg-black/20 px-5 py-4">
                    <p className="text-[0.62rem] uppercase tracking-[0.34em] text-gold/68">Service label</p>
                    <p className="mt-2 text-sm leading-7 text-parchment/72">{service.label}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <RevealSection reduceMotion={reduceMotion} className="studio-shell pb-18 lg:pb-24">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-gold/70">Intro</p>
                <h2 className="mt-4 max-w-xl font-display text-4xl leading-[0.92] tracking-[-0.05em] text-ivory md:text-5xl xl:text-[4.6rem]">
                  {service.subheader}
                </h2>
              </div>

              <div className="space-y-5 text-sm leading-8 text-parchment/74 md:text-base">
                {service.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </RevealSection>

          <RevealSection reduceMotion={reduceMotion} className="studio-shell pb-18 lg:pb-24">
            <div className="rounded-[2.45rem] border border-white/10 bg-white/[0.03] p-7 shadow-[0_24px_90px_rgba(0,0,0,0.22)] sm:p-10 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-gold/70">Who this is for</p>
                  <h2 className="mt-4 font-display text-4xl leading-[0.92] tracking-[-0.05em] text-ivory md:text-5xl">
                    The right fit for this service.
                  </h2>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {service.whoFor.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.25rem] border border-white/10 bg-black/18 px-4 py-4 text-sm leading-7 text-parchment/76"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>

          <RevealSection reduceMotion={reduceMotion} className="studio-shell pb-18 lg:pb-24">
            <div className="rounded-[2.45rem] border border-gold/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(17,17,17,0.92))] p-7 shadow-[0_28px_100px_rgba(0,0,0,0.34)] sm:p-10 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-gold/70">What’s included</p>
                  <h2 className="mt-4 font-display text-4xl leading-[0.92] tracking-[-0.05em] text-ivory md:text-5xl">
                    A complete creative frame.
                  </h2>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {service.included.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-parchment/76"
                    >
                      <Check className="mt-1 h-4 w-4 shrink-0 text-gold" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>

          <RevealSection reduceMotion={reduceMotion} className="studio-shell pb-18 lg:pb-24">
            <div className="grid gap-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-gold/70">Process</p>
                  <h2 className="mt-4 font-display text-4xl leading-[0.92] tracking-[-0.05em] text-ivory md:text-5xl">
                    Four steps, one clear direction.
                  </h2>
                </div>
                <p className="max-w-xl text-sm leading-8 text-parchment/72 md:text-base">
                  The process is designed to stay calm and intentional while still moving efficiently from concept to
                  final delivery.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {service.process.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-[1.45rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-display text-5xl leading-none tracking-[-0.06em] text-ivory/14">{step.step}</span>
                      <span className="rounded-full border border-gold/20 bg-black/20 px-3 py-1 text-[0.58rem] uppercase tracking-[0.28em] text-gold/74">
                        Step
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl leading-[0.94] tracking-[-0.04em] text-ivory">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-parchment/72">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          <RevealSection reduceMotion={reduceMotion} className="studio-shell pb-18 lg:pb-24">
            <div className="rounded-[2.45rem] border border-white/10 bg-[#040404] p-7 shadow-[0_28px_100px_rgba(0,0,0,0.34)] sm:p-10 lg:p-12">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-gold/70">Gallery</p>
                  <h2 className="mt-4 font-display text-4xl leading-[0.92] tracking-[-0.05em] text-ivory md:text-5xl">
                    Cinematic placeholders for future imagery.
                  </h2>
                </div>
                <p className="max-w-xl text-sm leading-8 text-parchment/72 md:text-base">
                  These blocks are ready for real images later, but they already carry the same tonal spacing and
                  contrast language as the rest of the page.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {service.gallery.map((item, index) => (
                  <GalleryBlock key={item.label} item={item} index={index} />
                ))}
              </div>
            </div>
          </RevealSection>

          <RevealSection reduceMotion={reduceMotion} className="studio-shell pb-24 lg:pb-28">
            <div className="grid gap-8 rounded-[2.5rem] border border-gold/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(17,17,17,0.92))] p-7 shadow-[0_28px_100px_rgba(0,0,0,0.34)] sm:p-10 lg:grid-cols-[1.08fr_0.92fr] lg:p-12">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-gold/70">Final CTA</p>
                <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[0.92] tracking-[-0.04em] text-ivory md:text-5xl xl:text-[4.5rem]">
                  {service.cta}
                </h2>
                <p className="mt-6 max-w-2xl text-sm leading-8 text-parchment/72 md:text-base">
                  If this service fits your project, move into booking or send a direct inquiry for details and
                  availability.
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
                  <span className="relative">{service.cta}</span>
                  <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-between gap-4 rounded-full border border-white/12 bg-white/[0.03] px-6 py-4 text-xs uppercase tracking-[0.3em] text-parchment/82 transition duration-300 hover:border-gold/35 hover:bg-white/[0.05] hover:text-ivory"
                >
                  <span>{service.secondaryCta || 'Request Details'}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </main>
    </>
  )
}
