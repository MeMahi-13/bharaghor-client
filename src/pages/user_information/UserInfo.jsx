import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { AuthContext } from "../../context/AuthContext"; // if using context

// Assets
import person_icon from "../../assets/person.png";
import camera_icon from "../../assets/camera.png";
import email_icon from "../../assets/email.png";
import telephone_icon from "../../assets/telephone.png";

function UserInfo() {
  const { user } = useAuth(); // user from login
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [files, setFiles] = useState({ nidFront: null, nidBack: null });
  const [previews, setPreviews] = useState({ nidFront: null, nidBack: null });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch user info from backend when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?._id) return;

      try {
        const res = await fetch(`http://localhost:5000/users/${user._id}`);
        const data = await res.json();

        if (res.ok) {
          setFormData({
            name: data.user.name || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
          });
        } else {
          console.error("Failed to fetch user data:", data.message);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFiles((prev) => ({ ...prev, [name]: files[0] }));
      setPreviews((prev) => ({ ...prev, [name]: URL.createObjectURL(files[0]) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) return alert("User not authenticated");
    if (!files.nidFront || !files.nidBack) return alert("Please upload both NID images");

    try {
      setLoading(true);
      setStatus("Submitting...");

      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("nidFront", files.nidFront);
      data.append("nidBack", files.nidBack);

      const res = await fetch(`http://localhost:5000/register/${user._id}`, {
        method: "PUT",
        body: data,
      });

      const result = await res.json();

      if (res.ok && result.success) {
        alert("Information submitted successfully!");
        navigate("/post");
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      setStatus(err.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl py-6 px-4">
      <h2 className="text-2xl font-semibold text-center mb-6 uppercase">User Information</h2>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow border">
        {/* Name */}
        <label className="block mb-2 font-semibold text-gray-700">Full Name</label>
        <div className="relative mb-4">
          <img src={person_icon} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-70" alt="" />
          <input
            type="text"
            name="name"
            className="w-full pl-10 px-4 py-3 border rounded-xl"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <div className="relative mb-4">
          <img src={email_icon} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-70" alt="" />
          <input
            type="email"
            name="email"
            className="w-full pl-10 px-4 py-3 border rounded-xl"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <label className="block mb-2 font-semibold text-gray-700">Phone</label>
        <div className="relative mb-4">
          <img src={telephone_icon} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-70" alt="" />
          <input
            type="tel"
            name="phone"
            className="w-full pl-10 px-4 py-3 border rounded-xl"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* NID Upload */}
        <label className="block mt-6 mb-1 font-semibold text-gray-700">NID Photos</label>
        <p className="mb-4 text-xs text-gray-500">Upload clear NID front & back images</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {["nidFront", "nidBack"].map((side) => (
            <label
              key={side}
              className="relative flex items-center justify-center h-32 border-2 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              {previews[side] ? (
                <img src={previews[side]} className="h-full w-full object-cover rounded-xl" alt="" />
              ) : (
                <div className="text-center">
                  <img src={camera_icon} className="w-6 mx-auto opacity-40 mb-1" alt="" />
                  <span className="text-[10px] uppercase text-gray-400 font-bold">{side === "nidFront" ? "NID FRONT" : "NID BACK"}</span>
                </div>
              )}
              <input type="file" name={side} accept="image/*" className="hidden" onChange={handleImageChange} required />
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

        {status && <p className="mt-4 text-center text-sm font-medium text-blue-600">{status}</p>}
      </form>
    </div>
  );
}

export default UserInfo;
