export default function Review() {
  const checksum = 'aeb05be2ec6a09fb035e192b3cc85e78fb32127f1f2d1394b61fe12b3f6c3334'

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-sm border border-black/[0.06] overflow-hidden">

        {/* Header */}
        <div className="px-10 pt-10 pb-8 border-b border-[#f5f5f7]">
          <div className="flex items-center gap-3 mb-6">
            <img src="/app-icon.png" alt="PreFlight" className="w-10 h-10 rounded-xl" />
            <span className="text-[18px] font-semibold tracking-tight text-[#1d1d1f]">PreFlight</span>
          </div>
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#6e6e73] mb-2">
            Apple Review
          </p>
          <h1 className="text-[28px] font-semibold tracking-[-0.03em] leading-tight text-[#1d1d1f]">
            Test Project Download
          </h1>
          <p className="mt-3 text-[15px] text-[#6e6e73] leading-relaxed">
            This package contains <strong className="text-[#1d1d1f] font-medium">PreFlightTest</strong> — a
            sample Xcode project with intentional issues built in. It exists solely as something to open in
            PreFlight so the app has a real project to analyze. No build or device needed.
          </p>
        </div>

        {/* Download */}
        <div className="px-10 py-8 border-b border-[#f5f5f7]">
          <a
            href="/PreFlightTest.zip"
            download="PreFlightTest.zip"
            className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] active:bg-[#006edb] text-white text-[15px] font-medium transition-colors duration-150 select-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PreFlightTest.zip
          </a>
          <p className="mt-3 text-center text-[13px] text-[#6e6e73]">41 KB · Xcode project</p>
        </div>

        {/* Integrity */}
        <div className="px-10 py-8 border-b border-[#f5f5f7]">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#6e6e73] mb-3">
            File Integrity
          </p>
          <div className="bg-[#f5f5f7] rounded-xl px-4 py-3">
            <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#6e6e73] mb-1.5">SHA-256</p>
            <p className="font-mono text-[12px] text-[#1d1d1f] break-all leading-relaxed select-all">{checksum}</p>
          </div>
          <p className="mt-3 text-[12px] text-[#6e6e73]">
            Verify with:{' '}
            <code className="bg-[#f5f5f7] px-1.5 py-0.5 rounded text-[11px] text-[#1d1d1f]">
              shasum -a 256 PreFlightTest.zip
            </code>
          </p>
        </div>

        {/* How to use */}
        <div className="px-10 py-8 border-b border-[#f5f5f7]">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#6e6e73] mb-3">
            How to Use
          </p>
          <ol className="space-y-3">
            {[
              'Download and unzip PreFlightTest.zip',
              'Open PreFlight',
              'Add the project — select the PreFlightTest.xcodeproj file',
              'PreFlight will scan it and surface findings',
            ].map((step, i) => (
              <li key={step} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0071e3] text-white text-[11px] font-semibold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-[13px] text-[#1d1d1f] leading-snug">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Contents */}
        <div className="px-10 py-8 border-b border-[#f5f5f7]">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#6e6e73] mb-3">
            What's Inside
          </p>
          <ul className="space-y-2 text-[14px] text-[#1d1d1f]">
            {[
              'PreFlightTest.xcodeproj — Xcode project file (the entry point for PreFlight)',
              'ContentView.swift — SwiftUI entry point',
              'Views/ — HomeView, LoginView, PaywallView, and more',
              'Services/ — StoreKit, Auth, Analytics, Location, Audio',
              'Helpers/ — Biometric auth, feature flags, health data',
              'Configuration/ — Debug & Release xcconfig files',
              'PrivacyInfo.xcprivacy — Privacy manifest',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-[3px] text-[#34c759] flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-[13px] leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="px-10 py-8">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#6e6e73] mb-2">
            Questions?
          </p>
          <p className="text-[13px] text-[#6e6e73]">
            Reach the developer at{' '}
            <a
              href="mailto:noah_mcclung@icloud.com"
              className="text-[#0071e3] hover:underline"
            >
              noah_mcclung@icloud.com
            </a>
          </p>
        </div>
      </div>

      <p className="mt-8 text-[12px] text-[#6e6e73]">
        PreFlight · Temporary review resource
      </p>
    </div>
  )
}
