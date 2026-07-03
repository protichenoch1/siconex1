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
