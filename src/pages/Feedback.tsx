import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import PostCard from '../components/feedback/PostCard'
import SearchFilterBar from '../components/feedback/SearchFilterBar'
import NewPostForm from '../components/feedback/NewPostForm'
import { fetchPosts, fetchVotedPostIds } from '../lib/feedbackApi'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import type { Post, SortOption } from '../types/feedback'

export default function Feedback() {
  useDocumentMeta(
    'Feedback - PreFlight',
    'Share ideas, report issues, and vote on what we build next for PreFlight.',
    '/feedback'
  )

  const [posts, setPosts] = useState<Post[]>([])
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortOption>('top')
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchPosts({ sort, search })
      setPosts(data)
      const voted = await fetchVotedPostIds(data.map((p) => p.id))
      setVotedIds(voted)
    } catch {
      toast.error('Could not load feedback.')
    } finally {
      setLoading(false)
    }
  }, [sort, search])

  useEffect(() => {
    const timeout = setTimeout(load, search ? 300 : 0)
    return () => clearTimeout(timeout)
  }, [load, search])

  const handleVoteChange = (postId: string, voted: boolean, votesCount: number) => {
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, votes_count: votesCount } : p)))
    setVotedIds((prev) => {
      const next = new Set(prev)
      if (voted) next.add(postId)
      else next.delete(postId)
      return next
    })
  }

  return (
    <main className="pt-32 pb-24 px-6 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#0071e3]">Feedback</p>
            <h1 className="mt-2 text-[34px] sm:text-[40px] font-bold tracking-[-0.045em] leading-[1.02] text-[#1d1d1f] dark:text-white">
              Help shape PreFlight
            </h1>
            <p className="mt-3 text-[15px] text-[#6e6e73] dark:text-[#a1a1a6] max-w-lg">
              Suggest a feature, report an issue, and vote on what matters most to you.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-medium px-4 h-10 rounded-full bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] hover:bg-[#424245] dark:hover:bg-[#f5f5f7] transition-colors duration-150 shrink-0"
          >
            <Plus size={15} />
            New post
          </button>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="sm:hidden w-full mb-6 inline-flex items-center justify-center gap-1.5 text-[13px] font-medium h-10 rounded-full bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f]"
        >
          <Plus size={15} />
          New post
        </button>

        {showForm && (
          <div className="mb-8 p-5 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-[#f5f5f7] dark:bg-white/[0.03]">
            <NewPostForm
              onCancel={() => setShowForm(false)}
              onCreated={(id) => {
                setShowForm(false)
                navigate(`/feedback/${id}`)
              }}
            />
          </div>
        )}

        <div className="mb-6">
          <SearchFilterBar search={search} onSearchChange={setSearch} sort={sort} onSortChange={setSort} />
        </div>

        <div className="flex flex-col gap-3">
          {loading ? (
            <p className="text-center text-[13px] text-[#86868b] py-12">Loading...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-[13px] text-[#86868b] py-12">
              {search ? 'No feedback matches your search.' : 'No feedback yet — be the first to post.'}
            </p>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} voted={votedIds.has(post.id)} onVoteChange={handleVoteChange} />
            ))
          )}
        </div>
      </div>
    </main>
  )
}
