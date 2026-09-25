import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CTA_HREF } from '../lib/cta'
import { useCookieConsent } from '../hooks/useCookieConsent'
import { isValidEmail } from '../lib/utils'

const LOOPS_FORM_ID = 'cmsl9g8ac2axy0j1akr5nhh84'

function UpdatesStrip() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setStatus('error')
      setErrorMsg('Please enter a valid email address.')
      return
    }
    setStatus('submitting')
    fetch(`https://app.loops.so/api/newsletter-form/${LOOPS_FORM_ID}`, {
      method: 'POST',
      body: `userGroup=&email=${encodeURIComponent(email)}&mailingLists=`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then(res => Promise.all([res.ok, res.json()]))
      .then(([ok, data]) => {
        if (ok) {
          setStatus('done')
        } else {
          setStatus('error')
          setErrorMsg((data as { message?: string }).message ?? 'Something went wrong.')
        }
      })
      .catch(() => {
        setStatus('error')
        setErrorMsg('Something went wrong. Please try again.')
      })
  }

  return (
    <div className="pb-12 mb-12 border-b border-white/[0.07] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <div>
        <p className="text-[14px] font-medium text-white">Stay in the loop</p>
        <p className="text-[13px] text-white/40 mt-1">Release notes and updates. No spam.</p>
      </div>

      {status === 'done' ? (
        <p className="text-[13px] text-[#34c759] flex items-center gap-2">
          <span>✓</span> You&apos;re in.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex-1 sm:w-[260px]">
            <input
              type="email"
              value={email}
              placeholder="your@email.com"
              onChange={e => {
                setEmail(e.target.value)
                if (status === 'error') { setStatus('idle'); setErrorMsg('') }
              }}
              className="w-full h-[36px] px-3 rounded-lg bg-white/[0.06] border border-white/[0.10] text-[13px] text-white placeholder:text-white/30 outline-none focus:border-white/25 transition-colors"
            />
            {status === 'error' && (
              <p className="mt-1 text-[11px] text-[#ff3b30]">{errorMsg}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="h-[36px] px-4 rounded-lg bg-white/[0.08] border border-white/[0.10] text-[13px] font-medium text-white/80 hover:bg-white/[0.12] hover:text-white transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {status === 'submitting' ? 'Submitting…' : 'Notify me'}
          </button>
        </form>
      )}
    </div>
  )
}

export default function Footer() {
  const { resetConsent } = useCookieConsent()

  return (
    <footer className="bg-[#000] border-t border-white/[0.07] px-6 py-14">
      <div className="max-w-6xl mx-auto">
        <UpdatesStrip />
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
                { label: 'Updates', to: '/waitlist' },
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
                  href="mailto:noah_mcclung@icloud.com"
                  className="text-[13px] text-white/50 hover:text-white transition-colors duration-150"
                >
                  noah_mcclung@icloud.com
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
