import { useState } from "react";
import Swal from "sweetalert2";

const ProfileCard = ({ user, refetchUser }) => {
  const API_URL = "https://yessghor-server.vercel.app";
  const [uploading, setUploading] = useState(false);

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file); 

    try {
      setUploading(true);

      const res = await fetch(
        `${API_URL}/users/${user._id}/profile-image`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      refetchUser(); 

      Swal.fire({
        icon: "success",
        title: "Uploaded!",
        text: "Your profile image has been updated.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Profile upload error:", err.message);

      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: err.message || "Something went wrong!",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        {/* Profile Image + Upload */}
        <div style={styles.profileSection}>
          <img
            src={user.profileImage || "/avatar.png"} 
            alt="Profile"
            style={styles.avatar}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleProfileUpload}
            disabled={uploading}
            style={styles.fileInput}
          />

          {uploading && <p style={styles.uploadingText}>Uploading...</p>}
        </div>

        {/* User Info */}
        <div style={styles.infoSection}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name</label>
            <input style={styles.input} value={user.name || ""} readOnly />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} value={user.email || ""} readOnly />
          </div>
           <div style={styles.formGroup}>
            <label style={styles.label}>Phone </label>
            <input style={styles.input} value={user.phone || ""} readOnly />
          </div>
           <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input style={styles.input} value={user.password || ""} readOnly />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Status</label>
            <input style={styles.input} value={user.nidStatus} readOnly />
          </div>
        </div>

        {/* NID Photos */}
        <h2 style={styles.nidHeading}>Your NID Photos</h2>
        <div style={styles.nidPhotos}>
          {user.nidFront && <img src={user.nidFront} style={styles.nidImage} />}
          {user.nidBack && <img src={user.nidBack} style={styles.nidImage} />}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

const styles = {
  pageWrapper: {
    display: "flex",
    justifyContent: "center",

  },
  card: {
   
    padding: "30px",
    width: "100%",
    maxWidth: "700px",
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
    padding: "8px 12px",
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
    width: "100%",
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
};
