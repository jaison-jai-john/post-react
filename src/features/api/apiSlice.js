import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://json-server-vercel-tutorial.vercel.app/',
  }),
  tagTypes: ['Post', 'User'],
  endpoints: (builder) => ({}),
});

export default apiSlice;
