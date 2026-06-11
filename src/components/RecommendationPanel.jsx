import React from 'react';
import ProductCard from './ProductCard';
import { HelpCircle, BrainCircuit } from 'lucide-react';

export default function RecommendationPanel({ recommendedIds, reasoning, allProducts, error }) {
  if (error) {
    return (
      <div className="panel-status-card error-card glassmorphic">
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!recommendedIds && !reasoning) {
    return null;
  }

  // Filter products matching the recommended IDs
  const recommendedProducts = allProducts.filter((p) =>
    recommendedIds.includes(p.id)
  );

  return (
    <div className="recommendation-panel">
      {reasoning && (
        <div className="reasoning-card glassmorphic">
          <div className="reasoning-header">
            <BrainCircuit className="brain-icon" size={20} />
            <h4>AI Reasoning & Analysis</h4>
          </div>
          <div className="reasoning-content">
            <p>{reasoning}</p>
          </div>
        </div>
      )}

      <div className="results-section">
        <h4 className="results-title">Matched Products ({recommendedProducts.length})</h4>
        
        {recommendedProducts.length === 0 ? (
          <div className="panel-status-card empty-card glassmorphic">
            <HelpCircle size={32} className="muted-icon" />
            <p>No matches found matching your preferences. Try describing your needs differently!</p>
          </div>
        ) : (
          <div className="product-grid">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
