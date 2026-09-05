import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import VoteButton from '../components/feedback/VoteButton'
import CommentForm from '../components/feedback/CommentForm'
import CommentItem from '../components/feedback/CommentItem'
import { deletePost, fetchComments, fetchPost, fetchVotedPostIds, updatePost } from '../lib/feedbackApi'
import { getPostToken, removePostToken } from '../lib/ownership'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import type { Comment, Post } from '../types/feedback'

export default function FeedbackPost() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [voted, setVoted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editDetails, setEditDetails] = useState('')

  useDocumentMeta(
    post ? `${post.title} - Feedback - PreFlight` : 'Feedback - PreFlight',
    post ? post.details.slice(0, 160) : 'Share ideas and vote on what we build next for PreFlight.',
    id ? `/feedback/${id}` : '/feedback'
  )

  const load = useCallback(async () => {
    if (!id) return
    setLoading(true)
    try {
      const [postData, commentsData, votedIds] = await Promise.all([
        fetchPost(id),
        fetchComments(id),
        fetchVotedPostIds([id]),
      ])
      setPost(postData)
      setComments(commentsData)
      setVoted(votedIds.has(id))
    } catch {
      toast.error('Could not load this post.')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  if (loading) {
    return <main className="pt-32 pb-24 px-6 text-center text-[13px] text-[#86868b]">Loading...</main>
  }

  if (!post || !id) {
    return (
      <main className="pt-32 pb-24 px-6 text-center">
        <p className="text-[15px] text-[#6e6e73] dark:text-[#a1a1a6]">This post could not be found.</p>
        <Link to="/feedback" className="mt-4 inline-block text-[13px] text-[#0071e3]">
          Back to feedback
        </Link>
      </main>
    )
  }

  const editToken = getPostToken(id)

  const handleDelete = async () => {
    if (!editToken) return
    if (!window.confirm('Delete this post? This cannot be undone.')) return
    try {
      const ok = await deletePost({ postId: id, editToken })
      if (ok) {
        removePostToken(id)
        toast.success('Post deleted.')
        navigate('/feedback')
      } else {
        toast.error('Could not delete this post.')
      }
    } catch {
      toast.error('Could not delete this post.')
    }
  }

  const startEdit = () => {
    setEditTitle(post.title)
    setEditDetails(post.details)
    setEditing(true)
  }

  const handleSaveEdit = async () => {
    if (!editToken) return
    try {
      const ok = await updatePost({ postId: id, title: editTitle, details: editDetails, editToken })
      if (ok) {
        setPost({ ...post, title: editTitle, details: editDetails })
        setEditing(false)
        toast.success('Post updated.')
      } else {
        toast.error('Could not update this post.')
      }
    } catch {
      toast.error('Could not update this post.')
    }
  }

  return (
    <main className="pt-32 pb-24 px-6 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/feedback"
          className="inline-flex items-center gap-1.5 text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white mb-6"
        >
          <ArrowLeft size={14} />
          Back to feedback
        </Link>

        <div className="flex items-start gap-4 p-6 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-white/[0.03]">
          <VoteButton
            postId={post.id}
            votesCount={post.votes_count}
            voted={voted}
            onChange={(v, c) => {
              setVoted(v)
              setPost((p) => (p ? { ...p, votes_count: c } : p))
            }}
          />
          <div className="min-w-0 flex-1">
            {editing ? (
              <div className="flex flex-col gap-3">
                <input
                  value={editTitle}
                  onChange={(event) => setEditTitle(event.target.value)}
                  maxLength={120}
                  className="w-full h-11 px-4 rounded-xl bg-[#f5f5f7] dark:bg-white/[0.06] text-[16px] font-semibold text-[#1d1d1f] dark:text-white outline-none focus:ring-2 focus:ring-[#0071e3]/40"
                />
                <textarea
                  value={editDetails}
                  onChange={(event) => setEditDetails(event.target.value)}
                  maxLength={4000}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-[#f5f5f7] dark:bg-white/[0.06] text-[14px] text-[#1d1d1f] dark:text-white outline-none focus:ring-2 focus:ring-[#0071e3]/40 resize-none"
                />
                <div className="flex items-center gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="text-[13px] font-medium px-4 h-9 rounded-full text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    className="text-[13px] font-medium px-5 h-9 rounded-full bg-[#0071e3] text-white hover:bg-[#0077ed]"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-3">
                  <h1 className="text-[22px] font-semibold tracking-[-0.02em] text-[#1d1d1f] dark:text-white">
                    {post.title}
                  </h1>
                  {editToken && (
                    <div className="flex items-center gap-3 shrink-0 text-[12px]">
                      <button
                        type="button"
                        onClick={startEdit}
                        className="text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white"
                      >
                        Edit
                      </button>
                      <button type="button" onClick={handleDelete} className="text-[#ff3b30] hover:text-[#ff3b30]/80">
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <p className="mt-3 text-[14px] leading-[1.6] text-[#1d1d1f] dark:text-[#f5f5f7] whitespace-pre-wrap">
                  {post.details}
                </p>
                <p className="mt-4 text-[12px] text-[#86868b]">
                  {new Date(post.created_at).toLocaleDateString(undefined, {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#86868b] mb-4">
            {comments.length} {comments.length === 1 ? 'Reply' : 'Replies'}
          </h2>

          <div className="flex flex-col gap-3 mb-6">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} onChanged={load} />
            ))}
          </div>

          <CommentForm postId={id} onCreated={load} />
        </div>
      </div>
    </main>
  )
}
