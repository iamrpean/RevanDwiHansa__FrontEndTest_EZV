import { baseApi } from '@/core/api/client';
import type { Todo, CreateTodoDto, TodosResponse, PaginationParams } from '../types/todo.types';

interface TodosStats {
  total: number;
  completed: number;
  pending: number;
}

export const todosApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTodos: build.query<Todo[], void>({
      query: () => '/todos',
      providesTags: [{ type: 'Todos', id: 'ALL' }],
    }),

    getTodosStats: build.query<TodosStats, void>({
      query: () => '/todos',
      transformResponse: (response: Todo[]) => {
        const completed = response.filter((todo) => todo.completed).length;
        return {
          total: response.length,
          completed,
          pending: response.length - completed,
        };
      },
      providesTags: [{ type: 'Todos', id: 'STATS' }],
    }),

    getTodos: build.query<TodosResponse, PaginationParams>({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/todos',
        params: {
          _start: (page - 1) * limit,
          _limit: limit,
        },
      }),
      transformResponse: (response: Todo[]) => ({
        data: response,
        total: 200, // JSONPlaceholder has 200 todos
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Todos' as const, id })),
              { type: 'Todos', id: 'LIST' },
            ]
          : [{ type: 'Todos', id: 'LIST' }],
    }),

    createTodo: build.mutation<Todo, CreateTodoDto>({
      query: (body) => ({
        url: '/todos',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'Todos', id: 'LIST' },
        { type: 'Todos', id: 'STATS' },
      ],
      // Optimistic update untuk page 1
      async onQueryStarted(newTodo, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todosApi.util.updateQueryData('getTodos', { page: 1, limit: 10 }, (draft) => {
            const tempTodo: Todo = {
              id: Date.now(),
              title: newTodo.title,
              completed: newTodo.completed,
              userId: newTodo.userId,
            };
            draft.data.unshift(tempTodo);
            if (draft.data.length > 10) {
              draft.data.pop();
            }
          })
        );

        try {
          const { data: createdTodo } = await queryFulfilled;
          dispatch(
            todosApi.util.updateQueryData('getTodos', { page: 1, limit: 10 }, (draft) => {
              const index = draft.data.findIndex((todo) => todo.id === patchResult.patches[0]?.value.data[0]?.id);
              if (index !== -1) {
                draft.data[index] = createdTodo;
              }
            })
          );
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetAllTodosQuery,
  useGetTodosStatsQuery,
  useCreateTodoMutation,
} = todosApi;
