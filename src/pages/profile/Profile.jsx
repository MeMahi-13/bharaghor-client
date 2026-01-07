import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ProfileCard from "./ProfileCard";

const Profile = () => {
  const { user } = useContext(AuthContext); 
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchUserInfo = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/users/email/${user.email}`
        );
        if (!res.ok) throw new Error("Failed to fetch user info");

        const data = await res.json();
        setUserInfo(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [user]);

  if (loading) return <p>Loading user info...</p>;
  if (!userInfo) return <p>User not found.</p>;

  return (
    <div className="p-5">
      <ProfileCard user={userInfo} />
    </div>
  );
};

export default Profile;
