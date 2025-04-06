import axios from 'axios';
import store from '../store/store';
import { logout, refreshTokenSuccess } from '../store/authSlice';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080', // 기본 API URL을 설정합니다
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 추가 - 모든 요청에 Authorization 헤더를 추가합니다
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가 - 토큰 만료 시 처리
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // 401 Unauthorized 에러이고 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // 리프레시 토큰으로 새 액세스 토큰 요청
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          store.dispatch(logout());
          return Promise.reject(error);
        }
        
        // 리프레시 토큰 API 호출
        const response = await axios.post('/auth/refreshtoken', { 
          refreshToken 
        }, {
          baseURL: 'http://localhost:8080',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data.accessToken) {
          // 새로운 토큰 저장
          localStorage.setItem('accessToken', response.data.accessToken);
          if (response.data.refreshToken) {
            localStorage.setItem('refreshToken', response.data.refreshToken);
          }
          
          // Redux 상태 업데이트 (필요한 경우)
          store.dispatch(refreshTokenSuccess({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken
          }));
          
          // 새 토큰으로 원래 요청 재시도
          originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // 리프레쉬 토큰 에러 처리
        console.error('Refresh token error:', refreshError.response?.data?.error || refreshError.message);
        
        // 에러 메시지에 따른 처리
        if (refreshError.response?.data?.error === 'Refresh token is required' || 
            refreshError.response?.data?.error === 'Refresh token not found in database!') {
          // 로그아웃 처리
          store.dispatch(logout());
        }
        
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
