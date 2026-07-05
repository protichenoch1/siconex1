"use client";

import { useState, useEffect } from "react";
import { addToCart, getCart } from "../lib/cart";

export default function AddToCartButton({ product }) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(0);

  useEffect(() => {
    const cart = getCart();
    const item = cart.find(i => i.id === product.id);
    if (item) setQty(item.quantity);
  }, [product.id]);

  const handleAdd = () => {
    setLoading(true);

    // ⏳ Step 1: Adding...
    setTimeout(() => {
      addToCart(product);
      setLoading(false);
      setAdded(true);
    }, 2000);

    // ✅ Step 2: Added ✓
    setTimeout(() => {
      setAdded(false);
      setQty(1);
    }, 3000); // shows "Added" for 1 second
  };

  const increase = () => {
    const cart = getCart();
    const item = cart.find(i => i.id === product.id);

    if (item) {
      item.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
      setQty(item.quantity);
    }
  };

  const decrease = () => {
    let cart = getCart();
    const item = cart.find(i => i.id === product.id);

    if (item) {
      item.quantity -= 1;

      if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== product.id);
        setQty(0);
      } else {
        setQty(item.quantity);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  // ⏳ Adding state
  if (loading) {
    return (
      <button style={{
        width: "100%",
        padding: "14px",
        background: "#ccc",
        color: "#fff",
        border: "none",
        borderRadius: "8px"
      }}>
        Adding to cart...
      </button>
    );
  }

  // ✅ Added flash
  if (added) {
    return (
      <button style={{
        width: "100%",
        padding: "14px",
        background: "#0a8f3c",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontWeight: "bold"
      }}>
        Added to cart successfully ✓
      </button>
    );
  }

  // 🔢 Quantity controls
  if (qty > 0) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        alignItems: "center",
        background: "#fff",
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #eee"
      }}>
        <button
          onClick={decrease}
          style={{
            width: "40px",
            height: "40px",
            background: "#0a8f3c",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "18px"
          }}
        >
          −
        </button>

        <span style={{
  fontWeight: "bold",
  fontSize: "16px",
  minWidth: "150px",
  textAlign: "center",
  display: "inline-block"
}}>
  {qty}
</span>

        <button
          onClick={increase}
          style={{
            width: "40px",
            height: "40px",
            background: "#0a8f3c",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "18px"
          }}
        >
          +
        </button>
      </div>
    );
  }

  // 🛒 Default
  return (
    <button
      onClick={handleAdd}
      style={{
        width: "100%",
        padding: "14px",
        background: "#0a8f3c",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontWeight: "bold"
      }}
    >
      Add to Cart
    </button>
  );
        }
