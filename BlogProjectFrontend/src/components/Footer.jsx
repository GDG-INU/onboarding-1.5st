// src/components/Footer.jsx
function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-20">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="logo" className="w-8 h-8" />
          <div>
            <p className="text-lg font-semibold">Welcome to our community!</p>
            <p className="text-sm text-gray-300">
              Join us and unlock a world of possibilities
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-6">
          © 2025 GCoC INU on boarding.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
