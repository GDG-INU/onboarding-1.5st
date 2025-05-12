import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  nickname: localStorage.getItem('nickname') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken, nickname } = action.payload;
      if (accessToken !== undefined) state.accessToken = accessToken;
      if (refreshToken !== undefined) state.refreshToken = refreshToken;
      if (nickname !== undefined) state.nickname = nickname;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.nickname = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
