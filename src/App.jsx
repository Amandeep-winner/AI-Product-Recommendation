import React, { useState } from 'react';
import { products } from './data/products';
import PreferenceInput from './components/PreferenceInput';
import RecommendationPanel from './components/RecommendationPanel';
import { Sparkles, RefreshCw } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [reasoning, setReasoning] = useState('');
  const [recommendedIds, setRecommendedIds] = useState(null);
  const [error, setError] = useState(null);
  const [lastPrompt, setLastPrompt] = useState('');

  const handlePreferenceSubmit = async (userInput) => {
    setIsLoading(true);
    setError(null);
    setLastPrompt(userInput);

    try {
      // Simulate API call to Gemini
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simple keyword-based mock recommendation logic for the initial step
      const inputLower = userInput.toLowerCase();
      let matchedIds = [];
      let mockReasoning = '';

      if (inputLower.includes('phone') || inputLower.includes('mobile') || inputLower.includes('camera')) {
        matchedIds = ['phone-1', 'phone-2'];
        mockReasoning = `Based on your request for a phone or camera-oriented device, I recommend the Quantum X1 Pro as a premium flagship option with its 108MP camera, and the Nebula Lite 5G as a great budget-friendly mid-ranger.`;
      } else if (inputLower.includes('laptop') || inputLower.includes('computer') || inputLower.includes('college') || inputLower.includes('work')) {
        matchedIds = ['laptop-1', 'laptop-2'];
        mockReasoning = `For productivity and work/college tasks, the Titanium Book 16 Pro offers ultimate power for demanding professional workloads, while the Zenith Air 13 provides an ultra-lightweight chassis and long battery life at a more accessible price point.`;
      } else if (inputLower.includes('audio') || inputLower.includes('sound') || inputLower.includes('headphones') || inputLower.includes('earbuds')) {
        matchedIds = ['audio-1', 'audio-2'];
        mockReasoning = `To suit your audio preferences, I've selected the Sonic Shield ANC headphones for hybrid noise cancellation and high-fidelity sound, and the Pulse Buds Pro for a highly portable, workout-ready active earbud choice.`;
      } else {
        // Default fallbacks
        matchedIds = ['phone-1', 'laptop-2', 'watch-1'];
        mockReasoning = `I analyzed your preferences: "${userInput}". Here is a curated selection across categories including the Quantum X1 Pro smartphone, the Zenith Air 13 ultra-portable laptop, and the Chronos Fit 4S smartwatch to cover your general tech needs.`;
      }

      setRecommendedIds(matchedIds);
      setReasoning(mockReasoning);
    } catch (err) {
      setError('Failed to fetch recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRecommendedIds(null);
    setReasoning('');
    setError(null);
    setLastPrompt('');
  };

  return (
    <div className="app-container">
      <header>
        <h1>SmartRecommend AI</h1>
        <p className="subtitle">Instant product matches powered by Gemini</p>
      </header>

      <main className="app-layout">
        {/* Left column: Preference Input */}
        <div className="input-column">
          <PreferenceInput onSubmit={handlePreferenceSubmit} isLoading={isLoading} />
          
          {recommendedIds && (
            <button 
              onClick={handleReset} 
              className="btn btn-secondary" 
              style={{ marginTop: '1rem' }}
            >
              <RefreshCw size={16} />
              <span>Reset & Start Over</span>
            </button>
          )}
        </div>

        {/* Right column: Recommendation Panel / Results */}
        <div className="results-column">
          {isLoading ? (
            <div className="loading-container glassmorphic">
              <div className="pulse-circle"></div>
              <p>Gemini is analyzing catalog and mapping your preferences...</p>
            </div>
          ) : (
            <RecommendationPanel
              recommendedIds={recommendedIds}
              reasoning={reasoning}
              allProducts={products}
              error={error}
            />
          )}

          {!isLoading && !recommendedIds && (
            <div className="panel-status-card glassmorphic">
              <Sparkles size={36} className="muted-icon" style={{ marginBottom: '0.5rem' }} />
              <h3>Ready to Assist</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Enter your requirements on the left to receive personalized product recommendations.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
