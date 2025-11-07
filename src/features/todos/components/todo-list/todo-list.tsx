'use client';

import { useState, useMemo } from 'react';
import { useGetAllTodosQuery } from '@/features/todos/api/todos.api';
import { TodoItem } from './todo-item';
import Pagination from '@/shared/components/pagination';
import TodoFilters from '@/features/todos/components/todo-filters/todo-filters';

const ITEMS_PER_PAGE = 10;

export default function TodoList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'completed-first' | 'pending-first'>('default');

  // Fetch ALL todos for proper sorting and searching
  const { data: allTodos, isLoading, isError, isFetching } = useGetAllTodosQuery();

  // Filter, sort, and paginate on client side
  const { paginatedTodos, totalPages } = useMemo(() => {
    if (!allTodos) return { paginatedTodos: [], totalPages: 0 };

    let result = [...allTodos];

    // 1. Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((todo) => todo.title.toLowerCase().includes(query));
    }

    // 2. Apply sorting (BEFORE pagination)
    if (sortBy === 'completed-first') {
      result.sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? -1 : 1;
      });
    } else if (sortBy === 'pending-first') {
      result.sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
      });
    }

    // 3. Calculate pagination
    const totalPages = Math.ceil(result.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedTodos = result.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return { paginatedTodos, totalPages };
  }, [allTodos, searchQuery, sortBy, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleSortChange = (sort: 'default' | 'completed-first' | 'pending-first') => {
    setSortBy(sort);
    setCurrentPage(1); // Reset to first page when sorting
  };

  if (isLoading) {
    return (
      <div className="space-y-3" role="status" aria-label="Loading todos">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
          <div
            key={index}
            className="h-16 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"
            aria-hidden="true"
          />
        ))}
        <span className="sr-only">Loading todos...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-12 text-center" role="alert">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
          <svg
            className="h-8 w-8 text-red-600 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Failed to load todos
        </h3>
        <p className="text-gray-600 dark:text-gray-400">Please check your connection and try again.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {isFetching && (
        <div
          className="absolute left-0 right-0 top-0 h-1 animate-pulse rounded-full bg-blue-500 dark:bg-blue-400"
          role="progressbar"
          aria-label="Loading"
        />
      )}

      <TodoFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />

      {paginatedTodos.length === 0 ? (
        <div className="py-12 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <svg
              className="h-8 w-8 text-gray-400 dark:text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            No todos found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery ? 'Try adjusting your search query.' : 'Start by adding a new todo above.'}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-2" role="list" aria-label="Todo items">
            {paginatedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
