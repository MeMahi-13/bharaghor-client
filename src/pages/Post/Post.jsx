// @flow strict
import React, { useState,useEffect } from "react";

import SwiperSlider from '../../Components/SwiperSlider';

function Post() {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });
  
  const [previewUrls, setPreviewUrls] = useState([]); // preview URLs

  // Handle file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };
// Generate image previews whenever images change
  useEffect(() => {
    if (images.length === 0) return;

    const urls = images.map((img) => URL.createObjectURL(img));
    setPreviewUrls(urls);

    // Cleanup to prevent memory leaks
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  // Upload images using fetch
  const handleUpload = async () => {
    if (images.length === 0) return alert("No images selected!");

    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));
     try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      console.log("Upload successful:", data);
      alert("Images uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };

  // Handle image upload
 

  // Handle text & dropdown change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Images:", images);
    console.log("Form Data:", formData);
  };
  return (
    <div className="mx-auto max-w-6xl py-5">
      <h2 className="font-semibold text-2xl text-center mb-6 uppercase">
        Add Post
      </h2>
      <form style={styles.container} onSubmit={handleSubmit}>

       <div style={{ padding: "20px" }}>
      <h2></h2>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginBottom: "20px" }}
      />

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {previewUrls.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={`preview ${idx}`}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        ))}
      </div>
       <button
        onClick={handleUpload}
        style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
      >
        Upload Images
      </button>
    </div>



        <div style={styles.flexGrid}>
{/* Card details */}
          <div style={styles.flexItem}>
            <h2 className="font-semibold text-lg">Card Details</h2>
<div>
  <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Property Title"
              value={formData.title}
              onChange={handleChange}
              style={styles.input}
              required
            />
</div>
<div>
  <label>Location</label>
            <input
              type="text"
              name="title"
              placeholder="Property Title"
              value={formData.title}
              onChange={handleChange}
              style={styles.input}
              required
            />
</div>
<div>
  <label>House No</label>
            <input
              type="text"
              name="title"
              placeholder="Property Title"
              value={formData.title}
              onChange={handleChange}
              style={styles.input}
              required
            />
</div>
<div>
  <label>House Type</label>
             <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select Type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="office">Office</option>
            </select>
</div>
            
<div>
  <label>Montly Rent</label>
            <input
              type="text"
              name="title"
              placeholder="Property Title"
              value={formData.title}
              onChange={handleChange}
              style={styles.input}
              required
            />
</div>
            
          </div>
{/* Rental Details */}
          <div style={styles.flexItem}>
            <h2 className="font-semibold text-lg">Rental Details</h2>

           <div>
  <label>Monthly Rent</label>
            <input
              type="text"
              name="title"
              placeholder="Cost of renting the property"
              value={formData.title}
              onChange={handleChange}
              style={styles.input}
              required
            />
</div>
<div>
  <label>Security Deposit</label>
            <input
              type="text"
              name="title"
              placeholder="Amount required as a security deposit"
              value={formData.title}
              onChange={handleChange}
              style={styles.input}
              required
            />
</div>
<div>
  <label>Lease Term</label>
            <input
              type="text"
              name="title"
              placeholder="Amount required as a security deposit"
              value={formData.title}
              onChange={handleChange}
              style={styles.input}
              required
            />
</div>
<div>
  <label>Availability Date</label>
            <input
              type="text"
              name="title"
              placeholder="Date when the property is available for rent"
              value={formData.title}
              onChange={handleChange}
              style={styles.input}
              required
            />
</div>
{/* House Details & Features */}
         
          
          <h2>House Details & Features</h2>
          <input type="text" className="border w-full h-1/7" placeholder="A brief description for the listing.." />
         </div>
         
           
          {/* Property features */}
         
          <div style={styles.flexItem} >
            <h2 className="font-semibold text-lg">Property Features</h2>
           <div style={styles.flexGrid}>
            <div style={styles.flexItem}>
              <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Floor</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="office">Office</option>
            </select>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="Attatched Bath">Attatched Bath</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="office">Office</option>
            </select>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Furnished</option>
              <option value="apartment">Yes</option>
              <option value="house">No</option>
              
            </select>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Parking Spaces</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="office">Office</option>
            </select>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value=""> Bedroom</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="office">Office</option>
            </select>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Common Bath</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="office">Office</option>
            </select>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Balcony</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="office">Office</option>
            </select>
            </div>
           
              
           
           </div>
          </div>
          
{/* Utilities and Amenities */}
         <div style={styles.flexItem} >
            <h2 className="font-semibold text-lg">Utilities and Amenities</h2>
           <div style={styles.flexGrid}>
            <div style={styles.flexItem}>
              <select
              name="category"
              value={formData.water}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Water</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="Attatched Bath">Electricity</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="office">Office</option>
            </select>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Gas</option>
               <option value="">Water</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Security</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="office">Office</option>
            </select>
            
            </div>
           
              
           
           </div>
          </div>


        </div>
        <button type="submit" style={styles.button}>
          Post
        </button>
      </form>
    </div>
  );
};

export default Post;
const styles = {
  container: {
    maxWidth: "100%",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginTop: "10px",
  },
  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    marginBottom: "20px",
  },
  imageBox: {
    border: "1px dashed #ccc",
    padding: "10px",
    textAlign: "center",
  },
 
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #0988E3",
    borderRadius: "6px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    height: "100px",
    marginBottom: "15px",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#2563EB",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop:"12px",
  },
  flexGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px",
  },

  flexItem: {
    flex: "1 1 calc(50% - 20px)",
    border: "1px solid #e5e7eb",
    padding: "15px",
    borderRadius: "8px",
    background: "#fff",
  },
  
  uploadBox: {
    border: "2px dashed #ccc",
    padding: "16px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  hiddenInput: {
    display: "none",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "10px",
  },
  slot: {
    height: "90px",
    border: "1px dashed #ddd",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  placeholder: {
    textAlign: "center",
    color: "#999",
    fontSize: "12px",
    paddingTop:"15px",
  },
  plus: {
    fontSize: "24px",
    display: "block",
    lineHeight: "1",
  },
  preview: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    marginTop: "8px",
  },



};
