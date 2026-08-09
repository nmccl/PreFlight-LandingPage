import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/70 backdrop-blur-2xl border-b border-black/[0.07] dark:border-white/[0.08] dark:bg-black/70'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
        <Link
          to="/"
          className="text-[20px] font-bold tracking-tight text-[#1d1d1f] dark:text-white select-none"
        >
          PreFlight
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `text-[12px] transition-colors duration-150 ${
                  isActive
                    ? 'text-[#1d1d1f] dark:text-white'
                    : 'text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/waitlist"
          className="text-[12px] font-medium px-[14px] py-[6px] rounded-full bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] hover:bg-[#424245] dark:hover:bg-[#f5f5f7] transition-colors duration-150 select-none"
        >
          Waitlist
        </Link>
      </div>
    </header>
  )
}
