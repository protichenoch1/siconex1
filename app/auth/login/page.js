"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No account found. Please sign up.");
      return;
    }

    if (form.email === storedUser.email) {
      router.push("/account");
    } else {
      alert("Invalid email");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your account</p>

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">LOGIN</button>

        <p className="switch">
          Don’t have an account? <Link href="/auth/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
    }
