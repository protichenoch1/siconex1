export default function ProductCard({ product }) {
  return (
    <div className="card">

      {/* 🔥 Discount badge */}
      {product.oldPrice && (
        <span className="badge">
          🔥 -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
        </span>
      )}

      {/* IMAGE */}
      <img src={product.image} alt={product.name} />

      {/* NAME */}
      <h3>{product.name}</h3>

      {/* OLD PRICE */}
      {product.oldPrice && (
        <p className="old-price">KES {product.oldPrice}</p>
      )}

      {/* NEW PRICE */}
      <p className="price">KES {product.price}</p>

    </div>
  );
        }
