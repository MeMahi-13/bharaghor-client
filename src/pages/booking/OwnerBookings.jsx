// @flow strict
import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { MdOutlineEventNote } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

function OwnerBookings() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `https://yessghor-server.vercel.app/bookings/owner/${user._id}`
        );
        const data = await res.json();

        if (!data.success || !Array.isArray(data.bookings)) {
          Swal.fire("Oops!", "Failed to fetch bookings.", "error");
          setBookings([]);
        } else {
          setBookings(data.bookings);
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Could not fetch bookings.", "error");
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (!user) {
    return (
      <p className="text-center py-10 text-gray-500">
        Please login to see bookings on your properties.
      </p>
    );
  }

  return (
    <div className="border border-[#E9EBF8] mt-10 rounded-md shadow-sm">
      {/* Header */}
      <div className="flex justify-between px-5 py-5 border-b border-[#E9EBF8]">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#CBF3FF] flex items-center justify-center rounded-xl">
            <MdOutlineEventNote size={22} />
          </div>
          <h2 className="font-medium text-xl text-[#101828]">
            Bookings on Your Properties
          </h2>
        </div>
        <p className="flex items-center font-normal text-base text-[#0988E3] cursor-pointer">
          View All <IoIosArrowForward />
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center py-10 text-gray-500">Loading bookings...</p>
      )}

      {/* Empty state */}
      {!loading && bookings.length === 0 && (
        <p className="text-center py-10 text-gray-500">No bookings found.</p>
      )}

      {/* Bookings list */}
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="flex items-center justify-between px-5 py-5 border-b border-[#E9EBF8] hover:bg-gray-50 transition"
        >
          {/* Left */}
          <div className="flex items-center gap-3">
            <img
              src={booking.user?.profileImage || "/images/Ellipse 116.png"}
              alt={booking.user?.name || "User"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{booking.user?.name || "Unknown"}</p>
              <p className="text-sm text-[#99A1AF]">
                {booking.post?.title || "Property"}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6 text-sm">
            <span className="text-[#4A5565]">
              {new Date(booking.createdAt).toLocaleDateString()}
            </span>

            <span
              className={`px-2 py-1 rounded-md text-sm ${
                booking.status === "confirmed"
                  ? "text-green-700 bg-green-100"
                  : booking.status === "pending"
                  ? "text-yellow-700 bg-yellow-100"
                  : "text-red-700 bg-red-100"
              }`}
            >
              {booking.status}
            </span>

            <span className="text-base text-[#101828]">
              TK {booking.post?.rent || "0"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OwnerBookings;
