import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function UserInfo() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const API_URL = "https://yessghor-server.vercel.app";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    nidFront: "",
    nidBack: "",
    nidStatus: "",
  });

  const [files, setFiles] = useState({ nidFront: null, nidBack: null });
  const [previews, setPreviews] = useState({ nidFront: null, nidBack: null });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // -------------------
  // FETCH USER
  // -------------------
  useEffect(() => {
    if (!user?._id) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/users/${user._id}`, {
          credentials:"include"
        });
        const data = await res.json();

        if (res.ok && data) {
          setFormData({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            nidFront: data.nidFront || "",
            nidBack: data.nidBack || "",
            nidStatus: data.nidStatus || "",
          });
        }
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    };

    fetchUser();
  }, [user]);

  // -------------------
  // AUTO REDIRECT IF NID ALREADY ADDED
  // -------------------
  useEffect(() => {
    if (formData.nidFront && formData.nidBack) {
      navigate("/post", { replace: true });
    }
  }, [formData.nidFront, formData.nidBack, navigate]);

  const canReupload = formData.nidStatus === "rejected";

  // -------------------
  // FILE SELECT HANDLER
  // -------------------
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (!files?.[0]) return;

    setFiles((prev) => ({ ...prev, [name]: files[0] }));
    setPreviews((prev) => ({
      ...prev,
      [name]: URL.createObjectURL(files[0]),
    }));
  };

  // -------------------
  // SUBMIT NID
  // -------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.nidFront || !files.nidBack) {
      alert("Upload both NID images");
      return;
    }

    setLoading(true);
    setStatus("Uploading NID...");

    try {
      const formDataObj = new FormData();
      formDataObj.append("nidFront", files.nidFront);
      formDataObj.append("nidBack", files.nidBack);

      const res = await fetch(`${API_URL}/register/${user._id}`, {
        method: "PUT",
        body: formDataObj,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      setStatus("NID submitted. Redirecting...");
    } catch (err) {
      console.error(err);
      setStatus("Failed to submit NID");
    } finally {
      setLoading(false);
    }
  };

  // -------------------
  // RENDER
  // -------------------
  return (
    <div className="mx-auto max-w-6xl py-6 px-4">
      <h2 className="text-2xl font-semibold text-center mb-6 uppercase">
        User Information
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow"
      >
        {/* Name */}
        <label className="block mb-2 font-semibold">Full Name</label>
        <input
          value={formData.name}
          readOnly
          className="w-full mb-4 px-4 py-3 rounded-xl bg-gray-100"
        />

        {/* Email */}
        <label className="block mb-2 font-semibold">Email</label>
        <input
          value={formData.email}
          readOnly
          className="w-full mb-4 px-4 py-3 rounded-xl bg-gray-100"
        />

        {/* Phone */}
        <label className="block mb-2 font-semibold">Phone</label>
        <input
          value={formData.phone}
          readOnly
          className="w-full mb-4 px-4 py-3 rounded-xl bg-gray-100"
        />

        {/* NID UPLOAD (ONLY WHEN NOT ADDED OR REJECTED) */}
        <p className="mb-4 text-sm text-gray-500">
          Upload clear NID front & back images
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {["nidFront", "nidBack"].map((side) => (
            <label
              key={side}
              className="h-32 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer"
            >
              {previews[side] ? (
                <img
                  src={previews[side]}
                  className="h-full w-full object-cover rounded-xl"
                />
              ) : (
                <span className="text-xs text-gray-400">
                  {side === "nidFront" ? "NID FRONT" : "NID BACK"}
                </span>
              )}
              <input
                type="file"
                name={side}
                accept="image/*"
                hidden
                onChange={handleImageChange}
                disabled={loading || (!canReupload && formData.nidStatus === "pending")}
              />
            </label>
          ))}
        </div>

        <button
          disabled={loading}
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold disabled:opacity-50"
        >
          {loading ? "Submitting..." : "SUBMIT NID"}
        </button>

        {status && (
          <p className="mt-4 text-center text-sm font-semibold text-blue-600">
            {status}
          </p>
        )}
      </form>
    </div>
  );
}

export default UserInfo;
