/* 
  SkeletonCard Component 
  Displays a pulsing placeholder during recommendation loading
*/
import React from 'react';

const SkeletonCard = () => {
  return (
    <div 
      className="glassmorphic product-card" 
      style={{ 
        opacity: 0.6, 
        pointerEvents: 'none',
        animation: 'pulse 2s infinite ease-in-out'
      }}
    >
      <div className="product-card-header">
        <div style={{ width: '80px', height: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px' }}></div>
        <div style={{ width: '30px', height: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
      </div>
      
      <div style={{ width: '70%', height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', margin: '1rem 0 0.5rem 0' }}></div>
      <div style={{ width: '100%', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '1.25rem' }}></div>
      
      <div className="product-features">
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div style={{ width: '14px', height: '14px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
            <div style={{ width: '80%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
          </div>
        ))}
      </div>
      
      <div className="product-card-footer">
        <div style={{ width: '60px', height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
        <div style={{ width: '70px', height: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
