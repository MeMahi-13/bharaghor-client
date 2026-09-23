import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import Swal from "sweetalert2";

export default function UserBookings() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(`https://yessghor-server.vercel.app/bookings/user/${user._id}`);
        const data = await res.json();
        if (data.success) setBookings(data.bookings);
        else Swal.fire("Error", "Failed to fetch bookings", "error");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Something went wrong", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (!user) return <p className="p-4">Please login to see your bookings</p>;
  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="border rounded-xl p-4 shadow-md bg-white">
            <h2 className="font-semibold">{b.post.title}</h2>
            <p>Location: {b.post.location}</p>
            <p>Price: TK {b.post.price}</p>
            <p>Status: {b.status}</p>
            <p>Booked on: {new Date(b.createdAt).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
