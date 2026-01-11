// @flow strict
import React, { useState } from "react";

import SwiperSlider from '../../Components/SwiperSlider';

function Post() {
  const [images, setImages] = useState([null, null, null, null]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  // Handle image upload
  const handleImageChange = (index, file) => {
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);
  };

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
      <SwiperSlider />
      <form style={styles.container} onSubmit={handleSubmit}>

        <div style={styles.imageGrid}>
          {images.map((img, index) => (
            <div key={index} style={styles.imageBox}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageChange(index, e.target.files[0])
                }
              />
              {img && (
                <img
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  style={styles.preview}
                />
              )}
            </div>
          ))}
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
          </div>
          {/* Property features */}
          <div style={styles.flexItem} >
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
                  <option value=""> Heating</option>
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
                  <option value="">Heating</option>
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
                  <option value="">Internet</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="office">Office</option>
                </select>
              </div>

              <div style={styles.flexItem}>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={styles.input}
                  required
                >
                  <option value="">Bedroom</option>
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
                  <option value="Attatched Bath">Common Bath</option>
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
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={styles.input}
                  required
                >
                  <option value="">Air Conditionar</option>
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
                  <option value="">Laundry</option>
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
                  <option value="">Pets</option>
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
                  <option value="">Internet</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="office">Office</option>
                </select>
              </div>

            </div>
          </div>


          <div style={styles.flexItem}>
            <h2>House Details & Features</h2>

          </div>

          <div style={styles.flexItem}>
            <h2>Rental Details</h2>

          </div>

          <div style={styles.flexItem}>
            <h2>Property Features</h2>

          </div>

          <div style={styles.flexItem}>
            <h2>Utilities and Amenities</h2>

          </div>

        </div>


        <button type="submit" style={styles.button}>
          Submit
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
  preview: {
    width: "100%",
    height: "100px",
    objectFit: "cover",
    marginTop: "8px",
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

};
