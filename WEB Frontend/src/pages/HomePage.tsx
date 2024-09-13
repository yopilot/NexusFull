import React, { useState } from 'react';
import UploadButtons from '../components/UploadButtons';
import CandidateCard from '../components/CandidateCard';
import FacultyCard from '../components/FacultyCard';
import MultiUploadResults from '../components/MultiUploadResults';
import axios from 'axios';

interface FacultyData {
  Name: string;
  "Employee ID": string;
  "Areas of Specialization": string;
  "Similarity Score": string;
}

interface SingleUploadResponse {
  Name: string;
  Skills: string;
  "Top Faculty": FacultyData[];
}

interface ResumeData {
  "Resume ID": number;
  Name: string;
  Skills: string;
  "Top Faculty": FacultyData[];
}

interface MultiUploadResponse {
  Resumes: ResumeData[];
}

const HomePage: React.FC = () => {
  const [singleUploadData, setSingleUploadData] = useState<SingleUploadResponse | null>(null);
  const [multiUploadData, setMultiUploadData] = useState<MultiUploadResponse | null>(null);

  const handleSingleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post<SingleUploadResponse>(
        'http://127.0.0.1:5000/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Single file upload response:', response.data);
      setSingleUploadData(response.data);
      setMultiUploadData(null);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleMultiFileUpload = async (files: FileList) => {
    const formData = new FormData();
    Array.from(files).forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    try {
      const response = await axios.post<MultiUploadResponse>(
        'http://127.0.0.1:5000/multiupload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Multi-file upload response:', response.data);
      setMultiUploadData(response.data);
      setSingleUploadData(null); // Clear single upload data when multi-upload is done
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };
  return (
    
    <div className="flex-1 flex flex-col items-center h-full bg-black text-white p-8 overflow-y-auto">
      <div className="w-full max-w-2xl flex flex-col items-center">
        
        <h1 className="text-5xl font-bold text-pink-300 mb-16">Nex.us</h1>
        <p className="text-purple-300 text-lg mb-8">This is a section to upload the resume.</p>
        <UploadButtons 
          onSingleFileUpload={handleSingleFileUpload} 
          onMultiFileUpload={handleMultiFileUpload} 
        />
        
        {singleUploadData && (
          <div className="mt-12 w-full">
            <CandidateCard 
              name={singleUploadData.Name}
              skills={singleUploadData.Skills.split(', ').slice(0, 6)}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {singleUploadData["Top Faculty"].map((faculty, index) => (
                <FacultyCard
                  key={index}
                  name={faculty.Name}
                  employeeId={faculty["Employee ID"]}
                  specialization={faculty["Areas of Specialization"]}
                  similarityScore={faculty["Similarity Score"]}
                />
              ))}
              
            </div>
            
          </div>
        )}
        
        {multiUploadData && (
          <div className="mt-12 w-full">
            <MultiUploadResults results={multiUploadData.Resumes} />
          </div>
        )}
      </div>
      
    </div>
  );
};
export default HomePage;