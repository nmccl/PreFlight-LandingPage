declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined

let scriptInjected = false

export function loadAnalytics() {
  if (!MEASUREMENT_ID || scriptInjected) return
  scriptInjected = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', MEASUREMENT_ID, { anonymize_ip: true })
}

export function disableAnalytics() {
  if (MEASUREMENT_ID) {
    ;(window as unknown as Record<string, boolean>)[`ga-disable-${MEASUREMENT_ID}`] = true
  }
  for (const name of ['_ga', '_gid', `_ga_${MEASUREMENT_ID?.replace(/^G-/, '')}`]) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
  }
}
