export default function RegisterPage() {
  return (
    <section className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left side - form */}
        <div className="flex items-center justify-center px-4 py-7 bg-white dark:bg-gray-900 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <a
              href="#"
              className="text-3xl font-bold text-gray-900 dark:text-white mb-6 block first-letter:text-sky-500"
            >
              Essentialng
            </a>
            <h2 className="text-2xl font-bold leading-tight text-black dark:text-white">
              Sign up
            </h2>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <a
                className="font-medium text-sky-600 transition-all duration-200 hover:text-sky-700 dark:hover:text-sky-400 hover:underline"
                href="/auth/login"
              >
                Sign in
              </a>
            </p>

            <form className="mt-8">
              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="text-base font-medium text-gray-900 dark:text-gray-100">
                    First & Last name
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600 dark:focus-within:text-gray-300">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <i className="ti ti-user text-xl"></i>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="block w-full py-4 ps-10 pe-4 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 focus:outline-none focus:border-sky-600 focus:bg-white dark:focus:bg-gray-900 caret-sky-600"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-base font-medium text-gray-900 dark:text-gray-100">
                    Email address
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600 dark:focus-within:text-gray-300">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <i className="ti ti-at text-xl"></i>
                    </div>
                    <input
                      type="email"
                      placeholder="Enter email to get started"
                      className="block w-full py-4 ps-10 pe-4 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 focus:outline-none focus:border-sky-600 focus:bg-white dark:focus:bg-gray-900 caret-sky-600"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-base font-medium text-gray-900 dark:text-gray-100">
                    Password
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600 dark:focus-within:text-gray-300">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <i className="ti ti-fingerprint text-xl"></i>
                    </div>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="block w-full py-4 ps-10 pe-4 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 focus:outline-none focus:border-sky-600 focus:bg-white dark:focus:bg-gray-900 caret-sky-600"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-sky-600 hover:opacity-90 focus:opacity-80"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </form>

            {/* Google signup */}
            <div className="mt-3 space-y-3">
              <button
                type="button"
                className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 dark:text-gray-200 transition-all duration-200 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              >
                <div className="absolute inset-y-0 start-0 p-4">
                  <i className="ti ti-brand-google text-rose-500 text-2xl"></i>
                </div>
                Sign up with Google
              </button>
            </div>
          </div>
        </div>

        {/* Right side - illustration */}
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-cover bg-center sm:px-6 lg:h-screen lg:px-8 bg-[url('/images/bg.png')] dark:bg-[url('/images/bg-dark.png')]">
          <div className="absolute inset-0 bg-gradient-to-t from-sky-900 to-transparent"></div>

          <div className="relative">
            <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pe-24 xl:max-w-xl">
              <h3 className="text-4xl font-bold text-white">Connect with Us..</h3>
              <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                <li className="flex items-center space-x-3">
                  <i className="ti ti-circle-check-filled text-2xl text-sky-500"></i>
                  <span className="text-lg font-medium text-white">
                    ✔ Secure Authentication
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <i className="ti ti-circle-check-filled text-2xl text-sky-500"></i>
                  <span className="text-lg font-medium text-white">
                    ✔ Business Email Only
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <i className="ti ti-circle-check-filled text-2xl text-sky-500"></i>
                  <span className="text-lg font-medium text-white">
                    ✔ Fast & Reliable Access
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
