import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const gameApis = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/api'}),
    endpoints: (builder) => ({
        createGame: builder.mutation({
            query: () => ({
                url: '/game',
                method: 'POST',
            })
        }),
        getGame: builder.query({
            query: (id) => `/game/${id}`
        })
    })
    // query: (id) => ({ url: `post/${id}` }),
});

export const { useGetGameQuery, useCreateGameMutation } = gameApis;
