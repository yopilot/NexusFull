import React from 'react';

interface FacultyCardProps {
  name: string;
  employeeId: string;
  specialization: string;
  similarityScore: string;
}

const FacultyCard: React.FC<FacultyCardProps> = ({ name, employeeId, specialization, similarityScore }) => {
  const cleanName = (name: string) => name.split(' (')[0];

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-semibold text-white mb-4">{cleanName(name)}</h3>
      <div className="space-y-2">
        <p className="flex justify-between">
          <span className="text-gray-400">Employee ID:</span>
          <span className="text-purple-300">{employeeId}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-400">Specialization:</span>
          <span className="text-purple-300">{specialization}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-400">Similarity Score:</span>
          <span className="text-pink-300">{similarityScore}</span>
        </p>
      </div>
    </div>
  );
};

export default FacultyCard;