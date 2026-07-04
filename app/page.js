import ProductCard from "../components/ProductCard";

export default function Home() {
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
    <div className="card">
      <img src="/galaxy06.jpg" />
      <h3>Samsung Galaxy A06</h3>
      <div className="price">KES 15,499</div>
      <button>Add to Cart</button>
    </div>

    <div className="card">
      <img src="/vitron32.jpg" />
      <h3>Vitron Smart Tv 32"</h3>
      <div className="price">KES 30,000</div>
      <button>Add to Cart</button>
    </div>

    <div className="card">
      <img src="/p3.jpg" />
      <h3>HP Laptop</h3>
      <div className="price">KES 55,000</div>
      <button>Add to Cart</button>
    </div>

    <div className="card">
      <img src="/p4.jpg" />
      <h3>Power Bank 20000mAh</h3>
      <div className="price">KES 2,500</div>
      <button>Add to Cart</button>
    </div>
  </div>
</div>

{/* NEW ARRIVALS (SWIPE) */}
  <div className="hot-deals-section">
  <div className="hot-title">🔥 New Arrivals</div>

  <div className="hot-deals">

    <div className="card">
      <img src="/p3.jpg" />
      <h3>HP Laptop</h3>
      <div className="price">KES 55,000</div>
      <button>Add to Cart</button>
    </div>

    <div className="card">
      <img src="/p4.jpg" />
      <h3>Power Bank 20000mAh</h3>
      <div className="price">KES 2,500</div>
      <button>Add to Cart</button>
    </div>

  <div className="card">
    <img src="/p3.jpg" />
    <h3>HP Laptop</h3>
    <div className="price">KES 55,000</div>
    <button>Add to Cart</button>
  </div>

  <div className="card">
    <img src="/p4.jpg" />
    <h3>Power Bank 20000mAh</h3>
    <div className="price">KES 2,500</div>
    <button>Add to Cart</button>
  </div>
    
  </div>
</div>

  {/* ALL PRODUCTS */}
<div className="hot-deals-section">
  <div className="hot-title">All Products</div>

  <div className="products">

  <div className="card">
    <img src="/p1.jpg" />
    <h3>Samsung Galaxy A06</h3>
    <div className="price">KES 15,499</div>
    <button>Add to Cart</button>
  </div>

  <div className="card">
    <img src="/vitron32.jpg" />
    <h3>Vitron Smart Tv 32"</h3>
    <div className="price">KES 30,000</div>
    <button>Add to Cart</button>
  </div>

  <div className="card">
    <img src="/p3.jpg" />
    <h3>HP Laptop</h3>
    <div className="price">KES 55,000</div>
    <button>Add to Cart</button>
  </div>

  <div className="card">
    <img src="/p4.jpg" />
    <h3>Power Bank 20000mAh</h3>
    <div className="price">KES 2,500</div>
    <button>Add to Cart</button>
  </div>

</div>
</div>

      {/* PRODUCTS */}
      <div className="products">

        <div className="card">
          <img src="/p1.jpg" />
          <h3>Samsung Galaxy A06</h3>
          <div className="price">KES 15,499</div>
          <button>Add to Cart</button>
        </div>

        <div className="card">
          <img src="/vitron32.jpg" />
          <h3>Vitron Smart Tv 32"</h3>
          <div className="price">KES 30,000</div>
          <button>Add to Cart</button>
        </div>

        <div className="card">
          <img src="/p3.jpg" />
          <h3>HP Laptop</h3>
          <div className="price">KES 55,000</div>
          <button>Add to Cart</button>
        </div>

        <div className="card">
          <img src="/p4.jpg" />
          <h3>Power Bank 20000mAh</h3>
          <div className="price">KES 2,500</div>
          <button>Add to Cart</button>
        </div>

      </div>

    </main>
  );
        }
