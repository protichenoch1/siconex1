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

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (form.password !== form.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    // Save step 1 data
    localStorage.setItem("signupData", JSON.stringify(form));

    // Redirect to address page
    router.push("/auth/signup/address");
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleContinue}>
        
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

        <button type="submit">CONTINUE</button>

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
