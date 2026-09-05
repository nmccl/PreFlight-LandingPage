import { useState } from 'react'
import toast from 'react-hot-toast'
import Turnstile from './Turnstile'
import { createComment } from '../../lib/feedbackApi'
import { saveCommentToken } from '../../lib/ownership'

type CommentFormProps = {
  postId: string
  onCreated: () => void
}

export default function CommentForm({ postId, onCreated }: CommentFormProps) {
  const [body, setBody] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [token, setToken] = useState('')
  const [resetKey, setResetKey] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (submitting) return

    if (body.trim().length < 1) {
      toast.error('Write a reply first.')
      return
    }
    if (!token) {
      toast.error('Please complete the verification.')
      return
    }

    setSubmitting(true)
    try {
      const result = await createComment({ postId, body, turnstileToken: token, honeypot })
      saveCommentToken(result.id, result.edit_token)
      setBody('')
      setToken('')
      setResetKey((k) => k + 1)
      onCreated()
    } catch (err) {
      const message = err instanceof Error ? err.message : ''
      if (message.includes('rate_limited')) {
        toast.error('You are replying too quickly. Try again shortly.')
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
    <form
      onSubmit={handleSubmit}
      className="p-5 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-white/[0.03] flex flex-col gap-3"
    >
      <textarea
        value={body}
        onChange={(event) => setBody(event.target.value)}
        maxLength={2000}
        rows={3}
        placeholder="Write a reply..."
        className="w-full px-4 py-3 rounded-xl bg-[#f5f5f7] dark:bg-white/[0.06] text-[14px] text-[#1d1d1f] dark:text-white outline-none focus:ring-2 focus:ring-[#0071e3]/40 transition-shadow duration-150 resize-none"
      />

      <input
        type="text"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] w-px h-px opacity-0"
      />

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Turnstile onVerify={setToken} onExpire={() => setToken('')} resetKey={resetKey} />
        <button
          type="submit"
          disabled={submitting}
          className="text-[13px] font-medium px-5 h-9 rounded-full bg-[#0071e3] text-white hover:bg-[#0077ed] disabled:opacity-50 transition-colors duration-150"
        >
          {submitting ? 'Posting...' : 'Reply'}
        </button>
      </div>
    </form>
  )
}
