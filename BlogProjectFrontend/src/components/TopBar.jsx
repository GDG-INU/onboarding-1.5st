// src/components/TopBar.jsx
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

function TopBar() {
  const { isAuthenticated, user, isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="flex items-center justify-between fixed top-0 w-full z-50 px-6 py-4 border-b bg-white">
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.svg" alt="Logo" className="w-6 h-6" />
        <span className="font-bold text-lg text-black">Wave Blog</span>
      </Link>
      <nav className="space-x-6 text-sm font-medium">
        <Link to="/" className="hover:underline">
          Main
        </Link>
        <Link to="/about" className="hover:underline">
          About
        </Link>
        {isAuthenticated ? (
          <>
            <Link to="/userhome" className="hover:underline">
              My Page
            </Link>
            {isAdmin && (
              <Link to="/admin" className="hover:underline text-red-600">
                관리자
              </Link>
            )}
            <button 
              onClick={handleLogout}
              className="hover:underline"
            >
              로그아웃
            </button>
            <span className="text-gray-500">
              {user?.nickname || '사용자'}님
            </span>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              로그인
            </Link>
            <Link to="/signup" className="hover:underline">
              회원가입
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default TopBar;
