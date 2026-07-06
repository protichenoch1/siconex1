"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const [form, setForm] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formatPhone = (phone) => {
    let digits = phone.replace(/\D/g, "");

    if (digits.startsWith("0")) {
      return "+254" + digits.slice(1);
    }

    if (digits.startsWith("254")) {
      return "+" + digits;
    }

    return phone;
  };

  const handleSignup = async () => {
    setError("");

    // ✅ VALIDATION

    if (!form.first_name || !form.last_name) {
      return setError("First and last name are required");
    }

    if (!form.phone) {
      return setError("Phone number is required");
    }

    if (!form.email || !form.email.includes("@")) {
      return setError("Valid email is required");
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    const formattedPhone = formatPhone(form.phone);

    // 🔐 hash password
    const hashed = await bcrypt.hash(form.password, 10);

    const { error: dbError } = await supabase.from("users").insert({
      first_name: form.first_name,
      middle_name: form.middle_name || null,
      last_name: form.last_name,
      phone: formattedPhone,
      email: form.email,
      password: hashed,
    });

    if (dbError) {
      setError("User already exists or error occurred");
      return;
    }

    // simple session
    localStorage.setItem(
      "user",
      JSON.stringify({ phone: formattedPhone })
    );

    router.push("/");
  };

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
      <h2>Create Account</h2>

      <input name="first_name" placeholder="First Name" onChange={handleChange} /><br /><br />

      <input name="middle_name" placeholder="Middle Name (optional)" onChange={handleChange} /><br /><br />

      <input name="last_name" placeholder="Last Name" onChange={handleChange} /><br /><br />

      <input name="phone" placeholder="Phone (07XXXXXXXX)" onChange={handleChange} /><br /><br />

      <input name="email" placeholder="Email" onChange={handleChange} /><br /><br />

      <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br /><br />

      <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} /><br /><br />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
  }
