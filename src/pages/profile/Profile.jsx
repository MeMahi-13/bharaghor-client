import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ProfileCard from "./ProfileCard";
import { IoIosArrowBack } from "react-icons/io";
const Profile = () => {
  const { user } = useContext(AuthContext); 
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchUserInfo = async () => {
      try {
        const res = await fetch(
          `https://yessghor-server.vercel.app/users/email/${user.email}`
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
    
    <div className="">
      <div className="flex items-center gap-3">
         <IoIosArrowBack className="w-5 h-10 flex items-center justify-center" />
        <h2 className="font-medium text-2xl text-[#101828]">Manage Profile</h2>
       
      </div>
      <ProfileCard user={userInfo} />
    </div>
  );
};

export default Profile;
