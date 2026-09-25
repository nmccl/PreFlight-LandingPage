import JoinWaitlistForm from '../components/JoinWaitlistForm'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Download() {
  useDocumentMeta(
    'Stay Updated - PreFlight',
    'Get release notes and updates from PreFlight delivered to your inbox.',
    '/waitlist'
  )

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 bg-white dark:bg-black">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[12px] font-medium tracking-[0.14em] uppercase text-[#0071e3] mb-5">Stay in the loop</p>
        <h1 className="text-[56px] font-bold tracking-[-0.04em] leading-[1.05] text-[#1d1d1f] dark:text-white mb-6">
          Get updates from PreFlight
        </h1>
        <p className="text-[19px] text-[#6e6e73] mb-10">
          Release notes, tips, and news. No spam, unsubscribe anytime.
        </p>
        <JoinWaitlistForm />
      </div>
    </main>
  )
}
