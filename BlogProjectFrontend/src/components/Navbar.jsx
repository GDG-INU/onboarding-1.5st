import { NavLink } from 'react-router-dom';
import { useGetIsLoggedInQuery } from '../features/protectedApi';
import { useSelector } from 'react-redux';

export function NavBar() {
  // Redux에서 accessToken 가져오기
  const accessToken = useSelector((state) => state.auth.accessToken);

  // accessToken이 있을 때만 요청 실행
  const { data, isLoading } = useGetIsLoggedInQuery(undefined, {
    skip: !accessToken,
    refetchOnMountOrArgChange: true,
  });
  const isLoggedIn = data?.email !== undefined;
  return (
    <nav className="right-0 flex justify-center items-center w-1/3 p-3 gap-3">
      <NavLink to="/" end className="flex-1 text-center">
        Main
      </NavLink>
      <NavLink to="/about" end className="flex-1 text-center">
        About
      </NavLink>
      {isLoading ? null : isLoggedIn ? (
        <p className="flex-1 text-center text-gray-800 font-medium">
          {data.email}
        </p>
      ) : (
        <NavLink to="/login" end className="flex-1 text-center">
          Log In
        </NavLink>
      )}
    </nav>
  );
}
