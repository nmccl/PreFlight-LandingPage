import { useInView } from '../hooks/useInView'
import { cn } from '../lib/utils'

function Chip({ label, tone }: { label: string; tone: 'bad' | 'good' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-4 py-[7px] text-[13px] font-medium whitespace-nowrap',
        tone === 'bad'
          ? 'bg-[rgba(255,59,48,0.08)] text-[#ff3b30]'
          : 'bg-[rgba(52,199,89,0.1)] text-[#248a3d] dark:text-[#34c759]'
      )}
    >
      {label}
    </span>
  )
}

function Arrow() {
  return <span aria-hidden="true" className="text-[13px] text-[#c7c7cc] dark:text-[#48484a]">&rarr;</span>
}

const withoutSteps = ['Submit', 'Wait', 'Rejection', 'Investigate', 'Fix', 'Resubmit', 'Wait']
const withSteps = ['Analyze', 'Fix', 'Submit']

export default function WorkflowComparison() {
  const { ref: headRef, inView: headIn } = useInView()
  const { ref: rowsRef, inView: rowsIn } = useInView(0.15)

  return (
    <section className="bg-[#f5f5f7] px-6 py-32 dark:bg-[#111111]">
      <div className="mx-auto max-w-3xl">
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={cn('mb-16 text-center fade-up', headIn && 'in-view')}
        >
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6e6e73] dark:text-[#86868b]">
            The Workflow
          </p>
          <h2 className="mx-auto max-w-[600px] text-[34px] font-bold leading-[1.1] tracking-[-0.04em] text-[#1d1d1f] dark:text-[#f5f5f7] md:text-[44px]">
            Skip the wait.
          </h2>
          <p className="mx-auto mt-5 max-w-[480px] text-[17px] leading-[1.5] text-[#6e6e73] dark:text-[#86868b]">
            A preventable issue can cost a full review cycle. Catch it before you submit instead.
          </p>
        </div>

        <div
          ref={rowsRef as React.RefObject<HTMLDivElement>}
          className={cn('space-y-10 fade-up', rowsIn && 'in-view')}
        >
          <div className="rounded-2xl border border-black/[0.06] bg-white p-7 dark:border-white/[0.08] dark:bg-[#1c1c1e]">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#6e6e73] dark:text-[#86868b]">
              Without PreFlight
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {withoutSteps.map((s, i) => (
                <span key={s} className="flex items-center gap-2">
                  <Chip label={s} tone="bad" />
                  {i < withoutSteps.length - 1 && <Arrow />}
                </span>
              ))}
            </div>
            <p className="mt-5 text-[14px] text-[#6e6e73] dark:text-[#86868b]">
              Roughly 24&ndash;72 hours per cycle, waiting on something mechanical.
            </p>
          </div>

          <div className="rounded-2xl border border-black/[0.06] bg-white p-7 dark:border-white/[0.08] dark:bg-[#1c1c1e]">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#6e6e73] dark:text-[#86868b]">
              With PreFlight
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {withSteps.map((s, i) => (
                <span key={s} className="flex items-center gap-2">
                  <Chip label={s} tone="good" />
                  {i < withSteps.length - 1 && <Arrow />}
                </span>
              ))}
            </div>
            <p className="mt-5 text-[14px] text-[#6e6e73] dark:text-[#86868b]">
              The preventable part happens before you submit, not after.
            </p>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-[560px] text-center text-[14px] leading-[1.6] text-[#6e6e73] dark:text-[#86868b]">
          Apple can still reject an app for subjective or editorial reasons — PreFlight doesn&rsquo;t predict those. It exists to catch the mechanical, preventable problems beforehand.
        </p>
      </div>
    </section>
  )
}
