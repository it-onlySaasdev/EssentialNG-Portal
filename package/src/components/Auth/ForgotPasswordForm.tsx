"use client";

import { useState } from "react";

interface Props {
  onSwitch: (mode: "login" | "register" | "forgot") => void;
}

export default function ForgotPasswordForm({ onSwitch }: Props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("📩 Reset link sent to your email");
      onSwitch("login");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label className="block text-sm font-medium mb-1">Business Email</label>
        <input
          type="email"
          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      <p className="text-center text-sm mt-3">
        Remembered your password?{" "}
        <button
          type="button"
          className="text-blue-600"
          onClick={() => onSwitch("login")}
        >
          Back to Login
        </button>
      </p>
    </form>
  );
}
