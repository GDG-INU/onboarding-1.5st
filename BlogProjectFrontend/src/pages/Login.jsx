// src/pages/Login.jsx
import Footer from '../components/Footer';

function Login() {
  return (
    <div className="w-full mx-auto flex flex-col min-h-screen">
      <main className="w-full flex-1 px-4 py-12 bg-white">
        <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Title section (left) */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl font-bold mb-4">Login</h1>
          </div>

          {/* Form section (right) */}
          <div className="w-full lg:w-1/2 max-w-md">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <p className="text-xs text-gray-500 mt-1">
                  We'll never share your email with anyone else.
                </p>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-gray-600 py-2 rounded-md hover:opacity-90 transition duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;
