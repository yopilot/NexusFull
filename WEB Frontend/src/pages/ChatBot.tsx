import React, { useState } from 'react';
import axios from 'axios';

const GEMINI_API_KEY = ''; 
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

const Chatbot: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{text: string, sender: 'user' | 'bot'}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { text: input, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        contents: [{ parts: [{ text: input }] }]
      });
      const reply = response.data.candidates[0].content.parts[0].text;
      const botMessage = { text: reply, sender: 'bot' as const };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      const errorMessage = { text: "Sorry, I couldn't process your request. Please try again.", sender: 'bot' as const };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black text-white">
        
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-purple-600' : 'bg-gray-700'}`}>
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="bg-gradient-to-r from-pink-400 to-purple-600 text-white rounded-full px-4 py-2 hover:from-purple-600 hover:to-pink-400 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
