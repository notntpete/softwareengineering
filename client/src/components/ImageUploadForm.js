import React, { useState } from 'react';

const ImageUploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('File uploaded successfully:', data.filePath);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
    
      <input type="file" onChange={handleFileChange}/>
      <div> <button className = "delay-150 mt-[100px] bg-[#D9D9D9] w-[75px] rounded-tr-sm rounded-br-sm border-[1.5px] border-black hover:bg-[#F3F3F3] place-content-end" onClick={handleUpload}>Upload</button></div>
      
    </div>
  );
};

export default ImageUploadForm;