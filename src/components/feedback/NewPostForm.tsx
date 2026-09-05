import { useState } from 'react'
import toast from 'react-hot-toast'
import Turnstile from './Turnstile'
import { createPost } from '../../lib/feedbackApi'
import { savePostToken } from '../../lib/ownership'

type NewPostFormProps = {
  onCreated: (postId: string) => void
  onCancel: () => void
}

export default function NewPostForm({ onCreated, onCancel }: NewPostFormProps) {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [token, setToken] = useState('')
  const [resetKey, setResetKey] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (submitting) return

    if (title.trim().length < 3) {
      toast.error('Give your feedback a short title.')
      return
    }
    if (details.trim().length < 1) {
      toast.error('Add a few details.')
      return
    }
    if (!token) {
      toast.error('Please complete the verification.')
      return
    }

    setSubmitting(true)
    try {
      const result = await createPost({ title, details, turnstileToken: token, honeypot })
      savePostToken(result.id, result.edit_token)
      toast.success('Feedback posted.')
      onCreated(result.id)
    } catch (err) {
      console.error('create_post failed:', err)
      const message = err instanceof Error ? err.message : ''
      if (message.includes('rate_limited')) {
        toast.error('You are posting too quickly. Try again in a minute.')
      } else if (message.includes('turnstile_failed')) {
        toast.error('Verification failed. Please try again.')
      } else {
        toast.error('Something went wrong. Please try again.')
      }
      setToken('')
      setResetKey((k) => k + 1)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#86868b]">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={120}
          placeholder="A short, descriptive title"
          className="mt-1.5 w-full h-11 px-4 rounded-xl bg-[#f5f5f7] dark:bg-white/[0.06] text-[14px] text-[#1d1d1f] dark:text-white outline-none focus:ring-2 focus:ring-[#0071e3]/40 transition-shadow duration-150"
        />
      </div>

      <div>
        <label className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#86868b]">
          Details
        </label>
        <textarea
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          maxLength={4000}
          rows={5}
          placeholder="What would you like to see, or what went wrong?"
          className="mt-1.5 w-full px-4 py-3 rounded-xl bg-[#f5f5f7] dark:bg-white/[0.06] text-[14px] text-[#1d1d1f] dark:text-white outline-none focus:ring-2 focus:ring-[#0071e3]/40 transition-shadow duration-150 resize-none"
        />
      </div>

      <input
        type="text"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] w-px h-px opacity-0"
      />

      <Turnstile onVerify={setToken} onExpire={() => setToken('')} resetKey={resetKey} />

      <div className="flex items-center gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="text-[13px] font-medium px-4 h-9 rounded-full text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white transition-colors duration-150"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="text-[13px] font-medium px-5 h-9 rounded-full bg-[#0071e3] text-white hover:bg-[#0077ed] disabled:opacity-50 transition-colors duration-150"
        >
          {submitting ? 'Posting...' : 'Post feedback'}
        </button>
      </div>
    </form>
  )
}
