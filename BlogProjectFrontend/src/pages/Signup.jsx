// src/pages/Signup.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp, clearError, clearSuccess } from '../store/authSlice';
import Footer from '../components/Footer';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: ''
  });
  
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (success) {
      dispatch(clearSuccess());
      navigate('/login');
    }
    return () => {
      dispatch(clearError());
    };
  }, [success, dispatch, navigate]);

  useEffect(() => {
    // Check if passwords match when either password or confirmPassword changes
    if (formData.password || formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setPasswordsMatch(false);
      } else {
        setPasswordsMatch(true);
      }
    }
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.nickname || !formData.password || !formData.confirmPassword) {
      setValidationError('모든 필드를 입력해주세요.');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setValidationError('비밀번호가 일치하지 않습니다.');
      return false;
    }
    
    // Add additional password strength validation if needed
    if (formData.password.length < 8) {
      setValidationError('비밀번호는 최소 8자 이상이어야 합니다.');
      return false;
    }
    
    setValidationError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setValidationError('');
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    // API 호출
    dispatch(signUp({
      email: formData.email,
      nickname: formData.nickname,
      password: formData.password
    }));
  };

  return (
    <div className="w-full mx-auto flex flex-col min-h-screen">
      <main className="w-full flex-1 px-4 py-12 flex flex-col items-center bg-white">
        <div className="w-full max-w-xl">
          <h1 className="text-3xl font-bold text-center mb-2">
            회원가입
          </h1>
          <p className="text-center text-gray-600 mb-10">
            계정을 생성하여 시작하세요
          </p>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          {validationError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {validationError}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-1"
              >
                이메일
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일을 입력하세요"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label
                htmlFor="nickname"
                className="block text-sm font-semibold mb-1"
              >
                닉네임
              </label>
              <input
                type="text"
                id="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="닉네임을 입력하세요"
                className="w-full border border-gray-300 px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-1"
              >
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold mb-1"
              >
                비밀번호 확인
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="비밀번호를 다시 입력하세요"
                className={`w-full border ${
                  formData.confirmPassword && !passwordsMatch 
                    ? 'border-red-500' 
                    : 'border-gray-300'
                } px-4 py-2 rounded-md mb-1 focus:outline-none focus:ring-2 focus:ring-black`}
              />
              {formData.confirmPassword && !passwordsMatch && (
                <p className="text-red-500 text-xs">비밀번호가 일치하지 않습니다.</p>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="px-6 py-2 border border-black rounded-md hover:bg-gray-100"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-black text-white rounded-md hover:opacity-90 disabled:opacity-50"
              >
                {loading ? '가입 중...' : '가입하기'}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Signup;
