import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Replace with your actual backend URL if different
        const response = await axios.get('http://localhost:5000/images');
        setImages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <p>Loading your gallery...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Photo Gallery</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px'
      }}>
        {images.length > 0 ? (
          images.map((img) => (
            <div key={img._id} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
              <img 
                src={img.url} 
                alt={img.name} 
                style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
              />
              <div style={{ padding: '8px', fontSize: '14px', textAlign: 'center' }}>
                {img.name}
              </div>
            </div>
          ))
        ) : (
          <p>No images found in the database.</p>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
