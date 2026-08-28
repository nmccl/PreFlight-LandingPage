import { useEffect } from 'react'
import { useCookieConsent } from '../hooks/useCookieConsent'
import { disableAnalytics, loadAnalytics } from '../lib/analytics'

export default function Analytics() {
  const { consent } = useCookieConsent()

  useEffect(() => {
    if (consent === 'accepted') {
      loadAnalytics()
    } else if (consent === 'rejected') {
      disableAnalytics()
    }
  }, [consent])

  return null
}
