import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { cn } from '../lib/utils'

const TARGET = 92
const DURATION = 1900

function ScoreRing({ animate }: { animate: boolean }) {
  const [count, setCount] = useState(0)
  const [offset, setOffset] = useState(0)

  const r = 124
  const strokeW = 11
  const circumference = 2 * Math.PI * r

  useEffect(() => {
    if (!animate) return
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const val = Math.round(eased * TARGET)
      setCount(val)
      setOffset(circumference * (1 - eased * TARGET / 100))
      if (t < 1) requestAnimationFrame(tick)
    }

    setOffset(circumference)
    requestAnimationFrame(tick)
  }, [animate, circumference])

  return (
    <div className="relative mx-auto" style={{ width: 296, height: 296 }}>
      <svg width="296" height="296" style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}>
        <circle cx="148" cy="148" r={r} fill="none" stroke="#E5E5EA" strokeWidth={strokeW} className="dark:stroke-[#2a2a2d]" />
        <circle
          cx="148" cy="148" r={r}
          fill="none"
          stroke="#34c759"
          strokeWidth={strokeW}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animate ? offset : circumference}
          style={{ transition: animate ? 'none' : undefined }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
        <span className="text-[76px] font-bold tracking-[-0.04em] leading-none text-[#1d1d1f] tabular-nums dark:text-[#f5f5f7]">
          {count}
        </span>
        <span className="mt-2 text-[15px] text-[#6e6e73] dark:text-[#86868b]">out of 100</span>
      </div>
    </div>
  )
}

export default function ReadinessScore() {
  const { ref: headRef, inView: headIn } = useInView()
  const { ref: ringRef, inView: ringIn } = useInView(0.35)

  return (
    <section className="bg-white px-6 py-10 dark:bg-black">
      <div className="mx-auto max-w-2xl text-center">
        {/* Headline */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={cn('mb-20 fade-up', headIn && 'in-view')}
        >
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6e6e73] dark:text-[#86868b]">
            Release Readiness
          </p>
          <h2 className="text-[52px] font-bold leading-[1.02] tracking-[-0.045em] text-[#1d1d1f] dark:text-[#f5f5f7] md:text-[64px]">
            Know before<br />you submit.
          </h2>
        </div>

        {/* Ring */}
        <div
          ref={ringRef as React.RefObject<HTMLDivElement>}
          className={cn('fade-up', ringIn && 'in-view')}
        >
          <ScoreRing animate={ringIn} />

          <p
            className="mt-10 text-[19px] text-[#6e6e73] dark:text-[#86868b]"
            style={{
              opacity: ringIn ? 1 : 0,
              transform: ringIn ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.7s ease 1.9s, transform 0.7s ease 1.9s',
            }}
          >
            Ready for submission.
          </p>
        </div>
      </div>
    </section>
  )
}
