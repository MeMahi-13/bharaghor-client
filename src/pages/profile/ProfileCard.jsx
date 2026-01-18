const ProfileCard = ({ user }) => {
  const backendUrl = "https://yessghor-server.vercel.app/";

  return (
    <div>
     <div style={styles.container}>
      <div>
        <img 
            src={`${backendUrl}${user.Profileimage}`} 
            alt="Profile image" 
            style={{ width: '300px' }} 
        />
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
    <input style={styles.input} type="text" id="status" value={user.status} readOnly />
  </div>

  <div style={styles.formGroup}>
    <label style={styles.label} htmlFor="createdAt">Created At:</label>
    <input style={styles.input} type="text" id="createdAt" value={user.createdAt} readOnly />
  </div>
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