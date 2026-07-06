"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AccountPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div style={{ padding: "15px", background: "#f5f5f5", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <div style={{
        background: "#fff",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "15px"
      }}>
        <h3>My Account</h3>
        {user ? (
          <p style={{ color: "#555" }}>
            {user.name} • {user.email}
          </p>
        ) : (
          <p style={{ color: "#555" }}>
            Welcome! Please login
          </p>
        )}
      </div>

      {/* MENU */}
      <div style={{
        background: "#fff",
        borderRadius: "10px",
        overflow: "hidden"
      }}>

        {[
          <Link href="/account/orders">My Orders</Link>,
          "Saved Items",
          "My Details",
          "Address Book",
          "Payment Methods",
          "Help Center"
        ].map((item, index) => (
          <div
            key={index}
            style={{
              padding: "14px",
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "14px"
            }}
          >
            <span>{item}</span>
            <span style={{ color: "#999" }}>›</span>
          </div>
        ))}

      </div>

      {/* LOGIN / LOGOUT */}
      <div style={{ marginTop: "20px" }}>
        {!user ? (
          <button
            onClick={() => {
              const fakeUser = {
                name: "Aaron Bett",
                email: "aaron@email.com"
              };
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
            LOGIN
          </button>
        ) : (
          <button
            onClick={logout}
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
            LOGOUT
          </button>
        )}
      </div>

    </div>
  );
            }
