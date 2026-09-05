import { useState } from 'react'
import { ChevronUp } from 'lucide-react'
import toast from 'react-hot-toast'
import { cn } from '../../lib/utils'
import { toggleVote } from '../../lib/feedbackApi'

type VoteButtonProps = {
  postId: string
  votesCount: number
  voted: boolean
  onChange: (voted: boolean, votesCount: number) => void
}

export default function VoteButton({ postId, votesCount, voted, onChange }: VoteButtonProps) {
  const [pending, setPending] = useState(false)

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if (pending) return

    setPending(true)
    try {
      const result = await toggleVote(postId)
      onChange(result.voted, result.votes_count)
    } catch {
      toast.error('Could not register your vote. Try again.')
    } finally {
      setPending(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className={cn(
        'flex flex-col items-center justify-center w-14 h-14 rounded-2xl border transition-colors duration-150 select-none shrink-0',
        voted
          ? 'bg-[#0071e3] border-[#0071e3] text-white'
          : 'bg-[#f5f5f7] dark:bg-white/[0.06] border-black/[0.06] dark:border-white/[0.08] text-[#1d1d1f] dark:text-white hover:border-[#0071e3]/40'
      )}
    >
      <ChevronUp size={16} strokeWidth={2.5} />
      <span className="text-[13px] font-semibold leading-none mt-0.5">{votesCount}</span>
    </button>
  )
}
