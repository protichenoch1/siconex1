"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

  const handleSignup = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      name: form.firstName + " " + form.lastName,
      email: form.email
    };

    localStorage.setItem("user", JSON.stringify(userData));

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
