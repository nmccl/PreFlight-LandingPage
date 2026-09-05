import { Search } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { SortOption } from '../../types/feedback'

const sorts: { value: SortOption; label: string }[] = [
  { value: 'top', label: 'Top' },
  { value: 'new', label: 'New' },
  { value: 'discussed', label: 'Discussed' },
]

type SearchFilterBarProps = {
  search: string
  onSearchChange: (value: string) => void
  sort: SortOption
  onSortChange: (value: SortOption) => void
}

export default function SearchFilterBar({ search, onSearchChange, sort, onSortChange }: SearchFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="relative flex-1">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b]" />
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search feedback..."
          className="w-full h-10 pl-10 pr-4 rounded-full bg-[#f5f5f7] dark:bg-white/[0.06] text-[14px] text-[#1d1d1f] dark:text-white placeholder:text-[#86868b] outline-none focus:ring-2 focus:ring-[#0071e3]/40 transition-shadow duration-150"
        />
      </div>
      <div className="inline-flex p-1 rounded-full bg-[#f5f5f7] dark:bg-white/[0.06] shrink-0">
        {sorts.map((s) => (
          <button
            key={s.value}
            type="button"
            onClick={() => onSortChange(s.value)}
            className={cn(
              'px-3.5 h-8 rounded-full text-[12px] font-medium transition-colors duration-150',
              sort === s.value
                ? 'bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-white shadow-sm'
                : 'text-[#6e6e73] dark:text-[#a1a1a6] hover:text-[#1d1d1f] dark:hover:text-white'
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}
