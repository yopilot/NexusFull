import React, { useState } from 'react';
import axios from 'axios';

interface FacultyData {
  Name: string;
  "Employee ID": string;
  "Areas of Specialization": string;
  "Similarity Score": string;
}

interface ResumeData {
  "Resume ID": number;
  Name: string;
  Skills: string;
  "Top Faculty": FacultyData[];
}

interface MultiUploadResultsProps {
  results: ResumeData[];
}

const GEMINI_API_KEY = 'AIzaSyDQywvMEaSydwKIe2ZbVKmo3LAY9mYsqdU'; 
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

const MultiUploadResults: React.FC<MultiUploadResultsProps> = ({ results }) => {
  const [iceBreakingQuestions, setIceBreakingQuestions] = useState<{[key: number]: string}>({});
  const [loadingStates, setLoadingStates] = useState<{[key: number]: boolean}>({});

  const generateIceBreakingQuestion = async (resumeId: number, name: string, skills: string[]) => {
    setLoadingStates(prev => ({ ...prev, [resumeId]: true }));
    try {
      const prompt = `Generate an ice breaking interview question for a candidate named ${name} with the following skills: ${skills.join(', ')}. The question should be engaging and related to their skills.`;
      
      const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        contents: [{ parts: [{ text: prompt }] }]
      });
      
      const question = response.data.candidates[0].content.parts[0].text;
      setIceBreakingQuestions(prev => ({ ...prev, [resumeId]: question }));
    } catch (error) {
      console.error('Error generating ice breaking question:', error);
      setIceBreakingQuestions(prev => ({ ...prev, [resumeId]: "Sorry, I couldn't generate a question at this time." }));
    } finally {
      setLoadingStates(prev => ({ ...prev, [resumeId]: false }));
    }
  };

  return (
    <div className="w-full mt-8 space-y-8">
      {results.map((resume) => (
        <div key={resume["Resume ID"]} className="bg-gradient-to-br from-pink-500 to-purple-600 p-0.5 rounded-lg shadow-lg">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">
              {resume.Name}
            </h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">Skills:</h3>
              <div className="flex flex-wrap gap-2">
                {resume.Skills.split(', ').slice(0, 6).map((skill, index) => (
                  <span key={index} className="bg-gray-800 text-pink-300 px-2 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">Top Faculty Matches:</h3>
              {resume["Top Faculty"].map((faculty, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg mb-2">
                  <p className="font-semibold text-white">{faculty.Name}</p>
                  <p className="text-sm text-gray-400">Employee ID: {faculty["Employee ID"]}</p>
                  <p className="text-sm text-gray-400">Specialization: {faculty["Areas of Specialization"]}</p>
                  <p className="text-sm text-pink-300">Similarity Score: {faculty["Similarity Score"]}</p>
                </div>
              ))}
            </div>
            
            {!iceBreakingQuestions[resume["Resume ID"]] && !loadingStates[resume["Resume ID"]] && (
              <button
                onClick={() => generateIceBreakingQuestion(resume["Resume ID"], resume.Name, resume.Skills.split(', '))}
                className="mt-4 bg-gradient-to-r from-pink-400 to-purple-600 text-white rounded-full px-4 py-2 hover:from-purple-600 hover:to-pink-400 transition-colors"
              >
                Ask Ice Breaking Question
              </button>
            )}
            
            {loadingStates[resume["Resume ID"]] && (
              <p className="mt-4 text-purple-300">Generating question...</p>
            )}
            
            {iceBreakingQuestions[resume["Resume ID"]] && (
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-300 mb-2">Ice Breaking Question:</h3>
                <p className="text-white">{iceBreakingQuestions[resume["Resume ID"]]}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultiUploadResults;