// src/components/TopBar.jsx
import { Link } from 'react-router-dom';

function TopBar() {
  return (
    <header className="flex items-center justify-between fixed top-0 w-full z-50 px-6 py-4 border-b bg-white">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="Logo" className="w-6 h-6" />
        <span className="font-bold text-lg">Wave Blog</span>
      </div>
      <nav className="space-x-6 text-sm font-medium">
        <Link to="/" className="hover:underline">
          Main
        </Link>
        <Link to="/about" className="hover:underline">
          About
        </Link>
        <a href="#" className="hover:underline">
          User Home
        </a>
      </nav>
    </header>
  );
}

export default TopBar;
