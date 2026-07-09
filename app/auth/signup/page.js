"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default function Signup() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // 💾 SAVE TO DATABASE (plain password)
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          first_name: form.firstName,
          middle_name: form.middleName,
          last_name: form.lastName,
          phone_number: form.phone,
          email: form.email,
          password: form.password
        }
      ])
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    // ✅ SAVE SESSION
    localStorage.setItem("user", JSON.stringify(data));

    // 🔔 UPDATE NAVBAR
    window.dispatchEvent(new Event("userUpdated"));

    // 🚀 REDIRECT
    router.push("/account");
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSignup}>
        
        <h2>Create Account</h2>
        <p className="subtitle">Sign up to continue</p>

        <input name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input name="middleName" placeholder="Middle Name (optional)" onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />

        <button type="submit">CREATE ACCOUNT</button>

        <p className="switch">
          Already have an account? <Link href="/auth/login">Login</Link>
        </p>
      </form>
    </div>
  );
    }
