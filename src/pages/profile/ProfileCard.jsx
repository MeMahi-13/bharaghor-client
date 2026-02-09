import { useState } from "react";
import Swal from "sweetalert2";
import { CiCamera } from "react-icons/ci";

const ProfileCard = ({ user, refetchUser }) => {
  const API_URL = "https://yessghor-server.vercel.app";
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    password: user.password || "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile image upload
  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("profileImage", file);

    try {
      setUploading(true);
      const res = await fetch(`${API_URL}/users/${user._id}`, {
        method: "PATCH",
        credentials: "include",
        body: data,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      refetchUser();
      Swal.fire({
        icon: "success",
        title: "Uploaded!",
        text: "Profile image updated.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: err.message || "Something went wrong!",
      });
    } finally {
      setUploading(false);
    }
  };

  // Handle saving changes
  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/users/${user._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      refetchUser();
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Profile updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      setIsEditing(false);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.message || "Something went wrong!",
      });
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        {/* Profile Image */}
        <div style={styles.profileSection}>
          <img
            src={user.profileImage || "/avatar.png"}
            alt="Profile"
            style={styles.avatar}
          />
          <input
            type="file"
            id="profileUpload"
            accept="image/*"
            onChange={handleProfileUpload}
            disabled={uploading}
            style={{ display: "none" }}
          />
          <label htmlFor="profileUpload" style={styles.uploadBtn}>
            <CiCamera size={22} />
            <span>{uploading ? "Uploading..." : "Change Photo"}</span>
          </label>
        </div>

        {/* User Info */}
        <div style={styles.infoSection}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              style={styles.input}
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              style={styles.input}
              value={user.email || ""}
              readOnly
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Phone Number</label>
            <input
              style={styles.input}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Status</label>
            <input style={styles.input} value={user.nidStatus} readOnly />
          </div>
        </div>

        {/* NID Photos */}
        <h2 style={styles.nidHeading}>Your NID Photos</h2>
        <div style={styles.nidPhotos}>
          {user.nidFront && (
            <img src={user.nidFront} style={styles.nidImage} />
          )}
          {user.nidBack && (
            <img src={user.nidBack} style={styles.nidImage} />
          )}
        </div>

        {/* Edit / Save Buttons */}
        <div className="flex justify-center w-full mt-6 gap-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-[#0988E3] py-4 px-6 rounded-xl font-medium text-xl text-white"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-[#16A34A] py-4 px-6 rounded-xl font-medium text-xl text-white"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
const styles = {
  pageWrapper: {
    width: "100%",
  },
  card: {
    //padding: "30px",
    width: "100%",
    maxWidth: "988px",
  },
  profileSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "30px",
  },
  avatar: {
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #ddd",
    marginBottom: "15px",
  },
  fileInput: {
    marginTop: "10px",
    //padding: "8px 12px",
    borderRadius: "6px",
    border: "2px solid #101828",
    backgroundColor: "#101828",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.2s ease",
  },
  uploadingText: {
    marginTop: "10px",
    color: "#555",
    fontStyle: "italic",
  },
  infoSection: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "600",
    marginBottom: "5px",
    color: "#333",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "auto",
  },
  nidHeading: {
    marginTop: "30px",
    marginBottom: "15px",
    fontSize: "18px",
    fontWeight: "600",
    color: "#101828",
    // textAlign: "center",
  },
  nidPhotos: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  nidImage: {
    width: "300px",
    height: "auto",
    borderRadius: "3px",
    border: "1px solid #ddd",
  },
  uploadBtn: {
    marginTop: "5px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "8px 14px",
    borderRadius: "20px",
    //backgroundColor: "#101828",
    color: "#000000",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "0.2s",
  },
};