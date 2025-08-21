"use client";
import { useState } from "react";
import { IconAt, IconFingerprint, IconUser } from "@tabler/icons-react";
import { validateEmail, validatePassword } from "@/utils/validation";
import { signup } from "@/api/auth"; // ✅ only signup is needed here

export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validations
    const emailError = validateEmail(email);
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

      // ✅ use signup service
      const res = await signup({
        email,
        password,
      });

      setSuccess("✅ Account created successfully! Please login.");
      console.log("Signup success:", res);

      // clear inputs
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      const msg =
        err.response?.data?.detail ||
        err.message ||
        "Signup failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 transition-colors duration-30">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side */}
        <div className="flex items-center justify-center px-4 py-7 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <a href="#" className="text-3xl font-bold text-gray-900 mb-6 block first-letter:text-sky-500 dark:text-white">
              Essentialng
            </a>
            <h2 className="text-2xl font-bold leading-tight text-black dark:text-white">Create an account</h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?{" "}
              <a className="font-medium text-sky-600 transition-all duration-200 hover:text-sky-700 hover:underline"
                 href="./login">
                Login
              </a>
            </p>

            {/* Error / Success */}
            {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
            {success && <p className="mt-3 text-sm text-green-500">{success}</p>}

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="text-base font-medium text-gray-900 dark:text-white"> Full Name </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <IconUser className="w-5 h-5 text-gray-500 mr-2" />
                    </div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="block w-full py-4 ps-10 pe-4 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 focus:outline-none focus:border-sky-600 focus:bg-white dark:focus:bg-gray-900 caret-sky-600"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-base font-medium text-gray-900 dark:text-white"> Business Email </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <IconAt className="w-5 h-5 text-gray-500 mr-2" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your business email"
                      required
                      className="block w-full py-4 ps-10 pe-4 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 focus:outline-none focus:border-sky-600 focus:bg-white dark:focus:bg-gray-900 caret-sky-600"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-base font-medium text-gray-900 dark:text-white"> Password </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <IconFingerprint className="w-5 h-5 text-gray-500 mr-2" /> 
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      required
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
  {loading ? (
    <span className="flex items-center">
      <svg
        className="animate-spin h-5 w-5 mr-2 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      Signing in...
    </span>
  ) : (
    "Sign In"
  )}
</button>

                </div>
              </div>
            </form>

            {/* Google Signup */}
            <div className="mt-3 space-y-3">
              <button
                type="button"
                className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100"
              >
                <div className="absolute inset-y-0 start-0 p-4">
                  <i className="ti ti-brand-google text-rose-500 text-2xl"></i>
                </div>
                Sign Up with Google
              </button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-cover bg-center sm:px-6 lg:h-screen lg:px-8 bg-[url('/images/bg.png')]">
          <div className="absolute inset-0 bg-gradient-to-t from-sky-900 to-transparent"></div>
          <div className="relative">
            <div className="w-full max-w-xl xl:max-w-xl xl:pe-24">
              <h3 className="text-4xl font-bold text-white">Join 12k+ web professionals & build faster.</h3>
              <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                {["Commercial License", "Unlimited Exports", "120+ Coded Blocks", "Design Files Included"].map(
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

