/* 
  ProductCard Component 
  Displays individual product details with conditional styling for AI recommendations
*/
import React from 'react';
import { Star, CheckCircle2, Check } from 'lucide-react';

const ProductCard = ({ product, isRecommended }) => {
  const { name, category, price, rating, features, description } = product;

  // Format price to USD
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

  return (
    <div 
      className={`glassmorphic product-card ${isRecommended ? 'recommended' : ''}`}
      style={{ 
        opacity: isRecommended ? 1 : 0.45,
        borderColor: isRecommended ? 'var(--accent-secondary)' : undefined,
        position: 'relative',
        transition: 'all 0.3s ease'
      }}
    >
      {/* AI Pick Badge */}
      {isRecommended && (
        <div 
          className="ai-pick-badge" 
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'var(--accent-secondary)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '0.7rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            zIndex: 10
          }}
        >
          <Check size={12} strokeWidth={3} />
          AI PICK
        </div>
      )}

      <div className="product-card-header">
        <span className="product-category">{category}</span>
        <div className="product-rating">
          <Star size={14} className="star-icon" />
          <span>{rating}</span>
        </div>
      </div>

      <h3 className="product-name">{name}</h3>
      
      <p className="product-description">{description}</p>

      <ul className="product-features">
        {features.slice(0, 3).map((feature, index) => (
          <li key={index} className="feature-item">
            <CheckCircle2 size={14} className="feature-check" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="product-card-footer">
        <span className="product-price">{formattedPrice}</span>
        <button className="btn btn-secondary">Details</button>
      </div>
    </div>
  );
};

export default ProductCard;
