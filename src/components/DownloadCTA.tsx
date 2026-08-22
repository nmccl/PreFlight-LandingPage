import { Link } from 'react-router-dom'
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
        <Link
          to={CTA_HREF}
          className="inline-flex items-center px-8 py-[14px] rounded-full bg-white text-[#1d1d1f] text-[17px] font-medium hover:bg-[#f5f5f7] transition-colors duration-200 select-none"
        >
          {CTA_LABEL}
        </Link>
        <p className="mt-7 text-[13px] text-white/30">
          PreFlight is in development. It only reads &mdash; it never submits anything on your behalf.
        </p>
      </div>
    </section>
  )
}
