import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <main className="container">

      {/* BANNER */}
      <div className="banner">
        <h2>🔥 Big Deals Today</h2>
      </div>

  <div className="categories">
  <div>📱 Phones</div>
  <div>📺 TVs</div>
  <div>💻 Laptops</div>
  <div>🔋 Power</div>
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
