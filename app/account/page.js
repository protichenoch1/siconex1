"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("user");

    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);

    // notify navbar or other components
    window.dispatchEvent(new Event("userUpdated"));

    // redirect
    router.push("/");
  };

  const menuItems = [
    { label: "My Orders", path: "/orders" },
    { label: "Saved Items", path: "/saved" },
    { label: "My Details", path: "/account/details" },
    { label: "Address Book", path: "/account/addresses" },
    { label: "Payment Methods", path: "/account/payment" },
    { label: "Help Center", path: "/help" },
  ];

  // ❌ NOT LOGGED IN
  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h2>My Account</h2>

        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 10,
            textAlign: "center",
          }}
        >
          <p>Welcome! Please sign in</p>

          <button
            onClick={() => router.push("/auth/login")}
            style={{
              width: "100%",
              padding: 12,
              background: "#f68b1e",
              color: "#fff",
              border: "none",
              marginTop: 10,
              cursor: "pointer",
            }}
          >
            LOGIN
          </button>

          <button
            onClick={() => router.push("/auth/signup")}
            style={{
              width: "100%",
              padding: 12,
              marginTop: 10,
              cursor: "pointer",
            }}
          >
            CREATE ACCOUNT
          </button>
        </div>
      </div>
    );
  }

  // ✅ LOGGED IN
  return (
    <div style={{ padding: 20 }}>
      <h2>My Account</h2>

      {/* USER INFO */}
      <div
        style={{
          background: "#fff",
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
        }}
      >
        <p>
          <strong>
            {user.first_name} {user.last_name}
          </strong>
        </p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>

      {/* MENU */}
      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        {menuItems.map((item, i) => (
          <div
            key={i}
            onClick={() => router.push(item.path)}
            style={{
              padding: 15,
              borderBottom: "1px solid #eee",
              cursor: "pointer",
              transition: "0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#f5f5f5")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#fff")
            }
          >
            {item.label}
          </div>
        ))}
      </div>

      {/* LOGOUT */}
      <button
        onClick={logout}
        style={{
          marginTop: 20,
          width: "100%",
          padding: 12,
          background: "#e53935",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          borderRadius: 6,
        }}
      >
        LOGOUT
      </button>
    </div>
  );
              }
