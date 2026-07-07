"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/ProtectedRoute";

function AccountContent() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    router.replace("/login");
  };

  const menuItems = [
    { title: "My Orders", path: "/account/orders" },
    { title: "Saved Items", path: "/account/saved" },
    { title: "My Details", path: "/account/details" },
    { title: "Address Book", path: "/account/addresses" },
    { title: "Payment Methods", path: "/account/payments" },
    { title: "Help Center", path: "/help" },
  ];

  return (
    <div style={{ padding: "15px", background: "#f5f5f5", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <div
        style={{
          background: "#fff",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "15px"
        }}
      >
        <h3>My Account</h3>

        {user && (
          <p style={{ color: "#555" }}>
            {user.name} • {user.email}
          </p>
        )}
      </div>

      {/* MENU */}
      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          overflow: "hidden"
        }}
      >
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => router.push(item.path)}
            style={{
              padding: "14px",
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "14px",
              cursor: "pointer"
            }}
          >
            <span>{item.title}</span>
            <span style={{ color: "#999" }}>›</span>
          </div>
        ))}
      </div>

      {/* LOGOUT */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={logout}
          style={{
            width: "100%",
            padding: "14px",
            background: "#e53935",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          LOGOUT
        </button>
      </div>

    </div>
  );
}

export default function AccountPage() {
  return (
    <ProtectedRoute>
      <AccountContent />
    </ProtectedRoute>
  );
}
