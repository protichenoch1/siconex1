"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function StartPage() {
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (loading) return;

    // ✅ Validation
    if (!form.firstName || !form.lastName || !form.phone || !form.email) {
      alert("Fill all required fields");
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

      // ✅ Check existing user
      const { data: existingUser } = await supabase
        .from("users")
        .select("*")
        .eq("phone", phone)
        .maybeSingle();

      // ✅ If exists → login
      if (existingUser) {
        localStorage.setItem("user", JSON.stringify(existingUser));
        window.location.href = "/checkout";
        return;
      }

      // ✅ Create new user
      const { data, error } = await supabase
        .from("users")
        .insert([
          {
            first_name: form.firstName.trim(),
            middle_name: form.middleName.trim() || null,
            last_name: form.lastName.trim(),
            phone,
            email: form.email.trim(),
          },
        ])
        .select()
        .single();

      if (error) {
        console.error(error);
        alert("Error creating account");
        return;
      }

      // ✅ Save session
      localStorage.setItem("user", JSON.stringify(data));

      // ✅ Redirect
      window.location.href = "/checkout";

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>Quick Account</h2>
        <p className="subtitle">Enter your details to continue</p>

        <input
          placeholder="First name"
          value={form.firstName}
          onChange={(e) =>
            setForm({ ...form, firstName: e.target.value })
          }
        />

        <input
          placeholder="Middle name (optional)"
          value={form.middleName}
          onChange={(e) =>
            setForm({ ...form, middleName: e.target.value })
          }
        />

        <input
          placeholder="Last name"
          value={form.lastName}
          onChange={(e) =>
            setForm({ ...form, lastName: e.target.value })
          }
        />

        <input
          placeholder="Phone (07XXXXXXXX)"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <button onClick={handleContinue} disabled={loading}>
          {loading ? "Please wait..." : "Continue"}
        </button>

      </div>
    </div>
  );
    }
