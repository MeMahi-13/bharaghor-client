const ProfileCard = ({ user }) => {
  const backendUrl = "http://localhost:5000";

  return (
    <div>
      <h3>{user.uid}</h3>
       <h3>{user.name}</h3>
        <h3>{user.email}</h3>
         <h3>{user.status}</h3>
          <h3>{user.createdAt}</h3>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Combine http://localhost:5000 + /uploads/filename... */}
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