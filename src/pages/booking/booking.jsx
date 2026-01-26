// @flow strict
import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { MdOutlineEventNote } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import OwnerBookings from "./OwnerBookings";
import { Link } from "react-router";

function Booking() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?._id) return;

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://yessghor-server.vercel.app/bookings/user/${user._id}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await res.json();

        if (data.success && Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Could not fetch bookings", "error");
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user?._id]);

  /* ----------------- Guards ----------------- */
  if (!user) {
    return (
      <p className="text-center py-10 text-gray-500">
        Please login to see your bookings.
      </p>
    );
  }

  /* ----------------- UI ----------------- */
  return (
    <div className="border border-[#E9EBF8] mt-10 rounded-md shadow-sm bg-white">
      {/* Header */}
      <div className="flex justify-between px-5 py-5 border-b border-[#E9EBF8]">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#CBF3FF] flex items-center justify-center rounded-xl">
            <MdOutlineEventNote size={22} />
          </div>
          <h2 className="font-medium text-xl text-[#101828]">
            My Bookings
          </h2>
        </div>

        <span className="flex items-center text-[#0988E3] cursor-pointer text-sm">
          View All <IoIosArrowForward />
        </span>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center py-10 text-gray-500">
          Loading bookings...
        </p>
      )}

      {/* Empty */}
{/* Booking list */}
{!loading &&
  bookings.map((booking) => (
    <div
      key={booking._id}
      className="flex items-center justify-between px-5 py-5 border-b border-[#E9EBF8] hover:bg-gray-50 transition"
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <img
          src={user.profileImage || "/images/Ellipse 116.png"}
          alt={user.name || "User"}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <p className="font-medium text-[#101828]">
            {booking.post?.title || "Property"}
          </p>
          <p className="text-sm text-[#99A1AF]">
            Booking ID: #{booking._id.slice(-6)}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 text-sm">
        <span className="text-[#4A5565]">
          {new Date(booking.createdAt).toLocaleDateString()}
        </span>

        <span
          className={`px-2 py-1 rounded-md capitalize ${
            booking.status === "confirmed"
              ? "text-green-700 bg-green-100"
              : booking.status === "pending"
              ? "text-yellow-700 bg-yellow-100"
              : "text-red-700 bg-red-100"
          }`}
        >
          {booking.status}
        </span>

        <span className="font-medium text-[#101828]">
          TK {booking.post?.rent ?? 0}
        </span>

        {/* View Details Button */}
        {booking.post?._id && (
          <Link
            to={`/details/${booking.post._id}`}
            className="px-3 py-1.5 text-sm font-medium text-[#0988E3] border border-[#0988E3] rounded-md hover:bg-[#0988E3] hover:text-white transition"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  ))}


      {/* Booking list */}
      {!loading &&
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="flex items-center justify-between px-5 py-5 border-b border-[#E9EBF8] hover:bg-gray-50 transition"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <img
                src={user.profileImage || "/images/Ellipse 116.png"}
                alt={user.name || "User"}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div>
                <p className="font-medium text-[#101828]">
                  {booking.post?.title || "Property"}
                </p>
                <p className="text-sm text-[#99A1AF]">
                  Booking ID: #{booking._id.slice(-6)}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-6 text-sm">
              <span className="text-[#4A5565]">
                {new Date(booking.createdAt).toLocaleDateString()}
              </span>

              <span
                className={`px-2 py-1 rounded-md capitalize ${
                  booking.status === "confirmed"
                    ? "text-green-700 bg-green-100"
                    : booking.status === "pending"
                    ? "text-yellow-700 bg-yellow-100"
                    : "text-red-700 bg-red-100"
                }`}
              >
                {booking.status}
              </span>

              <span className="font-medium text-[#101828]">
                TK {booking.post?.rent ?? 0}
              </span>
            </div>
          </div>
        ))}

      {/* Owner bookings */}
      <OwnerBookings />
    </div>
  );
}

export default Booking;
