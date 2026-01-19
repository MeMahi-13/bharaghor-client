import profile from "../../../public/images/Ellipse 116.png";
import { SlCamera } from "react-icons/sl";
const ProfileCard = ({ user }) => {
  const backendUrl = "https://yessghor-server.vercel.app/";

  return (
    <div>
     <div style={styles.container}>
      <div className="flex flex-col items-center justify-center">
  <div className="w-full flex justify-center">
    <img 
      src={profile}
      alt="Profile image"
      className="w-40 h-40 rounded-full border border-[#E9EBF8] object-cover"
    />
  </div>

  <div className="flex items-center justify-center gap-2 mt-2 cursor-pointer">
    <SlCamera />
    <p>Change Photo</p>
  </div>
</div>

  <div style={styles.formGroup}>
    <label style={styles.label} htmlFor="name">Name:</label>
    <input style={styles.input} type="text" id="name" value={user.name} readOnly />
  </div>

  <div style={styles.formGroup}>
    <label style={styles.label} htmlFor="email">Email:</label>
    <input style={styles.input} type="email" id="email" value={user.email} readOnly />
  </div>

  <div style={styles.formGroup}>
    <label style={styles.label} htmlFor="status">Status:</label>
    <input style={styles.input} type="text" id="status" value={user.nidStatus} readOnly />
  </div>

  <div style={styles.formGroup}>
    <label style={styles.label} htmlFor="createdAt">Created At:</label>
    <input style={styles.input} type="text" id="createdAt" value={user.createdAt} readOnly />
  </div>
  <h2>NID</h2>
      <div style={{ display: 'flex', gap: '20px',border:'1px solid #E9EBF8',marginTop:'12px' }}>

        
        <img 
            src={`${backendUrl}${user.nidFront}`} 
            alt="Front NID" 
            style={{ width: '300px' }} 
        />
        <img 
            src={`${backendUrl}${user.nidBack}`} 
            alt="Back NID" 
            style={{ width: '300px' }} 
        />
      </div>
</div>



    </div>
  );
};
 export default ProfileCard;
 const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "100%",
    margin: "0 auto",
    padding: "20px",
    
   
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "600",
    color: "#333",
    fontSize: "14px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    color: "#333",
    outline: "none",
  },
}