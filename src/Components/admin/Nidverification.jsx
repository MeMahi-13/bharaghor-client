import React, { useEffect, useState } from "react";
import { MdOutlineVerifiedUser, MdVisibility, MdBlock } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

const Nidverification = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDocUser, setOpenDocUser] = useState(null);
const [actionLoading, setActionLoading] = useState(null);


  // 🔹 Fetch users (name, email, nid, nidFront, nidBack)
  useEffect(() => {
    fetch("https://yessghor-server.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  //  View document
  const handleViewDocument = (user) => {
    setOpenDocUser(user);
  };

  //  Close document
  const handleCloseDocument = () => {
    setOpenDocUser(null);
  };

  //  Approve / Reject / Ban
  const handleUserAction = async (user_id, status) => {
    try {
      await fetch(
        `https://yessghor-server.vercel.app/users/${user_id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <p className="text-center py-10 text-gray-500">
        Loading users...
      </p>
    );
  }

  return (
    <div className="w-full bg-white shadow-lg rounded-2xl mt-8 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#CEFAFE] flex items-center justify-center rounded-lg text-[#0092B8]">
            <MdOutlineVerifiedUser size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-lg text-[#101828]">
              NID Verification & User Approval
            </h2>
            <p className="text-sm text-[#6A7282]">
              Verify national identity documents and manage user access
            </p>
          </div>
        </div>

        <div className="px-6 py-2 bg-[#0988E3] text-white rounded-xl font-semibold">
          Pending
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th className="py-3">User Information</th>
              <th className="py-3">NID Number</th>
              <th className="py-3">NID Document</th>
              <th className="py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-sm">
                {/* User info */}
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#CEFAFE] flex items-center justify-center rounded-full text-[#0092B8] font-semibold uppercase">
                      {user?.name?.[0] || "U"}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* NID */}
                <td className="py-4 text-gray-700">
                  {user.nid}
                </td>

                {/* Document */}
                <td className="py-4">
                  <button
                    onClick={() => handleViewDocument(user)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    <MdVisibility />
                    <span>View document</span>
                  </button>
                </td>

                {/* Actions */}
                <td className="py-4">
                  <div className="flex gap-2">
                    <button
  disabled={actionLoading === user._id}
  onClick={() => handleUserAction(user._id, "approved")}
  className="flex items-center gap-1 px-3 py-2 bg-[#009966] text-white rounded-lg disabled:opacity-50"
>
  <IoMdCheckmarkCircleOutline />
  Approve
</button>


                    <button
                      onClick={() =>
                        handleUserAction(user._id, "rejected")
                      }
                      className="flex items-center gap-1 px-3 py-2 bg-[#E7000B] text-white rounded-lg"
                    >
                      <MdOutlineCancel />
                      Reject
                    </button>

                    <button
                      onClick={() =>
                        handleUserAction(user._id, "banned")
                      }
                      className="flex items-center gap-1 px-3 py-2 bg-[#101828] text-white rounded-lg"
                    >
                      <MdBlock />
                      Ban User
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  Document Modal  */}
      {openDocUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-3xl">
            <h2 className="text-lg font-semibold mb-4">
              NID Documents
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-2">
                  NID Front
                </p>
                <img
                  src={openDocUser.nidFront}
                  alt="NID Front"
                  className="rounded-lg border"
                />
              </div>

              <div>
                <p className="text-sm font-medium mb-2">
                  NID Back
                </p>
                <img
                  src={openDocUser.nidBack}
                  alt="NID Back"
                  className="rounded-lg border"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleCloseDocument}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nidverification;
