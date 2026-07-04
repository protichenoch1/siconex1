"use client";

import { useParams } from "next/navigation";

const products = [
  {
    id: "1",
    name: "Samsung Galaxy A06",
    price: 15499,
    oldPrice: 19499,
    image: "/galaxy06.jpg",
    description: "Affordable Samsung smartphone with long battery life.",
    category: "phones",
    details: ["6.5-inch HD Display", "5000mAh Battery"]
  },
  {
    id: "2",
    name: "Vitron Smart TV 32\"",
    price: "KES 30,000",
    image: "/vitron32.jpg",
    description: "32-inch smart TV with clear display and streaming apps.",
    category: "tv",
    details: ["Smart Apps", "HDMI & USB"]
  },
  {
    id: "3",
    name: "HP Laptop",
    price: "KES 55,000",
    image: "/p3.jpg",
    description: "Reliable laptop for work, school, and everyday use.",
    category: "laptops",
    details: ["8GB RAM", "256GB SSD"]
  },
  {
    id: "4",
    name: "Power Bank 20000mAh",
    price: "KES 2,500",
    image: "/p4.jpg",
    description: "High-capacity power bank for charging on the go.",
    category: "accessories",
    details: ["Fast Charging", "Portable"]
  },
  {
    id: "5",
    name: "Infinix Smart 8",
    price: "KES 12,000",
    image: "/phone2.jpg",
    description: "Budget smartphone with smooth performance.",
    category: "phones",
    details: ["5000mAh Battery", "Dual SIM"]
  }
];

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) return <p>Product not found</p>;

  return (
    <div style={{ padding: "15px", paddingBottom: "80px" }}>

      {/* IMAGE */}
      <img
        src={product.image}
        style={{
          width: "100%",
          height: "300px",
          objectFit: "contain",   // ✅ FIXED (no cropping)
          borderRadius: "10px",
          background: "#fff"
        }}
      />

      {/* INFO */}
      <h2 style={{ marginTop: "10px" }}>{product.name}</h2>

      <p style={{ color: "#0a8f3c", fontWeight: "bold" }}>
        {product.price}
      </p>

      {/* JUMIA-STYLE DESCRIPTION */}
<div style={{
  marginTop: "20px",
  background: "#fff",
  padding: "15px",
  borderRadius: "10px",
  border: "1px solid #eee"
}}>

  <h3 style={{ marginBottom: "10px" }}>
    Product Details
  </h3>

  <p style={{ color: "#555", marginBottom: "10px" }}>
    {product.description}
  </p>

  <ul style={{ paddingLeft: "18px", color: "#444" }}>
    {product.details.map((item, index) => (
      <li key={index} style={{ marginBottom: "6px" }}>
        {item}
      </li>
    ))}
  </ul>

</div>

{/* RELATED PRODUCTS */}
<div style={{ marginTop: "25px" }}>
  
  <h3>Related Products</h3>

  <div style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px"
  }}>

    {products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4)
      .map(item => (

        <a
          key={item.id}
          href={`/product/${item.id}`}
          style={{
            textDecoration: "none",
            color: "black",
            background: "#fff",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #eee"
          }}
        >

          <img
            src={item.image}
            style={{
              width: "100%",
              height: "120px",
              objectFit: "contain"
            }}
          />

          <p style={{ fontSize: "14px" }}>
            {item.name}
          </p>

            {item.oldPrice && (
  <p style={{
    textDecoration: "line-through",
    color: "#888",
    fontSize: "12px"
  }}>
    KES {item.oldPrice.toLocaleString()}
  </p>
)}

          <p style={{
  fontWeight: "bold",
  color: "#0a8f3c"
}}>
  KES {item.price.toLocaleString()}
</p>

        </a>
      ))}

  </div>
</div>

      {/* STICKY BAR */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "#fff",
        borderTop: "1px solid #eee",
        padding: "10px"
      }}>
        <button style={{
          width: "100%",
          padding: "14px",
          background: "#0a8f3c",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold"
        }}>
          Add to Cart
        </button>
      </div>

    </div>
  );
    }
