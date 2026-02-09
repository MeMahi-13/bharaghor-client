import { useState } from "react";
import Swal from "sweetalert2";
import { CiCamera } from "react-icons/ci";
const ProfileCard = ({ user, refetchUser,isEditing, setIsEditing }) => {
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
        `${API_URL}/users/${user._id}`,
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

  {/* Hidden file input */}
  <input
    type="file"
    id="profileUpload"
    accept="image/*"
    onChange={handleProfileUpload}
    disabled={uploading}
    style={{ display: "none" }}
  />

  {/* Icon button */}
  <label htmlFor="profileUpload" style={styles.uploadBtn}>
    <CiCamera size={22} />
    <span style={{ marginLeft: "6px" }}>
      {uploading ? "Uploading..." : "Change Photo"}
    </span>
  </label>
</div>


        {/* User Info */}
        <div style={styles.infoSection}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
           <input
  style={styles.input}
  value={user.name || ""}
  readOnly={!isEditing}
/>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input style={styles.input} value={user.email || ""} readOnly />
          </div>
           <div style={styles.formGroup}>
            <label style={styles.label}>Phone Number </label>
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
        {isEditing && (
  <div className="flex justify-center w-full mt-6">
    <button
      onClick={() => setIsEditing(false)}
      className="bg-[#0988E3] py-4 rounded-xl font-medium text-xl text-white"
    >
      Save Change
    </button>
  </div>
)}


        
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
