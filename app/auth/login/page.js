"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Enter email and password");
      return;
    }

    // 🔍 Get user from database
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", form.email)
      .single();

    if (error || !data) {
      alert("User not found");
      return;
    }

    // 🔐 Check password
    if (data.password !== form.password) {
      alert("Incorrect password");
      return;
    }

    // ✅ Save session locally
    localStorage.setItem("user", JSON.stringify(data));

    // 🔔 Update navbar instantly
    window.dispatchEvent(new Event("userUpdated"));

    // 🚀 Redirect
    router.push("/account");
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
