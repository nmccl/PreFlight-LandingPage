import Hero from '../components/Hero'
import ReadinessScore from '../components/ReadinessScore'
import WhatItCatches from '../components/WhatItCatches'
import CrossCheck from '../components/CrossCheck'
import WorkflowComparison from '../components/WorkflowComparison'
import IssueCounter from '../components/IssueCounter'
import FindingReport from '../components/FindingReport'
import AISummary from '../components/AISummary'
import Trust from '../components/Trust'
import Coverage from '../components/Coverage'
import DownloadCTA from '../components/DownloadCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <ReadinessScore />
      <WhatItCatches />
      <CrossCheck />
      <WorkflowComparison />
      <IssueCounter />
      <FindingReport />
      <AISummary />
      <Trust />
      <Coverage />
      <DownloadCTA />
    </>
  )
}
