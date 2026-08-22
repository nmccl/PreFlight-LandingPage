import { useInView } from '../hooks/useInView'
import { cn } from '../lib/utils'

const canVerify = [
  'Whether required usage-description strings are present for the APIs your code calls',
  'Whether your linked SDKs line up with your App Store Connect privacy declarations',
  'Whether PrivacyInfo.xcprivacy and required-reason API usage are present',
  'Whether a StoreKit paywall has a detectable restore-purchases path',
  'Whether demo account credentials are present in your review information',
  'Whether screenshots exist for each localized locale',
  'Device support and entitlement configuration',
  'Accessibility issues such as missing labels, Dynamic Type, and reduced-motion handling',
]

const cannotVerify = [
  'Whether Apple will approve your app for subjective or editorial reasons',
  'Policy judgment calls about your app’s content or business model',
  'Anything outside your project and your App Store Connect data',
  'Issues introduced after your last scan',
]

export default function Trust() {
  const { ref: headRef, inView: headIn } = useInView()
  const { ref: whyRef, inView: whyIn } = useInView(0.15)
  const { ref: colsRef, inView: colsIn } = useInView(0.1)

  return (
    <section className="bg-[#f5f5f7] px-6 py-32 dark:bg-[#111111]">
      <div className="mx-auto max-w-4xl">
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={cn('mb-14 text-center fade-up', headIn && 'in-view')}
        >
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6e6e73] dark:text-[#86868b]">
            Built For Trust
          </p>
          <h2 className="mx-auto max-w-[620px] text-[34px] font-bold leading-[1.1] tracking-[-0.04em] text-[#1d1d1f] dark:text-[#f5f5f7] md:text-[44px]">
            No guessing.
          </h2>
          <p className="mx-auto mt-5 max-w-[520px] text-[17px] leading-[1.5] text-[#6e6e73] dark:text-[#86868b]">
            PreFlight tells you exactly what it can verify and what it can&rsquo;t. A clean report means your app passed those checks, not that Apple will approve it.
          </p>
        </div>

        <div
          ref={whyRef as React.RefObject<HTMLDivElement>}
          className={cn('mx-auto mb-14 max-w-2xl rounded-2xl border border-black/[0.06] bg-white p-7 dark:border-white/[0.08] dark:bg-[#1c1c1e] fade-up', whyIn && 'in-view')}
        >
          <p className="mb-2 text-[15px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
            Why these slip through until after you submit
          </p>
          <p className="text-[14.5px] leading-[1.7] text-[#6e6e73] dark:text-[#86868b]">
            App Review evaluates the build and metadata you&rsquo;ve already submitted &mdash; it isn&rsquo;t set up to compare your source code against your own App Store Connect declarations before that point. That comparison is on you to do by hand, or to run with PreFlight before you submit.
          </p>
        </div>

        <div
          ref={colsRef as React.RefObject<HTMLDivElement>}
          className={cn('grid grid-cols-1 gap-6 md:grid-cols-2 fade-up', colsIn && 'in-view')}
        >
          <div className="rounded-2xl border border-black/[0.06] bg-white p-7 dark:border-white/[0.08] dark:bg-[#1c1c1e]">
            <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#34c759]">
              What PreFlight can verify
            </p>
            <ul className="space-y-3">
              {canVerify.map((item) => (
                <li key={item} className="flex gap-3 text-[14px] leading-[1.5] text-[#1d1d1f] dark:text-[#f5f5f7]">
                  <span aria-hidden="true" className="mt-[3px] shrink-0 text-[#34c759]">&#10003;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-black/[0.06] bg-white p-7 dark:border-white/[0.08] dark:bg-[#1c1c1e]">
            <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#6e6e73] dark:text-[#86868b]">
              Not Verified by PreFlight
            </p>
            <ul className="space-y-3">
              {cannotVerify.map((item) => (
                <li key={item} className="flex gap-3 text-[14px] leading-[1.5] text-[#6e6e73] dark:text-[#86868b]">
                  <span aria-hidden="true" className="mt-[3px] shrink-0">&mdash;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
