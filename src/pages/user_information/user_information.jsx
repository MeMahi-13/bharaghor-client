// @flow strict
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function User_Information() {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    localStorage.setItem("userInfoCompleted", "true");
    navigate("/post"); 
  };

  return (
    <div className="mx-auto max-w-6xl py-5">
      <h2 className="font-semibold text-lg text-center">USER INFORMATION</h2>

      <form style={styles.container} onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <label>About You</label>
        <textarea
          name="bio"
          placeholder="Short bio"
          value={formData.bio}
          onChange={handleChange}
          style={styles.textarea}
          required
        />

        <button type="submit" style={styles.button}>
          Continue
        </button>
      </form>
    </div>
  );
}

export default User_Information;

const styles = {
  container: {
    maxWidth: "100%",
    margin: "auto",
    padding: "20px",
    
   
    marginTop:"10px",
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
    border:"1px solid #0988E3",
    borderRadius:"6px",
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
 

};