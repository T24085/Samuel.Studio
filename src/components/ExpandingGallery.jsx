import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { withBase } from '../utils/paths'

function GalleryCard({ item, index, active, reducedMotion, onActivate, onOpen }) {
  const title = item.title

  return (
    <motion.button
      type="button"
      onMouseEnter={() => onActivate(index)}
      onFocus={() => onActivate(index)}
      onClick={() => {
        if (active || window.matchMedia('(max-width: 1023px)').matches) {
          onOpen(item.id)
          return
        }

        onActivate(index)
      }}
      aria-pressed={active}
      aria-label={`${active ? 'Open' : 'Focus'} ${title}, photograph ${index + 1}`}
      className={[
        'group relative isolate w-full flex-none overflow-hidden border border-white/10 bg-[#090909] text-left outline-none',
        'transition-[flex-grow,transform,filter,opacity,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'h-[14rem] rounded-[1.6rem] sm:h-[16rem] lg:h-full',
        active
          ? 'z-10 lg:flex-[5.6] lg:rounded-[1.9rem] lg:shadow-[0_28px_90px_rgba(0,0,0,0.42)]'
          : 'opacity-95 lg:flex-[0.58] lg:rounded-[1.55rem]',
        !reducedMotion ? 'motion-safe:hover:scale-[1.01]' : '',
        'focus-visible:ring-2 focus-visible:ring-gold/50',
      ].join(' ')}
      style={{
        transformOrigin: 'center center',
      }}
    >
      <div
        className={[
          'absolute inset-0 overflow-hidden',
          active
            ? 'bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%),linear-gradient(180deg,rgba(7,7,7,0.96),rgba(5,5,5,0.98))] p-3 sm:p-4 lg:p-5'
            : '',
        ].join(' ')}
      >
        <img
          src={item.thumbnailSrc || item.src}
          width={item.width}
          height={item.height}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          onError={(event) => {
            event.currentTarget.src = withBase('photos/self-port.jpg')
          }}
          className={[
            'h-full w-full transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
            active
              ? 'object-contain object-center scale-[1] drop-shadow-[0_18px_38px_rgba(0,0,0,0.2)]'
              : 'object-contain object-center lg:absolute lg:inset-0 lg:object-cover lg:scale-[1.01] lg:group-hover:scale-[1.04]',
          ].join(' ')}
        />
      </div>

      <div
        className={[
          'absolute inset-0',
          active
            ? 'bg-[linear-gradient(180deg,rgba(2,2,2,0.02)_0%,rgba(2,2,2,0.05)_42%,rgba(2,2,2,0.7)_100%)]'
            : 'bg-[linear-gradient(180deg,rgba(2,2,2,0.04)_0%,rgba(2,2,2,0.2)_35%,rgba(2,2,2,0.88)_100%)]',
        ].join(' ')}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_34%)] opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(198,161,91,0.12),transparent_22%,transparent_78%,rgba(245,240,230,0.08))] opacity-55" />

      <div
        className={[
          'absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14',
          'bg-ink/42 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-parchment/72 backdrop-blur-sm',
          'transition duration-500',
          active ? 'border-gold/40 text-gold' : 'group-hover:border-gold/30 group-hover:text-ivory',
        ].join(' ')}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      <div
        className={[
          'absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6',
          'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          active ? 'translate-y-0 opacity-100' : 'translate-y-0 opacity-100 lg:translate-y-6 lg:opacity-0',
        ].join(' ')}
      >
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-md">
            <p className="text-[0.58rem] uppercase tracking-[0.36em] text-parchment/58">Samuel Studio</p>
            <h3 className="mt-2 font-display text-xl leading-tight text-ivory sm:text-2xl">
              {title}
            </h3>
          </div>

          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold/24 bg-ink/42 px-3 py-2 text-[0.6rem] uppercase tracking-[0.34em] text-gold/90 backdrop-blur-sm">
            Open
            <ArrowUpRight size={13} />
          </span>
        </div>

      </div>
    </motion.button>
  )
}

export function ExpandingGallery({ items, onSelect, fullBleed = false }) {
  const reducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const cards = items

  useEffect(() => {
    setActiveIndex(current => Math.min(current, Math.max(cards.length - 1, 0)))
  }, [cards.length])

  if (!cards.length) return null

  return (
    <div className="relative w-full">
      <div
        className={[
          'pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(198,161,91,0.48),transparent)]',
          fullBleed ? 'inset-x-0 sm:inset-x-10' : '',
        ].join(' ')}
      />
      <div
        className={[
          'relative overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]',
          fullBleed
            ? 'rounded-none border-y border-white/10 px-0 py-0 shadow-[0_26px_90px_rgba(0,0,0,0.28)]'
            : 'rounded-[2.15rem] border border-white/10 p-3 shadow-[0_30px_100px_rgba(0,0,0,0.34)] sm:p-4',
        ].join(' ')}
      >
        <div className={fullBleed ? 'flex flex-col gap-2 lg:h-[29rem] lg:flex-row lg:gap-0' : 'flex flex-col gap-3 lg:h-[34rem] lg:flex-row lg:gap-4'}>
          {cards.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={index}
              active={index === activeIndex}
              reducedMotion={reducedMotion}
              onActivate={setActiveIndex}
              onOpen={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
