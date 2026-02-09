import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ProfileCard from "./ProfileCard";
import { IoIosArrowBack } from "react-icons/io";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // ✅ NEW

  const fetchUserInfo = async () => {
    if (!user?._id) return;

    try {
      const res = await fetch(
        `https://yessghor-server.vercel.app/users/${user._id}`, {
          credentials: "include"
        }
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

  useEffect(() => {
    fetchUserInfo();
  }, [user]);

  if (loading) return <p>Loading user info...</p>;
  if (!userInfo) return <p>User not found.</p>;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <IoIosArrowBack className="w-5 h-10" />
          <h2 className="font-medium text-2xl text-[#101828]">
            Manage Profile
          </h2>
        </div>

        {/* Edit button */}
        <button
          onClick={() => setIsEditing(true)}
          className="font-medium text-[#0988E3]"
        >
          Edit
        </button>
      </div>

      {/* Profile Card */}
      <ProfileCard
        user={userInfo}
        refetchUser={fetchUserInfo}
        isEditing={isEditing}       
        setIsEditing={setIsEditing} 
      />
    </div>
  );
};

export default Profile;
