"use client";
import { useState } from "react";
import { IconAt, IconFingerprint } from "@tabler/icons-react";
import { validateEmail, validatePassword } from "@/utils/validation";
import { login } from "@/api/auth"; // use the auth helper

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 

    // Frontend validations
    const emailError = validateEmail(username);
    if (emailError) {
      setError(emailError);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      setLoading(true);

      // Use login helper
      const res = await login({ email: username, password });
      console.log("Login success:", res);

      // Example: store token in localStorage if FastAPI returns it
      if (res.access_token) {
        localStorage.setItem("token", res.access_token);
      }

      // Redirect after success
      window.location.href = "/dashboard";

    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="bg-white dark:bg-gray-900 transition-colors duration-30">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side */}
        <div className="flex items-center justify-center px-4 py-7 dark:bg-gray-900 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <a href="#" className="text-3xl font-bold text-gray-900 mb-6 block first-letter:text-sky-500 dark:text-white">
              Essentialng
            </a>
            <h2 className="text-2xl font-bold leading-tight text-black dark:text-white">Welcome Back</h2>
            <p className="mt-2 text-base text-gray-600">
              Don&apos;t have an account ?{" "}
              <a className="font-medium text-sky-600 transition-all duration-200 hover:text-sky-700 hover:underline"
                 href="./register">
                Sign up
              </a>
            </p>

            {/* Error Message */}
            {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                {/* Username */}
                <div>
                  <label className="text-base font-medium text-gray-900 dark:text-white"> Username </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <IconAt className="w-5 h-5 text-gray-500 mr-2" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter email to get started"
                      className="block w-full py-4 ps-10 pe-4 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 focus:outline-none focus:border-sky-600 focus:bg-white dark:focus:bg-gray-900 caret-sky-600"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center">
                    <label className="text-base font-medium text-gray-900"> Password </label>
                    <a className="text-sm font-medium text-sky-500 underline" href="/auth/forgot-password">
                      Forgot Password
                    </a>
                  </div>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <IconFingerprint className="w-5 h-5 text-gray-500 mr-2" /> 
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="block w-full py-4 ps-10 pe-4 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 focus:outline-none focus:border-sky-600 focus:bg-white dark:focus:bg-gray-900 caret-sky-600"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white rounded-md bg-gradient-to-r from-fuchsia-600 to-sky-600 hover:opacity-80 disabled:opacity-50"
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </button>
                </div>
              </div>
            </form>

            {/* Google Login */}
            <div className="mt-3 space-y-3">
              <button
                type="button"
                className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100"
              >
                <div className="absolute inset-y-0 start-0 p-4">
                  <i className="ti ti-brand-google text-rose-500 text-2xl"></i>
                </div>
                Sign In with Google
              </button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-cover bg-center sm:px-6 lg:h-screen lg:px-8 bg-[url('/images/bg.png')]">
          <div className="absolute inset-0 bg-gradient-to-t from-sky-900 to-transparent"></div>
          <div className="relative">
            <div className="w-full max-w-xl xl:max-w-xl xl:pe-24">
              <h3 className="text-4xl font-bold text-white">Connect with us...</h3>
              <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                {["Secure Authentication", "Business Email Only", "Fast & Reliable Access", "Design Included"].map(
                  (item, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <i className="ti ti-circle-check-filled text-2xl text-sky-500"></i>
                      <span className="text-lg font-medium text-white">{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
