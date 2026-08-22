import { useInView } from '../hooks/useInView'
import { cn } from '../lib/utils'

export default function AISummary() {
  const { ref, inView } = useInView()

  return (
    <section className="bg-white px-6 py-32 dark:bg-black">
      <div className="mx-auto max-w-3xl text-center">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={cn('fade-up', inView && 'in-view')}
        >
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#6e6e73] dark:text-[#86868b] mb-12 select-none">
            Plain-Language Summary
          </p>

          <blockquote
            className="text-[24px] font-medium leading-[1.4] tracking-[-0.02em] text-[#1d1d1f] dark:text-[#f5f5f7] md:text-[28px]"
            style={{ fontStyle: 'normal' }}
          >
            <span className="text-[#0071e3] mr-1" style={{ fontSize: '1.2em', lineHeight: 0, verticalAlign: '-0.1em' }}>&ldquo;</span>
            Your app is nearly ready for App Store submission. The remaining
            blockers are a missing camera usage description and a StoreKit
            paywall without a restore-purchases path.
            <span className="text-[#0071e3] ml-1" style={{ fontSize: '1.2em', lineHeight: 0, verticalAlign: '-0.1em' }}>&rdquo;</span>
          </blockquote>

          <p className="mt-8 max-w-[440px] mx-auto text-[14px] leading-[1.6] text-[#6e6e73] dark:text-[#86868b]">
            Optional, on-device summaries via Apple Intelligence tie your findings together in plain language. The findings underneath &mdash; evidence, guideline, fix &mdash; are what PreFlight actually checked.
          </p>
        </div>
      </div>
    </section>
  )
}
