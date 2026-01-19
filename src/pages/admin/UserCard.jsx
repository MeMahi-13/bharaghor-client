import React from "react";
import { Link } from "react-router";

const UserCard = ({ user }) => {
  const { _id, name, email } = user;

  const handleDelete = (_id) => {
    console.log(_id);
    fetch(`https://yessghor-server.vercel.app//users/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after delete", data);
      });
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 space-y-3 flex items-center justify-between hover:shadow-lg transition">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600">{email}</p>
      </div>

      <div className="flex gap-2">
        <Link to={`/update-user/${_id}`}><button className="px-3 py-1 text-sm  bg-blue-500 text-white hover:bg-blue-600">Update</button></Link>
       <Link to={`/users/${_id}`}><button  className="px-3 py-1 text-sm  bg-blue-500 text-white hover:bg-blue-600">View Details</button></Link>

        <button
          className="px-3 py-1 text-sm bg-red-500 text-white hover:bg-red-600"
          onClick={() => handleDelete(_id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
