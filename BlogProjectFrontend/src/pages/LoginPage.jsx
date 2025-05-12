import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLoginMutation } from '../features/publicApi';
import { useDispatch } from 'react-redux';
import { store } from '../app/store';
import { setCredentials } from '../features/auth/authSlice';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      const { accessToken, refreshToken, nickname } = response;
      dispatch(setCredentials({ accessToken, refreshToken, nickname }));

      // ✅ localStorage에 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('nickname', nickname);

      console.log('로그인 성공:', response);
      console.log('현재 store 상태:', store.getState());
      navigate('/');
    } catch (err) {
      console.error('로그인 실패:', err);
      if (err?.status === 401) {
        setLoginError(
          err.data?.error || '이메일 또는 비밀번호가 올바르지 않습니다.'
        );
      } else {
        setLoginError('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <main className="flex flex-col items-center px-6 py-16">
      <h1 className="text-3xl font-bold mb-12">Login</h1>

      <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            이메일
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {loginError && <p className="text-red-600 text-sm">{loginError}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </button>
      </form>
      <div className="flex m-5 items-center justify-center gap-5">
        <p>계정이 없으신가요?</p>
        <NavLink to="/signup" end className=" flex-1 text-center underline">
          회원가입
        </NavLink>
      </div>
    </main>
  );
}
