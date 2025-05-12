import { NavBar } from './Navbar';
import { NavLink } from 'react-router-dom';

export default function HeaderMember() {
  return (
    <div className="flex justify-between px-3 mt-2">
      <div className="w-1/5 flex justify-center p-3 gap-3 items-center">
        <NavLink to="/" end>
          <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
        </NavLink>
        <NavLink to="/" end className="flex-1 text-left">
          Wave Blog
        </NavLink>
      </div>
      <NavBar />
    </div>
  );
}
