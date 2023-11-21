import React, { useState } from 'react';

function ImageUploader() {
  const [imageURL, setImageURL] = useState('');

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    try {
      // Simulate image upload with a delay (replace with actual upload logic)
      const result = await simulateImageUpload(file);

      // Log the result to the console
      console.log('Image upload result:', result);

      // Set the obtained image URL to display
      setImageURL(result.imageUrl);

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // Simulate image upload (replace this with actual backend logic)
  const simulateImageUpload = (file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const imageUrl = URL.createObjectURL(file);
        resolve({ imageUrl });
      }, 1000); // Simulating a 1-second delay for the upload
    });
  };

  return (
    <div>
      <label htmlFor="imageUpload" className="bg-blue-500 text-white p-2 rounded cursor-pointer">
        Select Image
      </label>
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      {imageURL && (
        <div>
          <p>Selected Image:</p>
          <img src={imageURL} alt="Selected" style={{ maxWidth: '100%', height: 'auto' }} />
          <div>{imageURL}</div>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;