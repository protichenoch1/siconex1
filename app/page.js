"use client";

import { useRouter } from "next/navigation";
import { products, categories } from "../data/products";

export default function Home() {
  const router = useRouter();

  const goToProduct = (id) => {
    router.push(`/product/${id}`);
  };

  return (
    <main className="container">

      {/* BANNER */}
      <div className="slider">
        <div className="slides">
          <img src="/slide.jpg" />
          <img src="/slide1.jpg" />
          <img src="/slide2.jpg" />
        </div>
      </div>

      {/* ✅ CATEGORIES */}
      <div className="categories">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category"
            onClick={() => router.push(`/category/${cat.id}`)}
          >
            <div style={{ fontSize: "22px" }}>{cat.icon}</div>
            <div>{cat.name}</div>
          </div>
        ))}
      </div>

      {/* HOT DEALS */}
      <div className="hot-deals-section">
        <div className="hot-title">Hot Deals</div>

        <div className="hot-deals">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="card"
              onClick={() => goToProduct(product.id)}
            >
              <img src={product.image} />
              <h3>{product.name}</h3>

              {product.oldPrice && (
                <div style={{
                  textDecoration: "line-through",
                  color: "#888",
                  fontSize: "12px"
                }}>
                  KES {product.oldPrice.toLocaleString()}
                </div>
              )}

              <div className="price">
                KES {product.price.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NEW ARRIVALS */}
      <div className="hot-deals-section">
        <div className="hot-title">🔥 New Arrivals</div>

        <div className="hot-deals">
          {products.slice(1, 5).map((product) => (
            <div
              key={product.id}
              className="card"
              onClick={() => goToProduct(product.id)}
            >
              <img src={product.image} />
              <h3>{product.name}</h3>

              <div className="price">
                KES {product.price.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ALL PRODUCTS */}
      <div className="hot-deals-section">
        <div className="hot-title">All Products</div>

        <div className="products">
          {products.map((product) => (
            <div
              key={product.id}
              className="card"
              onClick={() => goToProduct(product.id)}
            >
              <img src={product.image} />
              <h3>{product.name}</h3>

              {product.oldPrice && (
                <div style={{
                  textDecoration: "line-through",
                  color: "#888",
                  fontSize: "12px"
                }}>
                  KES {product.oldPrice.toLocaleString()}
                </div>
              )}

              <div className="price">
                KES {product.price.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
                }
