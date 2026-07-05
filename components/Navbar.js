"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCartCount } from "../lib/cart";

export default function Navbar() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(getCartCount());

    update(); // initial load
    window.addEventListener("cartUpdated", update);

    return () => window.removeEventListener("cartUpdated", update);
  }, []);

  return (
    <div className="header">
      
      {/* TOP BAR */}
      <div className="navbar">
        <div className="nav-left">
          <span className="menu">☰</span>
          <span className="logo">SICONEX</span>
        </div>

        <div className="nav-right">

          {/* ACCOUNT ICON */}
          <Link href="/account" className="icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="#0a8f3c" strokeWidth="2"/>
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="#0a8f3c" strokeWidth="2"/>
            </svg>
          </Link>

          {/* CART ICON */}
          <Link href="/cart" className="icon" style={{ position: "relative" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6 6h15l-2 9H8L6 6z" stroke="#0a8f3c" strokeWidth="2"/>
              <circle cx="9" cy="20" r="1.5" fill="#0a8f3c"/>
              <circle cx="18" cy="20" r="1.5" fill="#0a8f3c"/>
            </svg>

            {/* 🔴 CART COUNT BADGE */}
            {count > 0 && (
              <span style={{
                position: "absolute",
                top: "-6px",
                right: "-8px",
                background: "#ff3b30",
                color: "#fff",
                fontSize: "10px",
                borderRadius: "50%",
                padding: "2px 6px",
                fontWeight: "bold"
              }}>
                {count}
              </span>
            )}
          </Link>

        </div>
      </div>

      {/* SEARCH */}
      <div className="search-bar">
        <input type="text" placeholder="Search products..." />
        <button>Search</button>
      </div>

    </div>
  );
    }
