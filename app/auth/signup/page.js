"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const user = {
      first_name: form.first_name,
      middle_name: form.middle_name,
      last_name: form.last_name,
      phone: form.phone,
      email: form.email,
      password: form.password
    };

    localStorage.setItem("user", JSON.stringify(user));

    router.push("/account");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Account</h2>

      <input name="first_name" placeholder="First Name" onChange={handleChange} /><br />
      <input name="middle_name" placeholder="Middle Name (optional)" onChange={handleChange} /><br />
      <input name="last_name" placeholder="Last Name" onChange={handleChange} /><br />
      <input name="phone" placeholder="Phone Number" onChange={handleChange} /><br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} /><br />

      <button onClick={handleSignup}>SIGN UP</button>

      <p>
        Already have an account?{" "}
        <span onClick={() => router.push("/auth/login")} style={{ color: "blue", cursor: "pointer" }}>
          Login
        </span>
      </p>
    </div>
  );
  }
