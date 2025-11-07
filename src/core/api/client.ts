import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Base API client menggunakan RTK Query
 * Centralized configuration untuk semua API endpoints
 */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  tagTypes: ['Todos'],
  endpoints: () => ({}),
});
