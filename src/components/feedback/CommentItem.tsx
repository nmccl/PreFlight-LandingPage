import { useState } from 'react'
import toast from 'react-hot-toast'
import { updateComment, deleteComment } from '../../lib/feedbackApi'
import { getCommentToken, removeCommentToken } from '../../lib/ownership'
import type { Comment } from '../../types/feedback'

type CommentItemProps = {
  comment: Comment
  onChanged: () => void
}

export default function CommentItem({ comment, onChanged }: CommentItemProps) {
  const [editing, setEditing] = useState(false)
  const [body, setBody] = useState(comment.body)
  const editToken = getCommentToken(comment.id)

  const handleSave = async () => {
    if (!editToken) return
    try {
      const ok = await updateComment({ commentId: comment.id, body, editToken })
      if (ok) {
        setEditing(false)
        onChanged()
        toast.success('Reply updated.')
      } else {
        toast.error('Could not update this reply.')
      }
    } catch {
      toast.error('Could not update this reply.')
    }
  }

  const handleDelete = async () => {
    if (!editToken) return
    if (!window.confirm('Delete this reply?')) return
    try {
      const ok = await deleteComment({ commentId: comment.id, editToken })
      if (ok) {
        removeCommentToken(comment.id)
        onChanged()
        toast.success('Reply deleted.')
      } else {
        toast.error('Could not delete this reply.')
      }
    } catch {
      toast.error('Could not delete this reply.')
    }
  }

  return (
    <div className="p-4 rounded-xl bg-[#f5f5f7] dark:bg-white/[0.04]">
      {editing ? (
        <div className="flex flex-col gap-2">
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={3}
            maxLength={2000}
            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-white/[0.06] text-[13px] text-[#1d1d1f] dark:text-white outline-none focus:ring-2 focus:ring-[#0071e3]/40 resize-none"
          />
          <div className="flex items-center gap-3 justify-end text-[12px]">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white"
            >
              Cancel
            </button>
            <button type="button" onClick={handleSave} className="text-[#0071e3] font-medium">
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <p className="text-[13px] leading-[1.5] text-[#1d1d1f] dark:text-[#f5f5f7] whitespace-pre-wrap">
              {comment.body}
            </p>
            {editToken && (
              <div className="flex items-center gap-2.5 shrink-0 text-[11px]">
                <button
                  type="button"
                  onClick={() => setEditing(true)}
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
          <p className="mt-2 text-[11px] text-[#86868b]">
            {new Date(comment.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </p>
        </>
      )}
    </div>
  )
}
