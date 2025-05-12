import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSignupMutation } from '../features/publicApi';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [signup, { isLoading, isSuccess, error }] = useSignupMutation();
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setPasswordError(''); // 에러 초기화

    try {
      const result = await signup({ email, password, nickname }).unwrap();
      console.log('회원가입 성공:', result);
      setTimeout(() => {
        navigate('/login');
      }, 1500); // 1.5초 후 이동
    } catch (err) {
      console.error('회원가입 실패:', err);
    }
  };

  return (
    <main className="flex flex-col items-center px-6 py-16">
      <h1 className="text-3xl font-bold mb-12">Sign Up</h1>

      <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nickname" className="block text-sm font-medium mb-1">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

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

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-1"
          >
            비밀번호 확인
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {passwordError && (
          <p className="text-red-600 text-sm">{passwordError}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {isLoading ? '가입 중...' : '가입하기'}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-red-600 text-sm">
          회원가입에 실패했습니다. 다시 시도해주세요.
        </p>
      )}

      {isSuccess && (
        <p className="mt-4 text-green-600 text-sm">
          회원가입이 완료되었습니다!
        </p>
      )}

      <div className="flex m-5 items-center justify-center gap-5">
        <p>이미 계정이 있으신가요?</p>
        <NavLink to="/login" end className=" flex-1 text-center underline">
          로그인
        </NavLink>
      </div>
    </main>
  );
}
