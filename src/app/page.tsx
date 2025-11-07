import TodoForm from '@/features/todos/components/todo-form/todo-form';
import TodoList from '@/features/todos/components/todo-list/todo-list';
import TodoStats from '@/features/todos/components/todo-stats/todo-stats';
import ThemeToggle from '@/features/theme/components/theme-toggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 transition-colors dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
                My Todos
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your tasks efficiently with real-time updates
              </p>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Stats */}
        <TodoStats />

        {/* Add Todo Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Todo</CardTitle>
          </CardHeader>
          <CardContent>
            <TodoForm />
          </CardContent>
        </Card>

        {/* Todos List */}
        <Card>
          <CardHeader>
            <CardTitle>All Todos</CardTitle>
          </CardHeader>
          <CardContent>
            <TodoList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
