// @flow strict
import React, { useState } from "react";

function Post() {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    houseNo: "",
    category: "",
    rent: "",
    deposit: "",
    leaseTerm: "",
    availableDate: "",
    description: "",
    floor: "",
    furnished: "",
    parking: "",
    bedroom: "",
    commonBath: "",
    balcony: "",
    water: "",
    electricity: "",
    gas: "",
    security: ""
  });
  
  

  // Handle image upload (max 4)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files].slice(0, 4));
  };

  // Handle text/select change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit form
const handleSubmit = async (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user?._id) {
    alert("User not logged in");
    return;
  }

  const data = new FormData();

  // add form fields
  Object.keys(formData).forEach(key => {
    data.append(key, formData[key]);
  });

  // add images
  images.forEach(img => data.append("images", img));

  // 🔥 ADD USER ID
  data.append("userId", user._id);

  try {
    const res = await fetch("https://yessghor-server.vercel.app/posts", {
      method: "POST",
      body: data
    });

    const result = await res.json();
    alert("Post submitted for admin approval");
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};


  return (
    <div className="mx-auto max-w-6xl py-10">
      <form onSubmit={handleSubmit} style={styles.container}>

        {/* IMAGE UPLOAD */}
        <div style={styles.grid}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={styles.slot}>
              {images[i] ? (
                <img
                  src={URL.createObjectURL(images[i])}
                  alt="preview"
                  style={styles.preview}
                />
              ) : (
                <label style={styles.placeholder}>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                  <span style={styles.plus}>+</span>
                  Upload
                </label>
              )}
            </div>
          ))}
        </div>

    <div className="flex gap-10 py-5">
          {/* CARD DETAILS */}
        <section style={styles.section}>
          <h3>Card Details</h3>
          <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} style={styles.input} />
          <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} style={styles.input} />
          <input name="houseNo" placeholder="House No" value={formData.houseNo} onChange={handleChange} style={styles.input} />

          <select name="category" value={formData.category} onChange={handleChange} style={styles.input}>
            <option value="">House Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="office">Office</option>
            <option value="hostel">Hostel</option>
            <option value="duplex">Duplex</option>
            <option value="studio">Studio Apartment</option>
            <option value="commercial">Commercial Space</option>
            <option value="showroom">Showroom</option>
            <option value="shop">Shop</option>
          </select>
        </section>

        {/* RENTAL DETAILS */}
        <section style={styles.section}>
          <h3>Rental Details</h3>
          <input name="rent" placeholder="Monthly Rent" value={formData.rent} onChange={handleChange} style={styles.input} />
          <input name="deposit" placeholder="Deposit" value={formData.deposit} onChange={handleChange} style={styles.input} />
          <input name="leaseTerm" placeholder="Lease Term" value={formData.leaseTerm} onChange={handleChange} style={styles.input} />
          <input name="availableDate" placeholder="Available Date" value={formData.availableDate} onChange={handleChange} style={styles.input} />
        </section>

    </div>
       <div className="flex gap-10 py-5">
         {/* HOUSE FEATURES */}
        <section className="w-1/2" style={styles.section}>
          <h3>House Details</h3>
          <input name="floor" placeholder="Floor" value={formData.floor} onChange={handleChange} style={styles.input} />
          <input name="bedroom" placeholder="Bedroom" value={formData.bedroom} onChange={handleChange} style={styles.input} />
          <input name="commonBath" placeholder="Common Bath" value={formData.commonBath} onChange={handleChange} style={styles.input} />
          <input name="balcony" placeholder="Balcony" value={formData.balcony} onChange={handleChange} style={styles.input} />

          <select name="furnished" value={formData.furnished} onChange={handleChange} style={styles.input}>
            <option value="">Furnished</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <select name="parking" value={formData.parking} onChange={handleChange} style={styles.input}>
            <option value="">Parking</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </section>

        {/* UTILITIES */}
        <section style={styles.section}>
          <h3>Utilities</h3>
          {["water", "electricity", "gas", "security"].map(item => (
            <select key={item} name={item} value={formData[item]} onChange={handleChange} style={styles.input}>
              <option value="">{item.toUpperCase()}</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          ))}
        </section>

       </div>
        {/* DESCRIPTION
        <section style={styles.section}>
          <textarea
            name="description"
            placeholder="Property description..."
            value={formData.description}
            onChange={handleChange}
            style={styles.textarea}
          />
        </section> */}

        <button type="submit" style={styles.button}>POST</button>
      </form>
    </div>
  );
}

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
    paddingTop: "15px",
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
