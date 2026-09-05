import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Analytics from './components/Analytics'
import CookieConsentBanner from './components/CookieConsentBanner'
import Home from './pages/Home'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Download from './pages/Download'
import Feedback from './pages/Feedback'
import FeedbackPost from './pages/FeedbackPost'

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7]">
      <Analytics />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/waitlist" element={<Download />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/feedback/:id" element={<FeedbackPost />} />
      </Routes>
      <Footer />
      <CookieConsentBanner />
    </div>
  )
}
