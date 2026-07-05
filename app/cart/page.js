"use client";

import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // ➕ increase quantity
  const increaseQty = (id) => {
    const updated = cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // ➖ decrease quantity
  const decreaseQty = (id) => {
    const updated = cart
      .map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0);

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // ❌ remove item
  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // 💰 total price
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="container">
        <h1>Your Cart</h1>
        <p>No items yet.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "15px", paddingBottom: "80px" }}>
      <h1>Your Cart</h1>

      {cart.map(item => (
        <div key={item.id} style={{
          display: "flex",
          gap: "10px",
          background: "#fff",
          padding: "10px",
          borderRadius: "10px",
          marginBottom: "10px",
          border: "1px solid #eee"
        }}>

          <img
            src={item.image}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "contain"
            }}
          />

          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "14px" }}>{item.name}</p>

            <p style={{
              color: "#0a8f3c",
              fontWeight: "bold"
            }}>
              KES {item.price.toLocaleString()}
            </p>

            {/* QUANTITY CONTROLS */}
            <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
              <button onClick={() => decreaseQty(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQty(item.id)}>+</button>
            </div>

            {/* REMOVE */}
            <button
              onClick={() => removeItem(item.id)}
              style={{
                marginTop: "5px",
                color: "red",
                border: "none",
                background: "none"
              }}
            >
              Remove
            </button>
          </div>

        </div>
      ))}

      {/* TOTAL */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "#fff",
        borderTop: "1px solid #eee",
        padding: "10px"
      }}>
        <p style={{ fontWeight: "bold" }}>
          Total: KES {total.toLocaleString()}
        </p>

        <button style={{
          width: "100%",
          padding: "14px",
          background: "#0a8f3c",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold"
        }}>
          Checkout
        </button>
      </div>

    </div>
  );
      }
