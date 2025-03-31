// src/pages/Admin.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkAdminStatus } from '../store/authSlice';
import Footer from '../components/Footer';

function Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, isAdmin, error } = useSelector((state) => state.auth);
  const [adminMessage, setAdminMessage] = useState('');

  useEffect(() => {
    // 로그인 상태가 아니면 로그인 페이지로 이동
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // 관리자 상태 확인
    dispatch(checkAdminStatus())
      .unwrap()
      .then((result) => {
        setAdminMessage(result.message);
      })
      .catch((error) => {
        // 비관리자인 경우 메인 페이지로 리다이렉트
        navigate('/');
      });
  }, [isAuthenticated, dispatch, navigate]);

  return (
    <div className="w-full mx-auto flex flex-col min-h-screen">
      <main className="w-full flex-1 px-4 py-12 bg-white">
        <div className="w-full max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
          
          {loading && <p className="text-gray-600">로딩 중...</p>}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {isAdmin && !loading && (
            <div className="bg-white shadow-md rounded p-6">
              <h2 className="text-xl font-semibold mb-4">관리자 콘트롤</h2>
              <p className="text-gray-700 mb-4">
                {adminMessage || 'Admin_Controll'}
              </p>
              
              <div className="space-y-4 mt-8">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium text-lg mb-2">사용자 관리</h3>
                  <button className="px-4 py-2 bg-black text-white rounded">
                    사용자 목록 보기
                  </button>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium text-lg mb-2">게시물 관리</h3>
                  <button className="px-4 py-2 bg-black text-white rounded">
                    모든 게시물 보기
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Admin;
