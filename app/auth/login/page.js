"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    phone: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.phone || !form.password) {
      alert("Enter phone and password");
      return;
    }

    // ✅ Format Kenya phone
    let phone = form.phone.trim();

    if (phone.startsWith("07")) {
      phone = "+254" + phone.slice(1);
    }

    if (!phone.startsWith("+254")) {
      alert("Enter a valid Kenyan phone number");
      return;
    }

    try {
      setLoading(true);

      // 🔍 Get user from database
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("phone", phone)
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

      // ✅ Save session
      localStorage.setItem("user", JSON.stringify(data));

      // 🔔 Update navbar
      window.dispatchEvent(new Event("userUpdated"));

      // 🚀 Redirect
      router.push("/account");

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        
        <h2>Welcome Back</h2>
        <p className="subtitle">Login with your phone number</p>

        <input
          name="phone"
          placeholder="Phone (07XXXXXXXX)"
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

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "LOGIN"}
        </button>

        <p className="switch">
          Don’t have an account?{" "}
          <Link href="/auth/signup">Sign up</Link>
        </p>

      </form>
    </div>
  );
            }
