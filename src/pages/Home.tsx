import Hero from '../components/Hero'
import ReadinessScore from '../components/ReadinessScore'
import AISummary from '../components/AISummary'
import IssueCounter from '../components/IssueCounter'
import DownloadCTA from '../components/DownloadCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <ReadinessScore />
      <AISummary />
      <IssueCounter />
      <DownloadCTA />
    </>
  )
}
