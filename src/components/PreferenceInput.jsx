import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

export default function PreferenceInput({ onSubmit, isLoading }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSubmit(input.trim());
    setInput('');
  };

  return (
    <div className="preference-input-container glassmorphic">
      <div className="input-title-bar">
        <Sparkles className="sparkles-icon animated" size={18} />
        <span>Describe your ideal product or requirements...</span>
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Example: I need a lightweight laptop for college with great battery life, and my budget is under $1000..."
          rows={3}
          disabled={isLoading}
          className="chat-textarea"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="btn btn-primary send-btn"
        >
          {isLoading ? (
            <div className="loader-small"></div>
          ) : (
            <>
              <span>Find Recommendations</span>
              <Send size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
