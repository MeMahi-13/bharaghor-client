import React, { useEffect, useState } from "react";
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
    name: "",
    email: "",
    phone: "",
    nidFront: "",
    nidBack: "",
    nidStatus: "",
  });

  const [files, setFiles] = useState({
    nidFront: null,
    nidBack: null,
  });

  const [previews, setPreviews] = useState({
    nidFront: null,
    nidBack: null,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const API_URL = "https://yessghor-server.vercel.app"; 

  /* ================= Fetch user info ================= */
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?._id) return;

      try {
        const res = await fetch(`${API_URL}/users/${user._id}`);
        const data = await res.json();

        if (res.ok && data.user) {
          setFormData({
            name: data.user.name || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            nidFront: data.user.nidFront || "",
            nidBack: data.user.nidBack || "",
            nidStatus: data.user.nidStatus || "",
          });
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };

    fetchUserData();
  }, [user]);

  const hasNID = formData.nidFront && formData.nidBack;
  const canReupload = formData.nidStatus === "rejected";

  /* ================= Handle image upload ================= */
  const handleImageChange = (e) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      setFiles((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      setPreviews((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(files[0]),
      }));
    }
  };

  /* ================= Submit NID ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files.nidFront || !files.nidBack) {
      return alert("Please upload both NID front and back images");
    }

    try {
      setLoading(true);
      setStatus("Submitting NID...");

      const submitData = new FormData();
      submitData.append("nidFront", files.nidFront);
      submitData.append("nidBack", files.nidBack);

      const res = await fetch(`${API_URL}/register/${user._id}`, {
        method: "PUT",
        body: submitData,
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus("NID submitted. Waiting for admin approval.");
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error(error);
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl py-6 px-4">
      <h2 className="text-2xl font-semibold text-center mb-6 uppercase">
        User Information
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow border-none"
      >
        {/* ================= Name ================= */}
        <label className="block mb-2 font-semibold text-gray-700">
          Full Name
        </label>
        <div className="relative mb-4">
          <img
            src={person_icon}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-70"
            alt=""
          />
          <input
            type="text"
            value={formData.name}
            readOnly
            className="w-full pl-10 px-4 py-3 border rounded-xl bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* ================= Email ================= */}
        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <div className="relative mb-4">
          <img
            src={email_icon}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-70"
            alt=""
          />
          <input
            type="email"
            value={formData.email}
            readOnly
            className="w-full pl-10 px-4 py-3 border rounded-xl bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* ================= Phone ================= */}
        <label className="block mb-2 font-semibold text-gray-700">Phone</label>
        <div className="relative mb-4">
          <img
            src={telephone_icon}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-70"
            alt=""
          />
          <input
            type="tel"
            value={formData.phone}
            readOnly
            className="w-full pl-10 px-4 py-3 border rounded-xl bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* ================= NID SECTION ================= */}
        {hasNID && !canReupload ? (
          <>
            <label className="block mt-6 mb-2 font-semibold text-gray-700">
              Your NID Photos
            </label>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <img
                src={`${API_URL}${formData.nidFront}`}
                className="h-32 w-full object-cover rounded-xl border"
                alt="NID Front"
              />
              <img
                src={`${API_URL}${formData.nidBack}`}
                className="h-32 w-full object-cover rounded-xl border"
                alt="NID Back"
              />
            </div>

            <button
              type="button"
              onClick={() => navigate("/post")}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700"
            >
              CONTINUE TO ADD PROPERTY
            </button>
          </>
        ) : (
          <>
            <label className="block mt-6 mb-1 font-semibold text-gray-700">
              NID Photos
            </label>
            <p className="mb-4 text-xs text-gray-500">
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
                    name={side}
                    accept="image/*"
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
              {loading ? "Submitting..." : "SUBMIT NID"}
            </button>
          </>
        )}

        {status && (
          <p className="mt-4 text-center text-sm font-medium text-blue-600">
            {status}
          </p>
        )}
      </form>
    </div>
  );
}

export default UserInfo;
