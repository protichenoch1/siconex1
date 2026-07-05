"use client";

import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // ➕ increase
  const increaseQty = (id) => {
    const updated = cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateCart(updated);
  };

  // ➖ decrease
  const decreaseQty = (id) => {
    const updated = cart
      .map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0);

    updateCart(updated);
  };

  // ❌ remove
  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id);
    updateCart(updated);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="container">
        <h1>My Cart</h1>
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
          gap: "12px",
          background: "#fff",
          padding: "12px",
          borderRadius: "10px",
          marginBottom: "12px",
          border: "1px solid #eee",
          alignItems: "center"
        }}>

          {/* IMAGE */}
          <img
            src={item.image}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "contain"
            }}
          />

          {/* INFO */}
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "14px", marginBottom: "4px" }}>
              {item.name}
            </p>

            <p style={{
              color: "#0a8f3c",
              fontWeight: "bold",
              marginBottom: "6px"
            }}>
              KES {item.price.toLocaleString()}
            </p>

            {/* QUANTITY */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <button
                onClick={() => decreaseQty(item.id)}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  background: "#f5f5f5",
                  fontWeight: "bold"
                }}
              >
                −
              </button>

              <span style={{ minWidth: "20px", textAlign: "center" }}>
                {item.quantity}
              </span>

              <button
                onClick={() => increaseQty(item.id)}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  background: "#f5f5f5",
                  fontWeight: "bold"
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* REMOVE RIGHT */}
          <button
            onClick={() => removeItem(item.id)}
            style={{
              color: "#ff3b30",
              border: "none",
              background: "none",
              fontSize: "13px",
              alignSelf: "flex-start"
            }}
          >
            Remove
          </button>

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
