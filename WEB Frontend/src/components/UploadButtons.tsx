import React from 'react';

interface UploadButtonsProps {
  onSingleFileUpload: (file: File) => void;
  onMultiFileUpload: (files: FileList) => void;
}

const UploadButtons: React.FC<UploadButtonsProps> = ({ onSingleFileUpload, onMultiFileUpload }) => {
  const handleSingleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSingleFileUpload(file);
    }
  };

  const handleMultiFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onMultiFileUpload(files);
    }
  };

  return (
    <div className="flex space-x-4">
      <label className="bg-gradient-to-r from-pink-300 to-purple-500 text-white px-6 py-2 rounded-full
                        hover:from-purple-500 hover:to-pink-300 transition-all duration-300 cursor-pointer flex items-center">
        UPLOAD
        <span className="ml-2">+</span>
        <input type="file" className="hidden" onChange={handleSingleFileChange} accept=".pdf" />
      </label>
      <label className="bg-gradient-to-r from-purple-500 to-pink-300 text-white px-6 py-2 rounded-full
                        hover:from-pink-300 hover:to-purple-500 transition-all duration-300 cursor-pointer flex items-center">
        MULTIUPLOAD
        <span className="ml-2">+</span>
        <input type="file" className="hidden" onChange={handleMultiFileChange} accept=".pdf" multiple />
      </label>
    </div>
  );
};

export default UploadButtons;