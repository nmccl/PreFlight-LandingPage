import { Link } from 'react-router-dom'
import { useCookieConsent } from '../hooks/useCookieConsent'

export default function CookieConsentBanner() {
  const { consent, accept, reject } = useCookieConsent()

  if (consent !== null) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-[20px] border border-black/[0.06] bg-white/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.08] dark:bg-[#1d1d1f]/95">
        <p className="text-[13px] leading-6 text-[#424245] dark:text-[#d1d1d6]">
          We use cookies to understand how visitors use this site. See our{' '}
          <Link to="/privacy" className="text-[#0071e3] underline-offset-4 hover:underline">
            Privacy Policy
          </Link>{' '}
          to learn more.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={reject}
            className="rounded-full border border-black/10 px-5 py-2 text-[13px] font-semibold text-[#1d1d1f] transition-colors duration-150 hover:bg-black/[0.04] dark:border-white/15 dark:text-white dark:hover:bg-white/[0.06]"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-full bg-[#0071e3] px-5 py-2 text-[13px] font-semibold text-white transition-colors duration-150 hover:bg-[#0071e3]/90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
