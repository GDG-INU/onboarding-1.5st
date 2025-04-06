import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axiosConfig';

// 회원가입 비동기 액션 생성
export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/signup/join', userData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue('회원가입 중 오류가 발생했습니다.');
    }
  }
);

// 로그인 비동기 액션 생성
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/login', userData);
      // 로그인 성공 시 토큰 저장
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue('로그인 중 오류가 발생했습니다.');
    }
  }
);

// 사용자 정보 조회 액션
export const getUserInfo = createAsyncThunk(
  'auth/getUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue('인증이 필요합니다.');
      }
      return rejectWithValue('사용자 정보를 가져오는 중 오류가 발생했습니다.');
    }
  }
);

// 관리자 상태 확인 액션
export const checkAdminStatus = createAsyncThunk(
  'auth/checkAdminStatus',
  async (_, { rejectWithValue }) => {
    try {
      // 관리자 페이지 접근 권한 확인
      const response = await api.get('/admin');
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue('관리자 권한이 없습니다.');
      }
      return rejectWithValue('관리자 상태 확인 중 오류가 발생했습니다.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: !!localStorage.getItem('accessToken'),
    isAdmin: false,
    role: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    logout: (state) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.role = null;
    },
    refreshTokenSuccess: (state, action) => {
      state.isAuthenticated = true;
      // 토큰이 갱신되었으므로 인증 상태 유지
    },
  },
  extraReducers: (builder) => {
    builder
      // 회원가입 리듀서
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 로그인 리듀서
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = {
          email: action.payload.email,
          nickname: action.payload.nickname,
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 사용자 정보 조회 리듀서
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          ...state.user,
          email: action.payload.email,
          role: action.payload.role,
        };
        state.role = action.payload.role;
        state.isAdmin = action.payload.role === 'ROLE_ADMIN';
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // 401 에러의 경우 로그아웃 처리
        if (action.payload === '인증이 필요합니다.') {
          state.isAuthenticated = false;
          state.user = null;
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      })
      // 관리자 상태 확인 리듀서
      .addCase(checkAdminStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAdminStatus.fulfilled, (state) => {
        state.loading = false;
        state.isAdmin = true;
      })
      .addCase(checkAdminStatus.rejected, (state, action) => {
        state.loading = false;
        state.isAdmin = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, logout, refreshTokenSuccess } = authSlice.actions;
export default authSlice.reducer;
