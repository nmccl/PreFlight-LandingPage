import { Link } from 'react-router-dom'
import { CTA_HREF } from '../lib/cta'
import { useCookieConsent } from '../hooks/useCookieConsent'

export default function Footer() {
  const { resetConsent } = useCookieConsent()

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
                { label: 'Waitlist', to: CTA_HREF },
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
              <li>
                <button
                  type="button"
                  onClick={resetConsent}
                  className="text-[13px] text-white/50 hover:text-white transition-colors duration-150"
                >
                  Cookie Preferences
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-4">Contact</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@noahmcclung.com"
                  className="text-[13px] text-white/50 hover:text-white transition-colors duration-150"
                >
                  contact@noahmcclung.com
                </a>
              </li>
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
