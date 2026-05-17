export function PortfolioBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#090807_0%,#050505_44%,#040404_100%)]" />
      <div className="absolute inset-[-12%] bg-[radial-gradient(circle_at_16%_18%,rgba(198,161,91,0.18),transparent_22%),radial-gradient(circle_at_82%_20%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_52%_84%,rgba(245,240,230,0.08),transparent_24%)] blur-3xl opacity-80" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,rgba(245,240,230,0.78)_1px,transparent_0)] [background-size:20px_20px]" />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(90deg,rgba(5,5,5,0.18),rgba(5,5,5,0.5)_40%,rgba(5,5,5,0))]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(180deg,rgba(5,5,5,0),rgba(5,5,5,0.92))]" />
      <div className="absolute -left-24 top-24 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(198,161,91,0.14),transparent_68%)] blur-3xl" />
      <div className="absolute right-[-8rem] top-[-4rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_70%)] blur-3xl" />
    </div>
  )
}
