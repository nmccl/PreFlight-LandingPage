import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
          <Link
            to={CTA_HREF}
            className="inline-flex items-center px-8 py-[14px] rounded-full bg-[#1d1d1f] text-white text-[17px] font-medium hover:bg-[#424245] transition-colors duration-200 select-none"
          >
            {CTA_LABEL}
          </Link>
        </div>
      </div>

      {/* MacBook product shot — the hero itself */}
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
