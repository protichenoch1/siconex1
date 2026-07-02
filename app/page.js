import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <main className="container">
      <h1>Welcome to Siconex</h1>

      <div className="grid">
        <ProductCard name="iPhone 13" price="$800" />
        <ProductCard name="Samsung TV" price="$600" />
        <ProductCard name="Powerbank" price="$50" />
      </div>
    </main>
  );
}
