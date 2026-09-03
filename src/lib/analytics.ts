import posthog from 'posthog-js'

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined
const POSTHOG_HOST =
  (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ?? 'https://us.i.posthog.com'

let initialized = false

export function loadAnalytics() {
  if (!POSTHOG_KEY) return

  if (!initialized) {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: 'identified_only',
      capture_pageview: true,
    })
    initialized = true
  } else {
    posthog.opt_in_capturing()
  }
}

export function disableAnalytics() {
  if (initialized) {
    posthog.opt_out_capturing()
  }
}
