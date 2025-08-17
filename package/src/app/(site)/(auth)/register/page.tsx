"use client";

import { useState } from "react";
import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";
import ForgotPasswordForm from "@/components/Auth/ForgotPasswordForm";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");

  return (
    <div className="min-h-screen flex">
      {/* Left: Forms */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            {mode === "login" && "Welcome Back"}
            {mode === "register" && "Create an Account"}
            {mode === "forgot" && "Reset Password"}
          </h1>

          {mode === "login" && <LoginForm onSwitch={setMode} />}
          {mode === "register" && <RegisterForm onSwitch={setMode} />}
          {mode === "forgot" && <ForgotPasswordForm onSwitch={setMode} />}
        </div>
      </div>

      {/* Right: Branding */}
      <div className="hidden md:flex w-1/2 relative">
        <img
          src="/auth-bg.jpg"
          alt="Auth Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/70 to-indigo-900/70 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h2 className="text-3xl font-bold">EssentialNG</h2>
            <p className="mt-2 text-lg">Your trusted business platform</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>✔ Secure Authentication</li>
              <li>✔ Business Email Only</li>
              <li>✔ Fast & Reliable Access</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
