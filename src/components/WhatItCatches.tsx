import { useInView } from '../hooks/useInView'
import { cn } from '../lib/utils'

type Severity = 'critical' | 'warning' | 'note'

const severityColor: Record<Severity, string> = {
  critical: '#ff3b30',
  warning: '#ff9500',
  note: '#6e6e73',
}

const severityLabel: Record<Severity, string> = {
  critical: 'Critical',
  warning: 'Warning',
  note: 'Note',
}

const findings: { severity: Severity; title: string }[] = [
  { severity: 'critical', title: 'Placeholder bundle ID (com.example.*)' },
  { severity: 'critical', title: 'Missing camera usage description' },
  { severity: 'critical', title: 'Privacy declaration mismatch' },
  { severity: 'critical', title: 'External payment link detected' },
  { severity: 'warning', title: 'Missing PrivacyInfo.xcprivacy manifest' },
  { severity: 'warning', title: 'StoreKit paywall missing restore purchases' },
  { severity: 'warning', title: 'Missing demo account credentials' },
  { severity: 'note', title: 'Missing screenshots for a localized locale' },
]

export default function WhatItCatches() {
  const { ref: headRef, inView: headIn } = useInView()
  const { ref: gridRef, inView: gridIn } = useInView(0.1)

  return (
    <section id="features" className="bg-[#f5f5f7] px-6 py-32 dark:bg-[#111111]">
      <div className="mx-auto max-w-5xl">
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={cn('mb-16 text-center fade-up', headIn && 'in-view')}
        >
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6e6e73] dark:text-[#86868b]">
            What It Catches
          </p>
          <h2 className="mx-auto max-w-[640px] text-[36px] font-bold leading-[1.08] tracking-[-0.04em] text-[#1d1d1f] dark:text-[#f5f5f7] md:text-[48px]">
            Specific issues.
          </h2>
          <p className="mx-auto mt-5 max-w-[520px] text-[17px] leading-[1.5] text-[#6e6e73] dark:text-[#86868b]">
            Not a generic checklist. Every finding is a concrete, verifiable problem in your project or your submission.
          </p>
        </div>

        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className={cn('grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 fade-up', gridIn && 'in-view')}
        >
          {findings.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#1c1c1e]"
            >
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="h-[7px] w-[7px] rounded-full"
                  style={{ backgroundColor: severityColor[f.severity] }}
                />
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.1em]"
                  style={{ color: severityColor[f.severity] }}
                >
                  {severityLabel[f.severity]}
                </span>
              </div>
              <p className="text-[15px] leading-[1.4] text-[#1d1d1f] dark:text-[#f5f5f7]">
                {f.title}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-[560px] text-center text-[14px] leading-[1.6] text-[#6e6e73] dark:text-[#86868b]">
          Each finding in a PreFlight report includes the evidence PreFlight found, why it matters, the relevant guideline, and a suggested fix — not just a pass/fail flag.
        </p>
      </div>
    </section>
  )
}
