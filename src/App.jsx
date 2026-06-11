/* 
  Main Application Component 
  Orchestrates state management and connects UI components with Gemini API
*/
import React, { useState } from 'react';
import { products } from './data/products';
import PreferenceInput from './components/PreferenceInput';
import RecommendationPanel from './components/RecommendationPanel';
import SkeletonCard from './components/SkeletonCard';
import { Sparkles, RefreshCw } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [reasoning, setReasoning] = useState('');
  const [recommendedIds, setRecommendedIds] = useState(null);
  const [error, setError] = useState(null);
  const [lastPrompt, setLastPrompt] = useState('');

  // Phase 3: Gemini API Integration
  // Phase 3: Gemini API Integration with Caching & Retry on 429
  const fetchRecommendations = async (userInput, apiKey, retries = 2, delay = 2000) => {
    const cacheKey = `gemini_rec_${userInput.toLowerCase().trim()}`;
    const cachedData = sessionStorage.getItem(cacheKey);
    if (cachedData) {
      try {
        console.log("Serving recommendations from session cache.");
        return JSON.parse(cachedData);
      } catch (e) {
        sessionStorage.removeItem(cacheKey);
      }
    }

    const performFetch = async (attempt) => {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`;
      
      const systemContext = `You are an expert product recommendation engine. 
You will be given a product catalog as JSON and a user's preference statement.
Respond ONLY with a valid JSON object — no markdown, no backticks, no explanation outside the JSON.
Use this exact shape: { "recommended_ids": ["phone-1", "laptop-2"], "reasoning": "Here is why..." }
Only recommend products that genuinely match the preference. You may recommend 1 to 5 products.
The reasoning should be 2-3 sentences explaining your choices.`;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${systemContext}\n\nProduct Catalog:\n${JSON.stringify(products, null, 2)}\n\nUser Preference: "${userInput}"`
            }]
          }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 1024 }
        })
      });

      if (!res.ok) {
        if (res.status === 429 && attempt < retries) {
          console.warn(`Rate limit hit (429). Retrying in ${delay}ms... (Attempt ${attempt + 1} of ${retries})`);
          await new Promise((r) => setTimeout(r, delay));
          return performFetch(attempt + 1);
        }
        if (res.status === 401 || res.status === 403) {
          throw new Error("Invalid API Key. Please check your Gemini API key.");
        }
        if (res.status === 429) {
          throw new Error("Rate limit exceeded (429). Please wait a moment before trying again or check your Gemini API quota.");
        }
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }
      
      const data = await res.json();
      
      if (!data.candidates || !data.candidates[0].content.parts[0].text) {
        throw new Error("Invalid response from Gemini API.");
      }

      const rawText = data.candidates[0].content.parts[0].text;
      const cleaned = rawText.replace(/```json|```/g, '').trim();
      
      try {
        const parsed = JSON.parse(cleaned);
        sessionStorage.setItem(cacheKey, JSON.stringify(parsed));
        return parsed;
      } catch (e) {
        console.error("Failed to parse Gemini response:", rawText);
        throw new Error("Gemini returned an invalid response format. Please try again.");
      }
    };

    return performFetch(0);
  };

  const handlePreferenceSubmit = async (userInput, uiApiKey) => {
    setIsLoading(true);
    setError(null);
    setLastPrompt(userInput);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || uiApiKey;
    if (!apiKey) {
      setError("API Key not found. Please add VITE_GEMINI_API_KEY to your .env file or enter it in the input panel.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await fetchRecommendations(userInput, apiKey);
      setRecommendedIds(result.recommended_ids || []);
      setReasoning(result.reasoning || "I've selected these products based on your specific requirements.");
    } catch (err) {
      console.error("Recommendation Error:", err);
      setError(err.message || 'Failed to fetch recommendations. Please try again.');
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
          
          {(recommendedIds || error) && !isLoading && (
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
            <div className="recommendation-panel">
              <div 
                className="reasoning-card glassmorphic" 
                style={{ height: '100px', animation: 'pulse 2s infinite ease-in-out' }}
              ></div>
              <div className="results-section">
                <h3 className="results-title">Gemini is finding your matches...</h3>
                <div className="product-grid">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              </div>
            </div>
          ) : (
            <RecommendationPanel
              recommendedIds={recommendedIds}
              reasoning={reasoning}
              allProducts={products}
              error={error}
            />
          )}

          {!isLoading && !recommendedIds && !error && (
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
