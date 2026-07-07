"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const formatPhone = (phone) => {
    let digits = phone.replace(/\D/g, "");

    if (digits.startsWith("0")) return "+254" + digits.slice(1);
    if (digits.startsWith("254")) return "+" + digits;

    return phone;
  };

  const handleLogin = async () => {
    setError("");

    if (!phone || !password) {
      return setError("Enter phone and password");
    }

    const formattedPhone = formatPhone(phone);

    // ✅ match phone + password directly
    const { data: user, error: dbError } = await supabase
      .from("users")
      .select("*")
      .eq("phone", formattedPhone)
      .eq("password", password)
      .single();

    if (dbError || !user) {
      return setError("Invalid phone or password");
    }

    // ✅ store FULL user
    localStorage.setItem("user", JSON.stringify(user));

    router.push("/account");
  };

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
      <h2>Login</h2>

      <input
        placeholder="Phone (07XXXXXXXX)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleLogin}>Login</button>
    </div>
  );
          }
