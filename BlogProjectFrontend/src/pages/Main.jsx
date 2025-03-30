import React from 'react';
import { Link } from 'react-router-dom';
import FooterTwo from '../components/FooterTwo';

const MainPage = () => {
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
          <Link
            to="/login"
            className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Login
          </Link>
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
