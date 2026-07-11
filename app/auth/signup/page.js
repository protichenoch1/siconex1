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

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (form.password !== form.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setLoading(true);

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
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    // Save session
    localStorage.setItem("user", JSON.stringify(data));

    // Update navbar
    window.dispatchEvent(new Event("userUpdated"));

    // Redirect
    router.push("/account");
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSignup}>
        
        <h2>Create Account</h2>
        <p className="subtitle">Sign up to continue</p>

        {errorMsg && <p className="error">{errorMsg}</p>}

        <input name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input name="middleName" placeholder="Middle Name (optional)" onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : "CREATE ACCOUNT"}
        </button>

        <div className="auth-footer">
          <p>Already have an account?</p>
          <Link href="/auth/login" className="secondary-btn">
            LOGIN HERE
          </Link>
        </div>

      </form>
    </div>
  );
          }
