import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#000] border-t border-white/[0.07] px-6 py-14">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div>
            <p className="text-[13px] font-semibold text-white mb-4">PreFlight</p>
            <p className="text-[13px] text-white/40 leading-[1.6]">
              Ship with confidence.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-4">Product</p>
            <ul className="space-y-3">
              {[
                { label: 'Features', to: '/#features' },
                { label: 'Waitlist', to: '/waitlist' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-[13px] text-white/50 hover:text-white transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-4">Legal</p>
            <ul className="space-y-3">
              {[
                { label: 'Privacy Policy', to: '/privacy' },
                { label: 'Terms of Use', to: '/terms' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-[13px] text-white/50 hover:text-white transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-4">Connect</p>
            <ul className="space-y-3">
              {[
                { label: 'GitHub', href: 'https://github.com' },
                { label: 'X', href: 'https://x.com' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-white/50 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.07] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[12px] text-white/30">
            © {new Date().getFullYear()} PreFlight. All rights reserved.
          </p>
          <p className="text-[12px] text-white/20">
            Designed for Apple developers.
          </p>
        </div>
      </div>
    </footer>
  )
}
