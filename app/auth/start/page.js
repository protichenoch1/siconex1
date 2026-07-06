"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Start() {
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: ""
  });

  const handleContinue = async () => {
    // ✅ validation
    if (!form.firstName || !form.lastName || !form.phone || !form.email) {
      alert("Fill all required fields");
      return;
    }

    // ✅ format Kenya phone
    let phone = form.phone;
    if (phone.startsWith("07")) {
      phone = "+254" + phone.slice(1);
    }

    // ✅ check existing user
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("phone", phone)
      .single();

    if (existingUser) {
      localStorage.setItem("user", JSON.stringify(existingUser));
      window.location.href = "/account";
      return;
    }

    // ✅ create user
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          first_name: form.firstName,
          middle_name: form.middleName || null,
          last_name: form.lastName,
          phone,
          email: form.email
        }
      ])
      .select()
      .single();

    if (error) {
      alert("Error creating account");
      return;
    }

    // ✅ save session
    localStorage.setItem("user", JSON.stringify(data));
    window.location.href = "/account";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Create Account</h3>

      <input placeholder="First name"
        onChange={e => setForm({...form, firstName: e.target.value})} />

      <input placeholder="Middle name (optional)"
        onChange={e => setForm({...form, middleName: e.target.value})} />

      <input placeholder="Last name"
        onChange={e => setForm({...form, lastName: e.target.value})} />

      <input placeholder="Phone (07XXXXXXXX)"
        onChange={e => setForm({...form, phone: e.target.value})} />

      <input placeholder="Email"
        onChange={e => setForm({...form, email: e.target.value})} />

      <button onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
    }
