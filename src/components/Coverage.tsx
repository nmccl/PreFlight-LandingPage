import { useInView } from '../hooks/useInView'
import { cn } from '../lib/utils'

const areas = [
  { label: 'Privacy & Data Collection', detail: 'PrivacyInfo.xcprivacy, required-reason APIs, SDK cross-checks' },
  { label: 'Permissions', detail: 'Usage-string checks against detected APIs' },
  { label: 'StoreKit & Subscriptions', detail: 'Paywall and restore-purchases configuration' },
  { label: 'External Payments', detail: 'Detection of external payment links' },
  { label: 'App Store Connect Metadata', detail: 'Screenshots, localization, listing data' },
  { label: 'Review Information', detail: 'Demo account credentials and notes' },
  { label: 'Device Configuration', detail: 'iPad and device-support settings' },
  { label: 'Signing & Entitlements', detail: 'Bundle IDs and entitlement configuration' },
  { label: 'Accessibility', detail: 'Labels, Dynamic Type, keyboard, reduced motion' },
]

export default function Coverage() {
  const { ref: headRef, inView: headIn } = useInView()
  const { ref: gridRef, inView: gridIn } = useInView(0.1)

  return (
    <section className="bg-white px-6 py-32 dark:bg-black">
      <div className="mx-auto max-w-5xl">
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={cn('mb-14 text-center fade-up', headIn && 'in-view')}
        >
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6e6e73] dark:text-[#86868b]">
            Coverage
          </p>
          <h2 className="text-[34px] font-bold leading-[1.1] tracking-[-0.04em] text-[#1d1d1f] dark:text-[#f5f5f7] md:text-[44px]">
            What PreFlight analyzes.
          </h2>
        </div>

        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className={cn('grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 fade-up', gridIn && 'in-view')}
        >
          {areas.map((a) => (
            <div
              key={a.label}
              className="rounded-2xl border border-black/[0.06] bg-[#f5f5f7] p-5 dark:border-white/[0.08] dark:bg-[#1c1c1e]"
            >
              <p className="mb-1.5 text-[14.5px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">{a.label}</p>
              <p className="text-[13px] leading-[1.5] text-[#6e6e73] dark:text-[#86868b]">{a.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
