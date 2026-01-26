import React, { useEffect, useState } from "react";
import { FiUserCheck } from "react-icons/fi";
import { MdEdit, MdVisibility } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Pendinguser = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch("https://yessghor-server.vercel.app/admin/posts/pending")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pending posts:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full bg-white shadow-lg border border-white rounded-2xl overflow-hidden mt-8 p-3">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#FFEDD4] flex items-center justify-center rounded-lg text-[#F54900]">
            <FiUserCheck />
          </div>
          <div>
            <h2 className="font-semibold text-lg text-[#101828]">
              Pending
            </h2>
            <p className="text-sm text-[#6A7282]">
              Requires action
            </p>
          </div>
        </div>

        <div className="px-10 py-2 bg-[#0988E3] text-white rounded-xl font-semibold">
          Pending
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-gray-500 py-6">
          Loading...
        </p>
      ) : (
        <div className="space-y-4">
          {properties.map((property) => (
            <div
              key={property._id}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm"
            >
              {/* Left */}
              <div>
                <p className="text-sm text-gray-500">
                  Property Listing
                </p>

                <h2 className="text-lg font-semibold text-gray-800">
                  {property.title}
                </h2>

                <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                  <span>
                    {property.division} · {property.district} · {property.upazila}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    {property.status}
                  </span>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200">
                  <MdEdit />
                  Approve
                </button>

                <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium bg-green-100 text-green-700 hover:bg-green-200">
                  <MdVisibility />
                  Reject
                </button>

                <button
                  onClick={() => navigate(`/details/${property._id}`)}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium bg-[#E6F3FC] hover:bg-sky-200"
                >
                  <FaEye />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pendinguser;
