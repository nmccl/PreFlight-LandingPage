import { useEffect } from 'react'

const BASE_URL = 'https://www.pre-flight.info'

export function useDocumentMeta(title: string, description: string, path: string) {
  useEffect(() => {
    document.title = title

    const descTag = document.querySelector('meta[name="description"]')
    if (descTag) descTag.setAttribute('content', description)

    const canonicalTag = document.querySelector('link[rel="canonical"]')
    if (canonicalTag) canonicalTag.setAttribute('href', `${BASE_URL}${path}`)

    return () => {
      document.title = 'PreFlight - App Review Readiness for Apple Developers'
      if (descTag) {
        descTag.setAttribute(
          'content',
          "PreFlight checks your Xcode project against your App Store Connect submission and catches preventable App Review rejections before you submit."
        )
      }
      if (canonicalTag) canonicalTag.setAttribute('href', `${BASE_URL}/`)
    }
  }, [title, description, path])
}
