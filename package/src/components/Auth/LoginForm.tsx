"use client";

import { useState } from "react";

interface Props {
  onSwitch: (mode: "login" | "register" | "forgot") => void;
}

export default function LoginForm({ onSwitch }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    // Mock API call
    setTimeout(() => {
      setLoading(false);
      if (email === "test@essentialng.com" && password === "123456") {
        alert("✅ Login successful");
      } else {
        setError("Invalid email or password");
      }
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

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
      >
        {loading ? "Loading..." : "Login"}
      </button>

      <div className="flex justify-between text-sm mt-3">
        <button
          type="button"
          className="text-blue-600"
          onClick={() => onSwitch("forgot")}
        >
          Forgot password?
        </button>
        <button
          type="button"
          className="text-blue-600"
          onClick={() => onSwitch("register")}
        >
          Create account
        </button>
      </div>
    </form>
  );
}
