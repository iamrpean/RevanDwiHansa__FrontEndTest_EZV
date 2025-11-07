export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodosResponse {
  data: Todo[];
  total: number;
}

export interface CreateTodoDto {
  title: string;
  completed: boolean;
  userId: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}
