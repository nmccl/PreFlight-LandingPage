import { useInView } from '../hooks/useInView'
import { cn } from '../lib/utils'
import { CTA_LABEL, CTA_HREF } from '../lib/cta'

export default function DownloadCTA() {
  const { ref, inView } = useInView()

  return (
    <section className="bg-[#1d1d1f] px-6 py-40 dark:bg-[#0a0a0a]">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={cn('max-w-3xl mx-auto text-center fade-up', inView && 'in-view')}
      >
        <h2
          className="font-bold tracking-[-0.045em] leading-[1.02] text-white mb-6"
          style={{ fontSize: 'clamp(44px, 6vw, 72px)' }}
        >
          Catch it before<br />Apple does.
        </h2>
        <p className="text-[19px] text-white/50 mb-11 leading-[1.5]">
          Analyze your project against your submission<br />before you submit, not after.
        </p>
        {/* TestFlight beta — DELETE this block when the App Store button below is live */}
        <a
          href={CTA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-[14px] rounded-full bg-white text-[#1d1d1f] text-[17px] font-medium hover:bg-[#f5f5f7] transition-colors duration-200 select-none"
        >
          {CTA_LABEL}
        </a>

        {/* ─── App Store (LAUNCH) ────────────────────────────────────────────────
             1. Replace APP_STORE_HREF below with the real App Store URL
             2. Uncomment this block
             3. Delete the TestFlight button above
             ──────────────────────────────────────────────────────────────────── */}
        {/* <a
          href="APP_STORE_HREF"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-[9px] px-5 py-[11px] rounded-[10px] bg-white hover:bg-[#f5f5f7] transition-colors duration-200 select-none"
        >
          <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-[#1d1d1f] shrink-0" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          <span className="flex flex-col items-start leading-none gap-[2px]">
            <span className="text-[#1d1d1f]/50 text-[10px] font-normal">Download on the</span>
            <span className="text-[#1d1d1f] text-[16px] font-semibold tracking-[-0.01em]">App Store</span>
          </span>
        </a> */}

        <p className="mt-7 text-[13px] text-white/30">
          Available now on TestFlight. It only reads &mdash; it never submits anything on your behalf.
        </p>
      </div>
    </section>
  )
}
