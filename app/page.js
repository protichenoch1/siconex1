"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const goToProduct = (id) => {
    router.push(`/product/${id}`);
  };

  const addToCart = (e) => {
    e.stopPropagation();
    alert("Added to cart");
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

      {/* CATEGORIES */}
      <div className="categories">
        <div>📱 Phones</div>
        <div>📺 TVs</div>
        <div>💻 Laptops</div>
        <div>🔋 Power</div>
      </div>

      {/* HOT DEALS */}
      <div className="hot-deals-section">
        <div className="hot-title">Hot Deals</div>

        <div className="hot-deals">

          <div className="card" onClick={() => goToProduct(1)}>
            <img src="/galaxy06.jpg" />
            <h3>Samsung Galaxy A06</h3>
            <div className="price">KES 15,499</div>
          </div>

          <div className="card" onClick={() => goToProduct(2)}>
            <img src="/vitron32.jpg" />
            <h3>Vitron Smart Tv 32"</h3>
            <div className="price">KES 30,000</div>
          </div>

          <div className="card" onClick={() => goToProduct(3)}>
            <img src="/p3.jpg" />
            <h3>HP Laptop</h3>
            <div className="price">KES 55,000</div>
          </div>

          <div className="card" onClick={() => goToProduct(4)}>
            <img src="/p4.jpg" />
            <h3>PowerBank 20000mAh</h3>
            <div className="price">KES 2,500</div>
          </div>

        </div>
      </div>

      {/* NEW ARRIVALS */}
      <div className="hot-deals-section">
        <div className="hot-title">🔥 New Arrivals</div>

        <div className="hot-deals">

          <div className="card" onClick={() => goToProduct(3)}>
            <img src="/p3.jpg" />
            <h3>HP Laptop</h3>
            <div className="price">KES 55,000</div>
          </div>

          <div className="card" onClick={() => goToProduct(4)}>
            <img src="/p4.jpg" />
            <h3>Power Bank 20000mAh</h3>
            <div className="price">KES 2,500</div>
          </div>

          <div className="card" onClick={() => goToProduct(3)}>
            <img src="/p3.jpg" />
            <h3>HP Laptop</h3>
            <div className="price">KES 55,000</div>
          </div>

          <div className="card" onClick={() => goToProduct(4)}>
            <img src="/p4.jpg" />
            <h3>Power Bank 20000mAh</h3>
            <div className="price">KES 2,500</div>
          </div>

        </div>
      </div>

      {/* ALL PRODUCTS */}
      <div className="hot-deals-section">
        <div className="hot-title">All Products</div>

        <div className="products">

          <div className="card" onClick={() => goToProduct(1)}>
            <img src="/p1.jpg" />
            <h3>Samsung Galaxy A06</h3>
            <div className="price">KES 15,499</div>
          </div>

          <div className="card" onClick={() => goToProduct(2)}>
            <img src="/vitron32.jpg" />
            <h3>Vitron Smart Tv 32"</h3>
            <div className="price">KES 30,000</div>
          </div>

          <div className="card" onClick={() => goToProduct(3)}>
            <img src="/p3.jpg" />
            <h3>HP Laptop</h3>
            <div className="price">KES 55,000</div>
          </div>

          <div className="card" onClick={() => goToProduct(4)}>
            <img src="/p4.jpg" />
            <h3>Power Bank 20000mAh</h3>
            <div className="price">KES 2,500</div>
          </div>

        </div>
      </div>

    </main>
  );
}
