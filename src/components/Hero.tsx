import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../lib/utils'

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="bg-white overflow-hidden">
      {/* Text block */}
      <div className="pt-[136px] pb-5 text-center px-6">
        <div className={cn('transition-all duration-1000 ease-out', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
          <img
            src="/app-icon.png"
            alt="PreFlight"
            className="w-[100px] h-[100px] rounded-[14px] mx-auto mb-7 select-none"
            draggable={false}
          />
         
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#6e6e73] mb-6 select-none">
            For macOS
          </p>
          <h1 className="text-[72px] md:text-[88px] lg:text-[96px] font-bold tracking-[-0.05em] leading-[0.97] text-[#1d1d1f] mb-7">
            Ship with confidence.
          </h1>
          <p className="text-[19px] md:text-[21px] text-[#6e6e73] leading-[1.45] max-w-[400px] mx-auto mb-11">
            Know your app is ready<br />before App Review does.
          </p>
          <Link
            to="/download"
            className="inline-flex items-center px-8 py-[14px] rounded-full bg-[#1d1d1f] text-white text-[17px] font-medium hover:bg-[#424245] transition-colors duration-200 select-none"
          >
            Download PreFlight
          </Link>
        </div>
      </div>

      {/* MacBook product shot — the hero itself */}
      <div
        className={cn(
          'max-w-[1500px] mx-auto px-1 md:px-2 transition-all duration-1000 ease-out delay-300',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}
      >
        <img
          src="/macbook.jpg"
          alt="PreFlight running on MacBook"
          className="w-full select-none"
          draggable={false}
          style={{ display: 'block' }}
        />
      </div>
    </section>
  )
}
