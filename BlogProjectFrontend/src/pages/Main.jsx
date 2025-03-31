import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../store/authSlice';
import FooterTwo from '../components/FooterTwo';

const MainPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, role } = useSelector((state) => state.auth);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    // 로그인된 상태인 경우 사용자 정보 가져오기
    if (isAuthenticated) {
      dispatch(getUserInfo());
    }
  }, [isAuthenticated, dispatch]);
  
  return (
    <div className="w-full flex flex-col min-h-screen">
      <section className="w-full h-full flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-white">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to our World of Creativity
          </h1>
          <p className="text-gray-600 mb-6">
            당신의 이야기가 머무는 공간, 지금 바로 시작하세요.
          </p>
          
          {isAuthenticated ? (
            <div className="space-y-4">
              {user && (
                <div className="p-4 border rounded-md bg-gray-50">
                  <h3 className="font-semibold">사용자 정보</h3>
                  <p className="text-sm mt-2">
                    <span className="font-medium">이메일:</span> {user.email}
                  </p>
                  {role && (
                    <p className="text-sm mt-1">
                      <span className="font-medium">권한:</span> {role}
                      {role === 'ROLE_ADMIN' && (
                        <span className="ml-2 text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                          관리자
                        </span>
                      )}
                    </p>
                  )}
                  <p className="text-sm mt-1">
                    <span className="font-medium">상태:</span> {user?.message || "Main Controller"}
                  </p>
                </div>
              )}
              <div className="flex space-x-4">
                <Link
                  to="/write"
                  className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
                >
                  글 작성하기
                </Link>
                {role === 'ROLE_ADMIN' && (
                  <Link
                    to="/admin"
                    className="inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                  >
                    관리자 페이지
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
            >
              Login
            </Link>
          )}
        </div>
        <div className="w-full md:w-1/2 mb-10 md:mb-0">
          <img
            src="/Dolphin.png"
            alt="BackgroundImage"
            className="rounded-4xl"
          />
        </div>
      </section>

      <FooterTwo />
    </div>
  );
};

export default MainPage;
