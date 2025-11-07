'use client';

import { useState } from 'react';
import { useCreateTodoMutation } from '@/features/todos/api/todos.api';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

export default function TodoForm() {
  const [title, setTitle] = useState('');
  const [createTodo, { isLoading, isSuccess, isError }] = useCreateTodoMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createTodo({
        title: title.trim(),
        completed: false,
        userId: 1,
      }).unwrap();
      setTitle('');
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <Input
            id="todo-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new todo..."
            disabled={isLoading}
            aria-label="New todo title"
            aria-invalid={isError}
            aria-describedby={isError ? 'error-message' : isSuccess ? 'success-message' : undefined}
          />
        </div>
        <Button type="submit" disabled={isLoading || !title.trim()} aria-label="Add new todo">
          {isLoading ? 'Adding...' : 'Add Todo'}
        </Button>
      </div>

      {isSuccess && (
        <p
          id="success-message"
          className="text-sm text-green-600 dark:text-green-400"
          role="status"
          aria-live="polite"
        >
          Todo added successfully!
        </p>
      )}
      {isError && (
        <p
          id="error-message"
          className="text-sm text-red-600 dark:text-red-400"
          role="alert"
          aria-live="assertive"
        >
          Failed to add todo. Please try again.
        </p>
      )}
    </form>
  );
}
