// src/components/Sidebar.jsx
import React from 'react';
import { FaHome, FaFilm, FaBook, FaMusic } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-70 bg-gray-100 py-8 px-4 hidden md:block">
      <nav className="space-y-6">
        <a
          href="#"
          className="flex items-center gap-3 text-gray-700 hover:text-black"
        >
          <FaHome />
          <span>Home</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 text-gray-700 hover:text-black"
        >
          <FaFilm />
          <span>Movies</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 text-gray-700 hover:text-black"
        >
          <FaBook />
          <span>Books</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 text-gray-700 hover:text-black"
        >
          <FaMusic />
          <span>Music</span>
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
