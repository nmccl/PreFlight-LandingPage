import { useCallback, useEffect, useState } from 'react'

export type ConsentStatus = 'accepted' | 'rejected' | null

const STORAGE_KEY = 'preflight-cookie-consent'
const CONSENT_CHANGED_EVENT = 'preflight-consent-changed'

function readStoredConsent(): ConsentStatus {
  const value = window.localStorage.getItem(STORAGE_KEY)
  return value === 'accepted' || value === 'rejected' ? value : null
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus>(readStoredConsent)

  useEffect(() => {
    const handleChange = () => setConsent(readStoredConsent())
    window.addEventListener(CONSENT_CHANGED_EVENT, handleChange)
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, handleChange)
  }, [])

  const setAndBroadcast = useCallback((status: ConsentStatus) => {
    if (status === null) {
      window.localStorage.removeItem(STORAGE_KEY)
    } else {
      window.localStorage.setItem(STORAGE_KEY, status)
    }
    setConsent(status)
    window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT))
  }, [])

  return {
    consent,
    accept: () => setAndBroadcast('accepted'),
    reject: () => setAndBroadcast('rejected'),
    resetConsent: () => setAndBroadcast(null),
  }
}
