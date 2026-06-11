/* 
  RecommendationPanel Component 
  Displays the AI's reasoning and the resulting product list
*/
import React from 'react';
import { Brain, AlertCircle, ShoppingBag } from 'lucide-react';
import ProductCard from './ProductCard';

const RecommendationPanel = ({ recommendedIds, reasoning, allProducts, error }) => {
  if (error) {
    return (
      <div className="panel-status-card glassmorphic error-card">
        <AlertCircle size={48} />
        <h3>Something went wrong</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!recommendedIds) return null;

  // Handle empty state (0 matches)
  if (recommendedIds.length === 0) {
    return (
      <div className="panel-status-card glassmorphic empty-card">
        <ShoppingBag size={48} className="muted-icon" />
        <h3>No exact matches found</h3>
        <p style={{ color: 'var(--text-muted)' }}>
          Gemini couldn't find products that perfectly match your request. Try rephrasing or broadening your requirements.
        </p>
      </div>
    );
  }

  // Sort products: Recommended first, then the rest
  const sortedProducts = [...allProducts].sort((a, b) => {
    const aRec = recommendedIds.includes(a.id);
    const bRec = recommendedIds.includes(b.id);
    if (aRec && !bRec) return -1;
    if (!aRec && bRec) return 1;
    return 0;
  });

  return (
    <div className="recommendation-panel">
      {/* Reasoning Panel */}
      <div className="reasoning-card glassmorphic">
        <div className="reasoning-header">
          <Brain size={20} className="brain-icon" />
          <span>AI Recommendations Reasoning</span>
          <span 
            style={{ 
              marginLeft: 'auto', 
              fontSize: '0.8rem', 
              background: 'rgba(255,255,255,0.1)', 
              padding: '2px 8px', 
              borderRadius: '12px',
              color: 'var(--text-muted)'
            }}
          >
            {recommendedIds.length} of {allProducts.length} products recommended
          </span>
        </div>
        <p className="reasoning-content">{reasoning}</p>
      </div>

      {/* Product Grid */}
      <div className="results-section">
        <h3 className="results-title">Matched Catalog</h3>
        <div className="product-grid">
          {sortedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isRecommended={recommendedIds.includes(product.id)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationPanel;
