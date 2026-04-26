import { withBase } from '../utils/paths'

const tiles = Array.from({ length: 48 }, (_, index) => {
  const isLightTile = index % 2 === 0
  return {
    backgroundColor: isLightTile ? 'rgba(245, 240, 230, 0.94)' : 'rgba(5, 5, 5, 0.96)',
    image: withBase(isLightTile ? 'portfolio-assets/logo-black.png' : 'portfolio-assets/logo-white.jpg'),
    alt: isLightTile ? 'Samuel Studio logo tile' : 'Defiant logo tile',
  }
})

export function PortfolioBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(198,161,91,0.14),transparent_18%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.08),transparent_16%),linear-gradient(180deg,rgba(6,6,6,0.96),rgba(2,2,2,0.98))]" />
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-6 gap-2 p-2 sm:grid-cols-6 sm:grid-rows-6 sm:gap-3 sm:p-3 lg:grid-cols-8 lg:grid-rows-6 lg:gap-3 lg:p-4">
        {tiles.map((tile, index) => (
          <div
            key={`${tile.alt}-${index}`}
            className="relative overflow-hidden rounded-[1.2rem] border border-white/8 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
            style={{ backgroundColor: tile.backgroundColor }}
          >
            <img
              src={tile.image}
              alt=""
              className="h-full w-full object-contain p-4 opacity-80"
              loading="eager"
              decoding="async"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.34),rgba(5,5,5,0.72)),radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.52)_100%)]" />
    </div>
  )
}
