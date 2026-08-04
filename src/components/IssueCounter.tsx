import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { cn } from '../lib/utils'

type Step = 2 | 1 | 0

const stepColor: Record<Step, string> = {
  2: '#ff3b30',
  1: '#ff9500',
  0: '#34c759',
}

const stepLabel: Record<Step, string> = {
  2: 'Critical issues.',
  1: 'One remains.',
  0: 'All clear.',
}

export default function IssueCounter() {
  const { ref, inView } = useInView(0.4)
  const [step, setStep] = useState<Step>(2)
  const [show, setShow] = useState(true)

  function transition(next: Step, delay: number) {
    setTimeout(() => {
      setShow(false)
      setTimeout(() => {
        setStep(next)
        setShow(true)
      }, 350)
    }, delay)
  }

  useEffect(() => {
    if (!inView) return
    transition(1, 1100)
    transition(0, 2500)
  }, [inView])

  const color = stepColor[step]

  return (
    <section className="bg-white px-6 py-40 dark:bg-black">
      <div className="mx-auto max-w-xl text-center">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={cn('fade-up', inView && 'in-view')}
        >
          <p className="mb-16 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6e6e73] dark:text-[#86868b] select-none">
            Issue Detection
          </p>

          {/* The giant number */}
          <div
            style={{
              opacity: show ? 1 : 0,
              transform: show ? 'scale(1)' : 'scale(0.96)',
              transition: 'opacity 0.35s ease, transform 0.35s ease, color 0.4s ease',
              color,
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            <span
              className="font-bold select-none block"
              style={{ fontSize: 'clamp(140px, 18vw, 220px)', letterSpacing: '-0.05em' }}
            >
              {step}
            </span>
          </div>

          {/* Label */}
          <p
            className="mt-4 font-medium text-[#1d1d1f] dark:text-[#f5f5f7]"
            style={{
              fontSize: '22px',
              opacity: show ? 1 : 0,
              transition: 'opacity 0.35s ease',
            }}
          >
            {stepLabel[step]}
          </p>

          {/* Subtext appears only at 0 */}
          <p
            style={{
              fontSize: '15px',
              color: '#6e6e73',
              marginTop: '12px',
              opacity: step === 0 && show ? 1 : 0,
              transform: step === 0 && show ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
            }}
          >
            Your app is ready to submit.
          </p>
        </div>
      </div>
    </section>
  )
}
