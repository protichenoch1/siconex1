export default function ProductCard({ name, price, image }) {
  return (
    <div className="card">
      <img src={image} alt={name} />

      <h3>{name}</h3>

      <p className="price">{price}</p>

      <button>Add to Cart</button>
    </div>
  );
}
