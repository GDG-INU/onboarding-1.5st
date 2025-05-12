import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from './auth/authSlice';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const token = api.getState().auth.accessToken;
  console.log('📦 현재 accessToken:', token); // ✅ 이거 추가
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshToken = api.getState().auth.refreshToken;
        if (!refreshToken) {
          api.dispatch(logout());
          return result;
        }

        const refreshResult = await baseQuery(
          {
            url: '/auth/refreshtoken',
            method: 'POST',
            body: { refreshToken },
          },
          api,
          extraOptions
        );

        if (
          refreshResult?.data?.accessToken &&
          refreshResult?.data?.refreshToken
        ) {
          api.dispatch(
            setCredentials({
              accessToken: refreshResult.data.accessToken,
              refreshToken: refreshResult.data.refreshToken,
              nickname: api.getState().auth.nickname,
              email: api.getState().auth.email,
            })
          );
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
      // 토큰 재시도 후에도 여전히 401이면 logout
      if (result?.error?.status === 401) {
        api.dispatch(logout());
      }
    }
  }

  return result;
};

export const protectedApi = createApi({
  reducerPath: 'protectedApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // 관리자 페이지 접근 권한 확인
    getAdmin: builder.query({
      query: () => '/admin',
    }),

    // 로그인 여부 확인 (accessToken 기반 유저 정보 요청)
    getIsLoggedIn: builder.query({
      query: () => '/',
    }),
  }),
});

export const { useGetAdminQuery, useGetIsLoggedInQuery } = protectedApi;
