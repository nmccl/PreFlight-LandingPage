import JoinWaitlistForm from '../components/JoinWaitlistForm'

export default function Download() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-6 bg-white dark:bg-black">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[12px] font-medium tracking-[0.14em] uppercase text-[#0071e3] mb-5">Join the waitlist</p>
        <h1 className="text-[56px] font-bold tracking-[-0.04em] leading-[1.05] text-[#1d1d1f] dark:text-white mb-6">
          Request access to PreFlight
        </h1>
        <p className="text-[19px] text-[#6e6e73] mb-10">
          PreFlight is launching soon. Add your email and we&apos;ll let you know when access is available.
        </p>
        <JoinWaitlistForm />
      </div>
    </main>
  )
}
