import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'
import { cn } from '../lib/utils'

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
          style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}
        >
          Ready to ship<br />with confidence?
        </h2>
        <p className="text-[19px] text-white/50 mb-11 leading-[1.5]">
          Analyze your project before<br />App Review catches the problems.
        </p>
        <Link
          to="/download"
          className="inline-flex items-center px-8 py-[14px] rounded-full bg-white text-[#1d1d1f] text-[17px] font-medium hover:bg-[#f5f5f7] transition-colors duration-200 select-none"
        >
          Download PreFlight
        </Link>
        <p className="mt-7 text-[13px] text-white/30">
          All analysis runs locally on your Mac.
        </p>
      </div>
    </section>
  )
}
