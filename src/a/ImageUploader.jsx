import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleUpload = async () => {
    if (!file) return alert("Select a file");

    const formData = new FormData();
    formData.append('image', file); // Must match upload.single("image") in backend

    try {
      setStatus('Uploading...');
      const res = await axios.post('http://localhost:5000/upload', formData);
      
      setStatus('Success! Saved to MongoDB');
      console.log("Saved Image URL:", res.data.imageUrl);
      console.log("Database ID:", res.data.insertedId);
    } catch (err) {
      setStatus('Upload failed');
      console.error(err);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload to MongoDB</button>
      <p>{status}</p>
    </div>
  );
};
export default ImageUploader;