import whaleImage from '../assets/whale.png';
import { useEffect } from 'react';
import { useGetIsLoggedInQuery } from '../features/protectedApi'; // ← 정확한 경로 확인
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function MainPage() {
  const { data, error, isLoading, isSuccess } = useGetIsLoggedInQuery();

  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleClick = () => {
    if (accessToken) {
      navigate('/post/create');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    if (isLoading) {
      console.log('🔄 isLoggedIn: 요청 중...');
    } else if (isSuccess) {
      console.log('✅ isLoggedIn 응답 데이터:', data);
    } else if (error) {
      console.error('❌ isLoggedIn 에러:', error);
    }
  }, [data, error, isLoading, isSuccess]);

  return (
    <main className="flex justify-between items-center px-20 py-24">
      {/* Text content */}
      <div className="w-1/2">
        <h1 className="text-4xl font-bold leading-tight mb-6">
          Welcome to our World of <br /> Creativity
        </h1>
        <p className="text-gray-600 mb-8">
          당신의 이야기가 머무는 공간, 지금 바로 시작하세요.
        </p>
        <button
          className="bg-black text-white px-6 py-2 rounded "
          onClick={handleClick}
        >
          글 작성하기
        </button>
      </div>

      {/* Image placeholder */}
      <img src={whaleImage} alt="whale" className="w-1/2 h-64 rounded-3xl" />
    </main>
  );
}
