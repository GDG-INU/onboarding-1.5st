// src/pages/Signup.jsx
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Signup() {
  return (
    <div className="w-full  mx-auto flex flex-col min-h-screen">
      <main className="w-full flex-1 px-4 py-12 flex flex-col items-center bg-white">
        <div className="w-full max-w-xl">
          <h1 className="text-3xl font-bold text-center mb-2">
            Account Registration
          </h1>
          <p className="text-center text-gray-600 mb-10">
            Create your account to get started
          </p>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label
                htmlFor="nickname"
                className="block text-sm font-semibold mb-1"
              >
                Nickname
              </label>
              <input
                type="text"
                id="nickname"
                placeholder="Choose a nickname"
                className="w-full border border-gray-300 px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <p className="text-xs text-gray-500 mb-2">
                This will be displayed as your username
              </p>
              <button
                type="button"
                className="px-4 py-2 bg-black text-gray-600 text-sm rounded-md hover:opacity-90"
              >
                Username Check
              </button>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Choose a strong password"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold mb-1"
              >
                Re-enter Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Re-enter your password"
                className="w-full border border-gray-300 px-4 py-2 rounded-md mb-1 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <p className="text-xs text-gray-500">
                Please enter the same password as above
              </p>
            </div>

            <div className="flex justify-between mt-8">
              <Link
                to="/login"
                className="px-6 py-2 border border-black rounded-md hover:bg-gray-100"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-6 py-2 bg-black text-gray-600 rounded-md hover:opacity-90"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Signup;
