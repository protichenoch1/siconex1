"use client";

import { useParams, useRouter } from "next/navigation";
import { products } from "../../../data/products";

export default function CategoryPage() {
  const { id } = useParams(); // e.g. "phones"
  const router = useRouter();

  // Filter products by category
  const filteredProducts = products.filter(
    (product) => product.category === id
  );

  return (
    <div className="container">
      <h2 style={{ marginBottom: "15px" }}>
        {id.toUpperCase()}
      </h2>

      {filteredProducts.length === 0 ? (
        <p>No products found in this category</p>
      ) : (
        <div className="products">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="card"
              onClick={() => router.push(`/product/${product.id}`)}
            >
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>

              {product.oldPrice && (
                <div className="old-price">
                  KES {product.oldPrice.toLocaleString()}
                </div>
              )}

              <div className="price">
                KES {product.price.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
