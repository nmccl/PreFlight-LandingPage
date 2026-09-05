import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import VoteButton from './VoteButton'
import type { Post } from '../../types/feedback'

type PostCardProps = {
  post: Post
  voted: boolean
  onVoteChange: (postId: string, voted: boolean, votesCount: number) => void
}

export default function PostCard({ post, voted, onVoteChange }: PostCardProps) {
  return (
    <Link
      to={`/feedback/${post.id}`}
      className="flex items-start gap-4 p-5 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-white/[0.03] hover:border-black/[0.12] dark:hover:border-white/[0.16] transition-colors duration-150"
    >
      <VoteButton
        postId={post.id}
        votesCount={post.votes_count}
        voted={voted}
        onChange={(v, c) => onVoteChange(post.id, v, c)}
      />
      <div className="min-w-0 flex-1">
        <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-[#1d1d1f] dark:text-white truncate">
          {post.title}
        </h3>
        <p className="mt-1 text-[13px] leading-[1.5] text-[#6e6e73] dark:text-[#a1a1a6] line-clamp-2">
          {post.details}
        </p>
        <div className="mt-3 flex items-center gap-4 text-[12px] text-[#86868b]">
          <span className="inline-flex items-center gap-1">
            <MessageCircle size={13} />
            {post.comments_count}
          </span>
          <span>
            {new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>
    </Link>
  )
}
