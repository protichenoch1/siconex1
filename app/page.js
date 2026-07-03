import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <main className="container">

      {/* BANNER */}
      <div class="slider">
  <div class="slides">
    <img src="/slide.jpg" />
    <img src="/slide1.jpg" />
    <img src="/slide2.jpg" />
  </div>
</div>

  <div className="categories">
  <div>📱 Phones</div>
  <div>📺 TVs</div>
  <div>💻 Laptops</div>
  <div>🔋 Power</div>
</div>

  <div class="hot-deals">
   Hot Deals
</div>

  <div class="products">
  
  <div class="card">
    <img src="/p1.jpg" />
    <h3>Samsung Galaxy A06</h3>
    <div class="price">KES 15,499</div>
    <button>Add to Cart</button>
  </div>

  <div class="card">
    <img src="/vitron32.jpg" />
    <h3>Vitron Smart Tv 32"</h3>
    <div class="price">$300</div>
    <button>Add to Cart</button>
  </div>

  <div class="card">
    <img src="/p3.jpg" />
    <h3>HP Laptop</h3>
    <div class="price">$550</div>
    <button>Add to Cart</button>
  </div>

  <div class="card">
    <img src="/p4.jpg" />
    <h3>Power Bank 20000mAh</h3>
    <div class="price">$25</div>
    <button>Add to Cart</button>
  </div>

</div>

      {/* PRODUCTS */}
      <div className="grid">
        <ProductCard 
          name="iPhone 13" 
          price="$800" 
          image="https://via.placeholder.com/150"
        />

        <ProductCard 
          name="Samsung TV" 
          price="$600" 
          image="https://via.placeholder.com/150"
        />

        <ProductCard 
          name="Powerbank" 
          price="$50" 
          image="https://via.placeholder.com/150"
        />
      </div>

    </main>
  );
}
