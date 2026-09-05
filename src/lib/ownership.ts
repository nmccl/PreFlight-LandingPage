const POSTS_KEY = 'preflight_post_tokens'
const COMMENTS_KEY = 'preflight_comment_tokens'

function readMap(key: string): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '{}')
  } catch {
    return {}
  }
}

function writeMap(key: string, map: Record<string, string>) {
  localStorage.setItem(key, JSON.stringify(map))
}

export function savePostToken(postId: string, token: string) {
  const map = readMap(POSTS_KEY)
  map[postId] = token
  writeMap(POSTS_KEY, map)
}

export function getPostToken(postId: string): string | undefined {
  return readMap(POSTS_KEY)[postId]
}

export function removePostToken(postId: string) {
  const map = readMap(POSTS_KEY)
  delete map[postId]
  writeMap(POSTS_KEY, map)
}

export function saveCommentToken(commentId: string, token: string) {
  const map = readMap(COMMENTS_KEY)
  map[commentId] = token
  writeMap(COMMENTS_KEY, map)
}

export function getCommentToken(commentId: string): string | undefined {
  return readMap(COMMENTS_KEY)[commentId]
}

export function removeCommentToken(commentId: string) {
  const map = readMap(COMMENTS_KEY)
  delete map[commentId]
  writeMap(COMMENTS_KEY, map)
}
