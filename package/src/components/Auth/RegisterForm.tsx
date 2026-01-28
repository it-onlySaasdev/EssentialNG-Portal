"use client";
import { useState } from "react";
import { IconAt, IconFingerprint, IconUser } from "@tabler/icons-react";
import { validateEmail, validatePassword } from "@/utils/validation";
import { signup } from "@/api/auth"; 

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

    // Check if fullName is provided
    if (!fullName.trim()) {
      setError("Full name is required");
      return;
    }

    try {
      setLoading(true);

      // Send data to backend
      const res = await signup({
        username: fullName.trim(),  // Backend expects 'username' field
        email: email.trim(),
        password: password,
      });

      setSuccess("Account created successfully! Please login.");
      console.log("Signup success:", res);

      // Clear inputs after 2 seconds
      setTimeout(() => {
        setFullName("");
        setEmail("");
        setPassword("");
        // Optional: Redirect to login page after successful registration
        // window.location.href = "/login";
      }, 2000);

    } catch (err: any) {
      console.error("Signup error:", err);
      
      // Handle different types of errors
      if (err.response) {
        // Backend returned an error
        const errorMsg = err.response.data?.detail || 
                        err.response.data?.message || 
                        "Registration failed. Please try again.";
        setError(errorMsg);
      } else if (err.request) {
        // No response received (network error)
        setError("Network error. Please check if the backend server is running.");
      } else {
        // Other errors
        setError(err.message || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Registration Form */}
        <div className="flex items-center justify-center px-4 py-7 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <a href="/" className="text-3xl font-bold text-gray-900 mb-6 block first-letter:text-sky-500 dark:text-white hover:opacity-80 transition-opacity">
              EssentialNG
            </a>
            
            <h2 className="text-2xl font-bold leading-tight text-black dark:text-white">
              Create an account
            </h2>
            
            <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <a 
                className="font-medium text-sky-600 hover:text-sky-700 hover:underline transition-all duration-200"
                href="/login"
              >
                Login
              </a>
            </p>

            {/* Error / Success Messages */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                {/* Full Name Field */}
                <div>
                  <label className="text-base font-medium text-gray-900 dark:text-white mb-2 block">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IconUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                      disabled={loading}
                      className="block w-full pl-10 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="text-base font-medium text-gray-900 dark:text-white mb-2 block">
                    Business Email <span className="text-red-500">*</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                      (Only Gmail, Hotmail, Yahoo, or Outlook)
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IconAt className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@gmail.com"
                      required
                      disabled={loading}
                      className="block w-full pl-10 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="text-base font-medium text-gray-900 dark:text-white mb-2 block">
                    Password <span className="text-red-500">*</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                      (Min 8 chars with uppercase, lowercase, number & special char)
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IconFingerprint className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      required
                      disabled={loading}
                      className="block w-full pl-10 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-sky-600 to-fuchsia-600 hover:from-sky-700 hover:to-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating account...
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  By signing up, you agree to our{" "}
                  <a href="/terms" className="text-sky-600 hover:underline">Terms of Service</a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-sky-600 hover:underline">Privacy Policy</a>
                </p>
              </div>
            </form>

            {/* Divider */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google Signup */}
              <div className="mt-6">
                <button
                  type="button"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"/>
                    <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987z"/>
                    <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21z"/>
                    <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.96 11.96 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067z"/>
                  </svg>
                  Sign up with Google
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Hero Section */}
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-cover bg-center sm:px-6 lg:h-screen lg:px-8 bg-[url('/images/bg.png')]">
          <div className="absolute inset-0 bg-gradient-to-t from-sky-900/90 via-sky-900/50 to-transparent"></div>
          
          <div className="relative z-10 w-full max-w-xl xl:max-w-2xl xl:pe-24">
            <h3 className="text-4xl font-bold text-white mb-8">
              Join EssentialNG Portal
            </h3>
            
            {/* <ul className="space-y-4">
              {[
                { icon: "🔒", text: "Secure Authentication & Data Protection" },
                { icon: "💼", text: "Business-focused Platform for Professionals" },
                { icon: "⚡", text: "Fast & Reliable Access Across Devices" },
                { icon: "🎨", text: "Modern UI/UX Design Included" },
                { icon: "🌍", text: "Multi-service Platform for Nigerian Market" },
                { icon: "📈", text: "Grow Your Business with Digital Solutions" }
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-2xl mt-1">{item.icon}</span>
                  <span className="text-lg font-medium text-white/90">{item.text}</span>
                </li>
              ))}
            </ul> */}

            <div className="mt-10 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <h4 className="text-xl font-bold text-white mb-3">Why Join EssentialNG?</h4>
              <p className="text-white/80">
                EssentialNG Portal connects Nigerian businesses with verified IT consultants, 
                digital service providers, and booking services. Join our growing community 
                of professionals and clients building the future of Nigeria's digital economy.
              </p>
            </div>

            <div className="mt-8 flex items-center space-x-4 text-white/70">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>500+ Registered Businesses</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}