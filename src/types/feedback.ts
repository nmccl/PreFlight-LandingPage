export type Post = {
  id: string
  title: string
  details: string
  votes_count: number
  comments_count: number
  created_at: string
  updated_at: string
}

export type Comment = {
  id: string
  post_id: string
  body: string
  created_at: string
  updated_at: string
}

export type SortOption = 'top' | 'new' | 'discussed'
