'use client';

import { Search, X } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';

interface TodoFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'default' | 'completed-first' | 'pending-first';
  onSortChange: (sort: 'default' | 'completed-first' | 'pending-first') => void;
}

export default function TodoFilters({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}: TodoFiltersProps) {
  return (
    <div className="mb-6 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
        </div>
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search todos..."
          className="pl-10 pr-10"
          aria-label="Search todos"
          role="searchbox"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition-colors hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:text-gray-300 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-800"
            aria-label="Clear search"
            type="button"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Sort */}
      <div>
        <label
          htmlFor="sort-select"
          className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Sort by
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) =>
            onSortChange(e.target.value as 'default' | 'completed-first' | 'pending-first')
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-400"
          aria-label="Sort todos"
        >
          <option value="default">Default Order</option>
          <option value="completed-first">Completed First</option>
          <option value="pending-first">Pending First</option>
        </select>
      </div>
    </div>
  );
}
