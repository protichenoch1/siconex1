"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const saved = localStorage.getItem("user");

    if (!saved) {
      alert("No account found");
      return;
    }

    const user = JSON.parse(saved);

    if (user.phone === phone && user.password === password) {
      router.push("/account");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />

      <button onClick={handleLogin}>LOGIN</button>

      <p>
        Don’t have an account?{" "}
        <span onClick={() => router.push("/auth/signup")} style={{ color: "blue", cursor: "pointer" }}>
          Sign Up
        </span>
      </p>
    </div>
  );
          }
