"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { products } from "../../../data/products";
import { addToCart } from "../../../lib/cart";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) return <p>Product not found</p>;

  return (
    <div style={{ padding: "15px", paddingBottom: "80px" }}>

      {/* IMAGE + BADGE */}
      <div style={{ position: "relative" }}>
        {product.oldPrice && (
          <div className="badge">
            🔥 -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
          </div>
        )}

        <img
          src={product.image}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "contain",
            borderRadius: "10px",
            background: "#fff"
          }}
        />
      </div>

      {/* INFO */}
      <h2 style={{ marginTop: "10px" }}>{product.name}</h2>

      {product.oldPrice && (
        <p style={{
          textDecoration: "line-through",
          color: "#888",
          fontSize: "14px"
        }}>
          KES {product.oldPrice.toLocaleString()}
        </p>
      )}

      <p style={{
        color: "#0a8f3c",
        fontWeight: "bold",
        fontSize: "18px"
      }}>
        KES {product.price.toLocaleString()}
      </p>

      {/* DESCRIPTION SECTION */}
      <div style={{
        marginTop: "20px",
        background: "#fff",
        padding: "15px",
        borderRadius: "10px",
        border: "1px solid #eee"
      }}>

        <h3 style={{ marginBottom: "10px", fontSize: "16px" }}>
          Product Details
        </h3>

        {/* DESCRIPTION */}
        <p style={{
          color: "#444",
          marginBottom: "12px",
          lineHeight: "1.5",
          fontSize: "13px"
        }}>
          {product.description}
        </p>

        {/* FEATURES */}
        {product.features && (
          <>
            <h4 style={{ marginBottom: "8px", fontSize: "14px" }}>
              Key Features
            </h4>

            <ul style={{
              paddingLeft: "18px",
              marginBottom: "12px",
              fontSize: "13px"
            }}>
              {product.features.map((item, index) => (
                <li key={index} style={{ marginBottom: "5px" }}>
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* SPECIFICATIONS */}
        {product.specs && (
          <>
            <h4 style={{ marginBottom: "8px", fontSize: "14px" }}>
              Specifications
            </h4>

            <div style={{ fontSize: "13px" }}>
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #eee",
                  padding: "5px 0"
                }}>
                  <span style={{ color: "#666" }}>{key}</span>
                  <span style={{ fontWeight: "500" }}>{value}</span>
                </div>
              ))}
            </div>
          </>
        )}

      </div>

      {/* RELATED PRODUCTS */}
      <div style={{ marginTop: "25px" }}>
        <h3 style={{ fontSize: "16px" }}>Related Products</h3>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px"
        }}>

          {products
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4)
            .map(item => (

              <Link
                key={item.id}
                href={`/product/${item.id}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                  background: "#fff",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "1px solid #eee",
                  position: "relative"
                }}
              >

                {/* BADGE */}
                {item.oldPrice && (
                  <div className="badge">
                    🔥 -{Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}%
                  </div>
                )}

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

              </Link>
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
        <button
  onClick={() => {
    addToCart(product);
    alert("Added to cart");
  }}
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
      </div>

    </div>
  );
            }
