"use client";

import { useParams } from "next/navigation";

const products = [
  {
    id: "1",
    name: "Samsung Galaxy A06",
    price: "KES 15,499",
    image: "/galaxy06.jpg",
    description: "Affordable Samsung smartphone with long battery life."
  },
  {
    id: "2",
    name: "Vitron Smart TV 32\"",
    price: "KES 30,000",
    image: "/vitron32.jpg",
    description: "32-inch smart TV with clear display and streaming apps."
  },
  {
    id: "3",
    name: "HP Laptop",
    price: "KES 55,000",
    image: "/p3.jpg",
    description: "Reliable laptop for work, school, and everyday use."
  },
  {
    id: "4",
    name: "Power Bank 20000mAh",
    price: "KES 2,500",
    image: "/p4.jpg",
    description: "High-capacity power bank for charging on the go."
  }
];

export default function ProductPage() {
  const { id } = useParams();

  const product = products.find(p => p.id === id);

  if (!product) return <p>Product not found</p>;

  return (
    <div style={{ padding: "15px" }}>
      
      <img src={product.image} style={{ width: "100%", borderRadius: "10px" }} />

      <h2 style={{ marginTop: "10px" }}>{product.name}</h2>

      <p style={{ color: "#0a8f3c", fontWeight: "bold" }}>
        {product.price}
      </p>

      <p style={{ margin: "10px 0" }}>
        {product.description}
      </p>

      <button style={{
        width: "100%",
        padding: "12px",
        background: "#0a8f3c",
        color: "white",
        border: "none",
        borderRadius: "6px"
      }}>
        Add to Cart
      </button>

    </div>
  );
    }
