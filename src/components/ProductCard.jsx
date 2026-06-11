import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div className="product-card glassmorphic">
      <div className="product-card-header">
        <span className="product-category">{product.category}</span>
        <div className="product-rating">
          <Star className="star-icon" size={16} />
          <span>{product.rating}</span>
        </div>
      </div>

      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{product.description}</p>

      <ul className="product-features">
        {product.features?.map((feature, idx) => (
          <li key={idx} className="feature-item">
            <ShieldCheck className="feature-check" size={14} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="product-card-footer">
        <span className="product-price">${product.price.toFixed(2)}</span>
        <button className="btn btn-secondary">Learn More</button>
      </div>
    </div>
  );
}
