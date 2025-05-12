import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const publicApi = createApi({
  reducerPath: 'publicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    // 1. 로그인
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // 2. 회원가입
    signup: builder.mutation({
      query: (userInfo) => ({
        url: '/api/signup/join',
        method: 'POST',
        body: userInfo,
      }),
    }),

    // 3. 토큰 재발급 (refreshToken은 상태에서 보내는 가정)
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: '/auth/refreshtoken',
        method: 'POST',
        body: { refreshToken },
      }),
    })
  }),
});

// RTK Query 훅 자동 생성
export const {
  useLoginMutation,
  useSignupMutation,
  useRefreshTokenMutation,
} = publicApi;
