export default function ProductCard({ name, price }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{price}</p>
      <button>Add to Cart</button>
    </div>
  );
}
