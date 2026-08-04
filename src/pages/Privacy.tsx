export default function Privacy() {
  return (
    <main className="min-h-screen bg-white px-6 pb-24 pt-28 text-[#1d1d1f] dark:bg-black dark:text-[#f5f5f7]">
      <div className="mx-auto max-w-4xl">
        <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#0071e3]">
          Legal
        </p>
        <h1 className="mb-6 text-[40px] font-semibold tracking-[-0.035em] leading-[1.02] sm:text-[48px]">
          Privacy Policy
        </h1>
        <p className="mb-8 text-[15px] text-[#6e6e73] dark:text-[#86868b]">
          Effective date: July 23, 2026
        </p>

        <article className="rounded-[32px] border border-black/[0.06] bg-white/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur sm:p-10 dark:border-white/[0.08] dark:bg-white/[0.04]">
          <p className="mb-6 text-[17px] leading-8 text-[#1d1d1f] dark:text-[#f5f5f7]">
            PreFlight is a macOS developer tool that analyzes your Xcode projects for App Store review readiness. It was built to work entirely on your Mac. This policy explains what information PreFlight handles, where it lives, and what never leaves your computer.
          </p>

          <section className="mb-8">
            <h2 className="mb-3 text-[18px] font-semibold tracking-[-0.02em]">
              The short version
            </h2>
            <p className="text-[15px] leading-8 text-[#424245] dark:text-[#d1d1d6]">
              PreFlight does not collect, sell, or share your personal information. It has no accounts, no analytics, no advertising, no tracking, and no servers of our own. Everything the app knows about you and your projects stays on your Mac, with one exception you control: if you add an App Store Connect API key, PreFlight talks directly to Apple on your behalf.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-[18px] font-semibold tracking-[-0.02em]">
              Information stored on your Mac
            </h2>
            <ul className="space-y-3 text-[15px] leading-8 text-[#424245] dark:text-[#d1d1d6]">
              <li><span className="font-semibold text-[#1d1d1f] dark:text-white">Settings.</span> Your preferences, including appearance, Apple Intelligence summary settings, and onboarding state, are stored in the app’s preferences on your Mac.</li>
              <li><span className="font-semibold text-[#1d1d1f] dark:text-white">Recent projects.</span> PreFlight remembers the projects you’ve opened using macOS security-scoped bookmarks so it can reopen them with your permission. You can remove entries at any time from the Home screen.</li>
              <li><span className="font-semibold text-[#1d1d1f] dark:text-white">Reports.</span> The most recent analysis report for each project is saved in the app’s local container so you can revisit it. Reports never leave your Mac.</li>
              <li><span className="font-semibold text-[#1d1d1f] dark:text-white">App Store Connect credentials.</span> If you connect App Store Connect, your Issuer ID and Key ID are stored in the app’s preferences, and your private key (.p8) is stored in the macOS Keychain on your Mac. Your credentials are never sent to us.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-[18px] font-semibold tracking-[-0.02em]">
              Your source code
            </h2>
            <p className="text-[15px] leading-8 text-[#424245] dark:text-[#d1d1d6]">
              PreFlight reads your project files locally in order to analyze them. Your source code is never uploaded anywhere, never used for anything other than producing your report, and never retained beyond what is described above.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-[18px] font-semibold tracking-[-0.02em]">
              Information sent over the network
            </h2>
            <ul className="space-y-3 text-[15px] leading-8 text-[#424245] dark:text-[#d1d1d6]">
              <li><span className="font-semibold text-[#1d1d1f] dark:text-white">App Store Connect (optional, at your direction).</span> If you add an API key, PreFlight calls Apple’s App Store Connect API directly using your credentials solely to read your app’s metadata such as privacy policy URL, description, screenshots, and subscription configuration. PreFlight only reads; it never modifies your apps. This traffic goes to Apple, not to us, and is subject to Apple’s privacy policy and terms.</li>
              <li><span className="font-semibold text-[#1d1d1f] dark:text-white">Nothing else.</span> PreFlight sends no telemetry, crash reports, usage statistics, or identifiers to us or any third party.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-[18px] font-semibold tracking-[-0.02em]">
              Apple Intelligence
            </h2>
            <p className="text-[15px] leading-8 text-[#424245] dark:text-[#d1d1d6]">
              If you enable AI summaries, they are generated by Apple Intelligence on-device. Your report data is processed locally by the system model and is not sent to us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-[18px] font-semibold tracking-[-0.02em]">
              Children
            </h2>
            <p className="text-[15px] leading-8 text-[#424245] dark:text-[#d1d1d6]">
              PreFlight is a professional developer tool and is not directed at children under 13. We do not knowingly collect personal information from anyone, including children.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-[18px] font-semibold tracking-[-0.02em]">
              Your choices
            </h2>
            <ul className="space-y-3 text-[15px] leading-8 text-[#424245] dark:text-[#d1d1d6]">
              <li>You can remove recent projects from the Home screen at any time.</li>
              <li>You can remove your App Store Connect key in Settings, which deletes the private key from your Keychain.</li>
              <li>You can delete the app, which removes its local container, including settings and saved reports.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-[18px] font-semibold tracking-[-0.02em]">
              Changes to this policy
            </h2>
            <p className="text-[15px] leading-8 text-[#424245] dark:text-[#d1d1d6]">
              If PreFlight’s privacy practices ever change, we will update this policy and its effective date before the change takes effect.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[18px] font-semibold tracking-[-0.02em]">
              Contact
            </h2>
            <p className="text-[15px] leading-8 text-[#424245] dark:text-[#d1d1d6]">
              Questions about privacy are welcome at{' '}
              <a href="mailto:contact@noahmcclung.com" className="text-[#0071e3] underline-offset-4 hover:underline">
                contact@noahmcclung.com
              </a>
            </p>
          </section>
        </article>
      </div>
    </main>
  )
}
