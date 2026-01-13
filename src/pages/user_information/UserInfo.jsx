import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

// Assets
import person_icon from "../../assets/person.png";
import camera_icon from "../../assets/camera.png";
import email_icon from "../../assets/email.png";
import telephone_icon from "../../assets/telephone.png";

function UserInfo() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
  });

  const [files, setFiles] = useState({
    nidFront: null,
    nidBack: null,
  });

  const [previews, setPreviews] = useState({
    nidFront: null,
    nidBack: null,
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle text input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image input
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFiles((prev) => ({ ...prev, [name]: file }));
      setPreviews((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(file),
      }));
    }
  };

  // Submit form
  // Submit form using native fetch
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.uid) return alert("User not authenticated");
    if (!files.nidFront || !files.nidBack) {
      return alert("Please upload both NID front and back images.");
    }

    try {
      setLoading(true);
      setStatus("Submitting to database...");

      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      
      // These keys must match the names in your backend upload.fields
      data.append("nidFront", files.nidFront); 
      data.append("nidBack", files.nidBack);

      const response = await fetch(`http://localhost:5000/register/${user.uid}`, {
        method: 'PUT',
        body: data,
        // No headers needed for FormData; fetch handles it automatically
      });

      const result = await response.json();

      if (response.ok && result.success) {
        localStorage.setItem("userInfoCompleted", "true");
        alert("Registration & Image Save Successful!");
        navigate("/post");
      } else {
        throw new Error(result.message || "Submission failed.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setStatus(error.message || "Failed to submit information.");
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="mx-auto max-w-6xl  py-6 px-4">
      <h2 className="font-semibold text-2xl text-center mb-6 uppercase">
        User Information
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow border-none"
      >
        {/* Name */}
        <label className="font-semibold text-gray-700 block mb-2">
          Full Name
        </label>
        <div className="relative mb-4">
          <img
            src={person_icon}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-70"
            alt=""
          />
          <input
            name="name"
            type="text"
            className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <label className="font-semibold text-gray-700 block mb-2">
          Gmail
        </label>
        <div className="relative mb-4">
          <img
            src={email_icon}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-70"
            alt=""
          />
          <input
            name="email"
            type="email"
            className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <label className="font-semibold text-gray-700 block mb-2">
          Phone Number
        </label>
        <div className="relative mb-4">
          <img
            src={telephone_icon}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-70"
            alt=""
          />
          <input
            name="phone"
            placeholder="Enter your phone number"
            type="tel"
            className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* NID Upload */}
        <label className="font-semibold text-gray-700 block mt-6 mb-1">
          NID Photos
        </label>
        <p className="text-xs text-gray-500 mb-4">
          Upload clear NID front & back images
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {["nidFront", "nidBack"].map((side) => (
            <label
              key={side}
              className="relative flex items-center justify-center h-32 border-2 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              {previews[side] ? (
                <img
                  src={previews[side]}
                  className="h-full w-full object-cover rounded-xl"
                  alt=""
                />
              ) : (
                <div className="text-center">
                  <img
                    src={camera_icon}
                    className="w-6 mx-auto opacity-40 mb-1"
                    alt=""
                  />
                  <span className="text-[10px] uppercase text-gray-400 font-bold">
                    {side === "nidFront" ? "NID FRONT" : "NID BACK"}
                  </span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                name={side}
                className="hidden"
                onChange={handleImageChange}
                required
              />
            </label>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "SUBMIT INFORMATION"}
        </button>

        {status && (
          <p className="text-center mt-4 text-sm font-medium text-blue-600">
            {status}
          </p>
        )}
      </form>
    </div>
  );
}

export default UserInfo;
