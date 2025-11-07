import { Check } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import type { Todo } from '@/features/todos/types/todo.types';

interface TodoItemProps {
  todo: Todo;
  onToggle?: (id: number) => void;
}

export function TodoItem({ todo, onToggle }: TodoItemProps) {
  const handleToggle = () => {
    onToggle?.(todo.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      className="group flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-gray-900/50"
      role="article"
      aria-label={`Todo: ${todo.title}`}
    >
      <div className="mt-1 flex-shrink-0">
        <button
          type="button"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-800',
            todo.completed
              ? 'border-green-500 bg-green-500 dark:border-green-600 dark:bg-green-600'
              : 'border-gray-300 bg-white hover:border-green-400 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-green-500'
          )}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
          aria-pressed={todo.completed}
          aria-describedby={`todo-title-${todo.id}`}
        >
          {todo.completed && <Check className="h-3 w-3 text-white" aria-hidden="true" />}
        </button>
      </div>

      <div className="min-w-0 flex-1">
        <p
          id={`todo-title-${todo.id}`}
          className={cn(
            'text-base leading-relaxed',
            todo.completed
              ? 'text-gray-500 line-through dark:text-gray-400'
              : 'text-gray-900 dark:text-gray-100'
          )}
        >
          {todo.title}
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          ID: {todo.id} • User: {todo.userId}
        </p>
      </div>

      <div
        className={cn(
          'flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-medium',
          todo.completed
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
        )}
        role="status"
        aria-label={`Status: ${todo.completed ? 'Completed' : 'Pending'}`}
      >
        {todo.completed ? 'Completed' : 'Pending'}
      </div>
    </div>
  );
}
