// @flow strict
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import person_icon from "../../assets/person.png";
import camera_icon from "../../assets/camera.png";
import email_icon from "../../assets/email.png";
import telephone_icon from "../../assets/telephone.png";
function User_Information() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    nidFront: null,
    nidBack: null,
  });

  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({
        ...formData,
        [name]: URL.createObjectURL(files[0]),
      });
    }
  };

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
        <label style={styles.inputLebel} className="mb-2 block">Name</label>
        <div className="relative">
          <img src={person_icon} className="absolute left-3 top-1/2 -translate-y-1/2 w-5" />
          <input
            type="name"
            name="name"
            placeholder="Enter your name"
            className="w-full pl-10 px-4 py-3  border rounded-xl"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <label style={styles.inputLebel} className="mb-2 mt-2 block">Gmail</label>
        <div className="relative">
          <img src={email_icon} className="absolute left-3 top-1/2 -translate-y-1/2 w-5" />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full pl-10 px-4 py-3 border rounded-xl"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <label style={styles.inputLebel} className="mb-2 mt-2 block">Phone Number</label>
        <div className="relative">
          <img src={telephone_icon} className="absolute left-3 top-1/2 -translate-y-1/2 w-5" />
          <input
            type="phone"
            name="phone"
            placeholder="Enter your phone"
            className="w-full pl-10 px-4 py-3 border rounded-xl"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <label style={styles.inputLebel} className="mb-2 mt-2 block">NID Photo </label>
        <p>Please upload real and valid information</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

          {/* NID Front */}
          <label className="relative flex items-center justify-center h-36 border-2 border-dashed rounded-xl cursor-pointer">
            {formData.nidFront ? (
              <img src={formData.nidFront} className="h-full w-full object-cover rounded-xl" />
            ) : (
              <>
                <img src={camera_icon} className="w-8 opacity-60" />
                <span className="absolute bottom-2 text-xs text-gray-500">NID Front</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              name="nidFront"
              className="hidden"
              onChange={handleImageChange}
              required
            />
          </label>

          {/* NID Back */}
          <label className="relative flex items-center justify-center h-36 border-2 border-dashed rounded-xl cursor-pointer">
            {formData.nidBack ? (
              <img src={formData.nidBack} className="h-full w-full object-cover rounded-xl" />
            ) : (
              <>
                <img src={camera_icon} className="w-8 opacity-60" />
                <span className="absolute bottom-2 text-xs text-gray-500">NID Back</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              name="nidBack"
              className="hidden"
              onChange={handleImageChange}
              required
            />
          </label>

        </div>


        <button type="submit" style={styles.button}>
          Submit
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


    marginTop: "10px",
  },



  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #0988E3",
    borderRadius: "6px",
  },

  inputLebel: {
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "120%",
    color: "#101828",
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