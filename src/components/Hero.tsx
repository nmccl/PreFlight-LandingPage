import { useEffect, useState } from 'react'
import { cn } from '../lib/utils'
import { CTA_LABEL, CTA_HREF } from '../lib/cta'

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="overflow-hidden bg-white dark:bg-black">
      {/* Text block */}
      <div className="pt-[136px] pb-5 text-center px-6">
        <div className={cn('transition-all duration-1000 ease-out', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
          <img
            src="/app-icon.png"
            alt="PreFlight"
            className="w-[100px] h-[100px] rounded-[14px] mx-auto mb-7 select-none"
            draggable={false}
          />

          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6e6e73] dark:text-[#86868b] select-none">
            For macOS
          </p>
          <h1 className="mb-7 text-[65px] font-bold leading-[0.97] tracking-[-0.05em] text-[#1d1d1f] dark:text-[#f5f5f7] md:text-[80px] lg:text-[96px]">
            Ship with confidence.
          </h1>
          <p className="mx-auto mb-11 max-w-[420px] text-[19px] leading-[1.45] text-[#6e6e73] dark:text-[#86868b] md:text-[21px]">
            Catch preventable App Review rejections<br />before you submit.
          </p>
          {/* TestFlight beta — DELETE this block when the App Store button below is live */}
          <a
            href={CTA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-[14px] rounded-full bg-[#1d1d1f] text-white text-[17px] font-medium hover:bg-[#424245] transition-colors duration-200 select-none"
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
            className="inline-flex items-center gap-[9px] px-5 py-[11px] rounded-[10px] bg-[#1d1d1f] hover:bg-[#424245] transition-colors duration-200 select-none"
          >
            <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <span className="flex flex-col items-start leading-none gap-[2px]">
              <span className="text-white/60 text-[10px] font-normal">Download on the</span>
              <span className="text-white text-[16px] font-semibold tracking-[-0.01em]">App Store</span>
            </span>
          </a> */}
        </div>
      </div>

      <div
        className={cn(
          'max-w-[1500px] mx-auto px-1 md:px-2 transition-all duration-1000 ease-out delay-300',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}
      >
        <img
          src="/macbook.jpg"
          alt="PreFlight running on a Mac, showing a scanned project at 98% readiness"
          className="w-full select-none"
          draggable={false}
          style={{ display: 'block' }}
        />
      </div>
    </section>
  )
}
