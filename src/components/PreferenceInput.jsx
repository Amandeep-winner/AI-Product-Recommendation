/* 
  PreferenceInput Component 
  Captures user requirements and API key to initiate recommendation fetch
*/
import React, { useState } from 'react';
import { Sparkles, Key, Loader2 } from 'lucide-react';

const PreferenceInput = ({ onSubmit, isLoading }) => {
  const [userInput, setUserInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleTextChange = (e) => {
    const text = e.target.value;
    if (text.length <= 300) {
      setUserInput(text);
      if (validationError && text.trim()) setValidationError('');
    }
  };

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
    if (validationError && e.target.value.trim()) setValidationError('');
  };

  const hasEnvKey = !!import.meta.env.VITE_GEMINI_API_KEY;

  const handleSubmit = () => {
    if (!hasEnvKey && !apiKey.trim()) {
      setValidationError("Please enter your Gemini API key");
      return;
    }
    if (!userInput.trim()) {
      setValidationError("Please describe what you're looking for");
      return;
    }

    setValidationError('');
    onSubmit(userInput, hasEnvKey ? undefined : apiKey);
  };

  return (
    <div className="glassmorphic preference-input-container">
      <div className="input-title-bar">
        <Sparkles size={18} className={`sparkles-icon ${isLoading ? 'animated' : ''}`} />
        <span>Your Preferences</span>
      </div>

      <div className="chat-form">
        {/* API Key Input */}
        {!hasEnvKey && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label 
              style={{ 
                fontSize: '0.85rem', 
                color: 'var(--text-muted)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.4rem' 
              }}
            >
              <Key size={14} /> Gemini API Key
            </label>
            <input 
              type="password" 
              className="chat-textarea" 
              style={{ height: '42px', padding: '0 1rem' }}
              placeholder="Paste your key here..."
              value={apiKey}
              onChange={handleApiKeyChange}
            />
          </div>
        )}

        {/* Requirements Textarea */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label 
            style={{ 
              fontSize: '0.85rem', 
              color: 'var(--text-muted)'
            }}
          >
            What are you looking for?
          </label>
          <textarea
            className="chat-textarea"
            placeholder="e.g. I need a laptop for college under $1000..."
            rows={4}
            value={userInput}
            onChange={handleTextChange}
          />
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              fontSize: '0.75rem', 
              color: userInput.length >= 300 ? '#ef4444' : 'var(--text-muted)' 
            }}
          >
            {userInput.length}/300 characters
          </div>
        </div>

        {/* Validation Feedback */}
        {validationError && (
          <p style={{ color: '#f87171', fontSize: '0.85rem', margin: 0, fontWeight: '500' }}>
            {validationError}
          </p>
        )}

        <button 
          className="btn btn-primary" 
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="loader-small" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>Get Recommendations</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PreferenceInput;
