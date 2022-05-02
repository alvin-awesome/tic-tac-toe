import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const gameApis = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    createGame: builder.mutation({
      query: () => ({
        url: '/game',
        method: 'POST',
      }),
    }),
    getGame: builder.query({
      query: (id) => `/game/${id}`,
      providesTags: (result, error, arg) => [{ type: 'Game', id: result.id }]
    }),
    addGameRecord: builder.mutation({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `/game/${id}/record`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Game', id: arg.id }]
    }),
  }),
  // query: (id) => ({ url: `post/${id}` }),
});

export const {
  useGetGameQuery,
  useCreateGameMutation,
  useAddGameRecordMutation,
} = gameApis;
