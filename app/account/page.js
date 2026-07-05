"use client";

import { useState, useEffect } from "react";

export default function AccountPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // If NOT logged in
  if (!user) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>My Account</h2>

        <p style={{ margin: "15px 0", color: "#555" }}>
          Login or create an account to continue
        </p>

        <button
          onClick={() => {
            const fakeUser = { name: "Guest User", email: "guest@email.com" };
            localStorage.setItem("user", JSON.stringify(fakeUser));
            setUser(fakeUser);
          }}
          style={{
            width: "100%",
            padding: "14px",
            background: "#0a8f3c",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold"
          }}
        >
          Login
        </button>
      </div>
    );
  }

  // If logged in
  return (
    <div style={{ padding: "20px" }}>
      <h2>My Account</h2>

      <div style={{
        background: "#fff",
        padding: "15px",
        borderRadius: "10px",
        border: "1px solid #eee",
        marginTop: "15px"
      }}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "14px",
            background: "#e53935",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
            }
