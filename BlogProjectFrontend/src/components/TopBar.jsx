// src/components/TopBar.jsx
function TopBar() {
  return (
    <header className="flex items-center justify-between fixed top-0 w-full z-50 px-6 py-4 border-b bg-white">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="Logo" className="w-6 h-6" />
        <span className="font-bold text-lg">Wave Blog</span>
      </div>
      <nav className="space-x-6 text-sm font-medium">
        <a href="#" className="hover:underline">
          Home
        </a>
        <a href="#" className="hover:underline">
          About
        </a>
        <a href="#" className="hover:underline">
          Contact
        </a>
      </nav>
    </header>
  );
}

export default TopBar;
