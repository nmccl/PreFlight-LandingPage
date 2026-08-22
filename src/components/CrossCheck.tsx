import { useInView } from '../hooks/useInView'
import { cn } from '../lib/utils'

const nodes = [
  { label: 'Xcode Project', detail: 'Source, entitlements, linked SDKs, Info.plist' },
  { label: 'PreFlight', detail: 'Reads both sides' },
  { label: 'App Store Connect', detail: 'Privacy declarations, review info, metadata' },
]

const examples = [
  {
    project: 'Project links RevenueCat.',
    connect: "App Store Connect privacy details for “Purchases” list no data types.",
    flag: 'Flagged: privacy declaration mismatch.',
  },
  {
    project: 'Source calls AVCaptureDevice.',
    connect: 'Info.plist has no NSCameraUsageDescription.',
    flag: 'Flagged: missing usage description.',
  },
]

export default function CrossCheck() {
  const { ref: headRef, inView: headIn } = useInView()
  const { ref: flowRef, inView: flowIn } = useInView(0.15)
  const { ref: exRef, inView: exIn } = useInView(0.1)

  return (
    <section className="bg-white px-6 py-32 dark:bg-black">
      <div className="mx-auto max-w-3xl">
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={cn('mb-16 text-center fade-up', headIn && 'in-view')}
        >
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0071e3]">
            The Cross-Check
          </p>
          <h2 className="mb-8 text-[36px] font-bold leading-[1.08] tracking-[-0.04em] text-[#1d1d1f] dark:text-[#f5f5f7] md:text-[48px]">
            Two records. One truth.
          </h2>
          <blockquote className="mx-auto max-w-[560px] text-[21px] font-medium leading-[1.45] tracking-[-0.01em] text-[#1d1d1f] dark:text-[#f5f5f7]">
            <span className="text-[#0071e3]">&ldquo;</span>
            Your project knows what you built. App Store Connect knows what you&rsquo;re telling Apple. PreFlight checks that they agree.
            <span className="text-[#0071e3]">&rdquo;</span>
          </blockquote>
        </div>

        {/* Flow */}
        <div
          ref={flowRef as React.RefObject<HTMLDivElement>}
          className={cn('mx-auto mb-16 max-w-sm fade-up', flowIn && 'in-view')}
        >
          {nodes.map((n, i) => (
            <div key={n.label}>
              <div className="rounded-2xl border border-black/[0.06] bg-[#f5f5f7] px-6 py-4 text-center dark:border-white/[0.08] dark:bg-[#1c1c1e]">
                <p className="text-[15px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">{n.label}</p>
                <p className="mt-1 text-[13px] text-[#6e6e73] dark:text-[#86868b]">{n.detail}</p>
              </div>
              {i < nodes.length - 1 && (
                <div className="flex justify-center py-2">
                  <span aria-hidden="true" className="text-[18px] text-[#c7c7cc] dark:text-[#48484a]">&darr;</span>
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-center py-2">
            <span aria-hidden="true" className="text-[18px] text-[#c7c7cc] dark:text-[#48484a]">&darr;</span>
          </div>
          <div className="rounded-2xl border border-black/[0.06] bg-[#f5f5f7] px-6 py-4 text-center dark:border-white/[0.08] dark:bg-[#1c1c1e]">
            <p className="text-[15px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">Cross-check</p>
          </div>
          <div className="flex justify-center py-2">
            <span aria-hidden="true" className="text-[18px] text-[#c7c7cc] dark:text-[#48484a]">&darr;</span>
          </div>
          <div className="rounded-2xl border px-6 py-4 text-center" style={{ borderColor: '#ff9500', backgroundColor: 'rgba(255,149,0,0.08)' }}>
            <p className="text-[15px] font-semibold" style={{ color: '#ff9500' }}>Potential mismatch flagged</p>
          </div>
        </div>

        {/* Concrete examples */}
        <div
          ref={exRef as React.RefObject<HTMLDivElement>}
          className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 fade-up', exIn && 'in-view')}
        >
          {examples.map((ex) => (
            <div
              key={ex.flag}
              className="rounded-2xl border border-black/[0.06] bg-white p-5 font-mono text-[13px] leading-[1.7] dark:border-white/[0.08] dark:bg-[#1c1c1e]"
            >
              <p className="text-[#1d1d1f] dark:text-[#f5f5f7]">{ex.project}</p>
              <p className="text-[#6e6e73] dark:text-[#86868b]">{ex.connect}</p>
              <p className="mt-2 font-semibold" style={{ color: '#ff3b30' }}>{ex.flag}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-[560px] text-center text-[14px] leading-[1.6] text-[#6e6e73] dark:text-[#86868b]">
          PreFlight doesn&rsquo;t just check whether individual requirements exist on their own. It compares information across your project and your submission — the part that&rsquo;s otherwise on you to reconcile by hand.
        </p>
      </div>
    </section>
  )
}
