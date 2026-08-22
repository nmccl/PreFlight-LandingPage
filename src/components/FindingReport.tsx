import { useInView } from '../hooks/useInView'
import { cn } from '../lib/utils'

export default function FindingReport() {
  const { ref: headRef, inView: headIn } = useInView()
  const { ref: imgRef, inView: imgIn } = useInView(0.1)

  return (
    <section className="bg-[#f5f5f7] px-6 py-32 dark:bg-[#111111]">
      <div className="mx-auto max-w-3xl">
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={cn('mb-14 text-center fade-up', headIn && 'in-view')}
        >
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6e6e73] dark:text-[#86868b]">
            The Report
          </p>
          <h2 className="mb-6 text-[36px] font-bold leading-[1.08] tracking-[-0.04em] text-[#1d1d1f] dark:text-[#f5f5f7] md:text-[48px]">
            Evidence included.
          </h2>
          <p className="mx-auto max-w-[520px] text-[17px] leading-[1.5] text-[#6e6e73] dark:text-[#86868b]">
            Every finding shows what PreFlight found, why it matters, and what to change. Not just a pass or fail.
          </p>
        </div>
      </div>

      <div
        ref={imgRef as React.RefObject<HTMLDivElement>}
        className={cn('mx-auto max-w-[1100px] fade-up', imgIn && 'in-view')}
      >
        <img
          src="/report.jpg"
          alt="PreFlight's report view, showing warnings including a Dynamic Type accessibility issue with its evidence, why it matters, and suggested fix"
          className="w-full select-none"
          draggable={false}
          style={{ display: 'block' }}
        />
      </div>

      <div className="mx-auto max-w-3xl">
        <p className="mx-auto mt-10 max-w-[560px] text-center text-[13px] leading-[1.6] text-[#6e6e73] dark:text-[#86868b]">
          <span className="font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">Heuristic</span> findings are educated guesses PreFlight flags for your judgment — they can be wrong in either direction.
        </p>
      </div>
    </section>
  )
}
