'use client';

import { useGetTodosStatsQuery } from '@/features/todos/api/todos.api';
import { StatCard } from '@/shared/components/stat-card';
import { ClipboardList, CheckCircle2, Clock } from 'lucide-react';

export default function TodoStats() {
  const { data: stats, isLoading } = useGetTodosStatsQuery();

  if (isLoading) {
    return (
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard
        title="Total Todos"
        value={stats?.total ?? 0}
        icon={ClipboardList}
        color="blue"
      />
      <StatCard
        title="Completed"
        value={stats?.completed ?? 0}
        icon={CheckCircle2}
        color="green"
      />
      <StatCard
        title="Pending"
        value={stats?.pending ?? 0}
        icon={Clock}
        color="yellow"
      />
    </div>
  );
}
