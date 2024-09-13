import React, { useState } from 'react';
import axios from 'axios';

interface CandidateCardProps {
  name: string;
  skills: string[];
}

const GEMINI_API_KEY = 'AIzaSyDQywvMEaSydwKIe2ZbVKmo3LAY9mYsqdU'; 
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

const CandidateCard: React.FC<CandidateCardProps> = ({ name, skills }) => {
  const [iceBreakingQuestion, setIceBreakingQuestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateIceBreakingQuestion = async () => {
    setIsLoading(true);
    try {
      const prompt = `Generate an ice breaking interview question for a candidate named ${name} with the following skills: ${skills.join(', ')}. The question should be engaging and related to their skills.`;
      
      const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        contents: [{ parts: [{ text: prompt }] }]
      });
      
      const question = response.data.candidates[0].content.parts[0].text;
      setIceBreakingQuestion(question);
    } catch (error) {
      console.error('Error generating ice breaking question:', error);
      setIceBreakingQuestion("Sorry, I couldn't generate a question at this time.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-0.5 rounded-lg shadow-lg mb-8 mx-auto w-full max-w-5xl">
      <div className="bg-gray-900 p-6 rounded-lg ">
        <h2 className="text-3xl font-bold text-white mb-4 ">{name}</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, index) => (
            <div key={index} className="bg-gray-800 rounded-full px-3 py-1">
              <span className="text-pink-300 text-sm">{skill}</span>
            </div>
          ))}
        </div>
        
        {!iceBreakingQuestion && !isLoading && (
          <button
            onClick={generateIceBreakingQuestion}
            className="mt-4 bg-gradient-to-r from-pink-400 to-purple-600 text-white rounded-full px-4 py-2 hover:from-purple-600 hover:to-pink-400 transition-colors"
          >
            Ask Ice Breaking Question
          </button>
        )}
        
        {isLoading && (
          <p className="mt-4 text-purple-300">Generating question...</p>
        )}
        
        {iceBreakingQuestion && (
          <div className="mt-4 bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-purple-300 mb-2">Ice Breaking Question:</h3>
            <p className="text-white">{iceBreakingQuestion}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateCard;