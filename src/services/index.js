import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const gameApis = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/api/'}),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => `users`
        }),
        createGame: builder.mutation({
            query: () => ({
                url: 'game',
                method: 'POST',
            })
        })
    })
    // query: (id) => ({ url: `post/${id}` }),
});

export const { useGetUsersQuery, useCreateGameMutation } = gameApis;
