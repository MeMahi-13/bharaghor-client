// PropertyCard.jsx
import * as React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { IoHomeOutline, IoInformationCircleOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaBuilding } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

function PropertyCard({ places = [], onToggleBookmark, showEdit = false }) {
  const { user } = useContext(AuthContext);

  // Booking handler
  const handleBooking = async (placeId) => {
    if (!user) {
      return Swal.fire({
        icon: "warning",
        title: "Not logged in",
        text: "Please login first to book a property",
        confirmButtonColor: "#1b4965",
      });
    }
    if (!user.name || !user.phone) {
      return Swal.fire({
        icon: "error",
        title: "Profile incomplete",
        text: "Please add your name and phone number in your profile first.",
        confirmButtonColor: "#1b4965",
      });
    }

    try {
      const res = await fetch("https://yessghor-server.vercel.app/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: placeId,
          userId: user._id,
          name: user.name,
          phone: user.phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Booking failed");
      }

      Swal.fire({
        icon: "success",
        title: "Booking Request Sent!",
        text: "The property owner will contact you soon.",
        confirmButtonColor: "#1b4965",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Booking failed",
        text: err.message,
        confirmButtonColor: "#1b4965",
      });
    }
  };

  return (
    <div
      className="featured-place-body"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "24px",
      }}
    >
      {places.map((place, idx) => (
        <div
          key={place._id}
          style={{
            ...styles.card,
            animation: `fadeInUp 0.6s ease forwards`,
            animationDelay: `${idx * 0.1}s`,
            opacity: 0,
          }}
        >
          {/* IMAGE */}
          <div style={styles.imageWrapper}>
            <Link to={`/details/${place._id}`}>
              <img
                src={place.image}
                loading="lazy"
                alt={place.title}
                style={styles.cardImage}
              />
            </Link>

            {onToggleBookmark && (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleBookmark(place._id);
                }}
                style={styles.bookmark}
              >
                {place.bookmarked ? (
                  <BsBookmarkFill size={20} color="#1b4965" />
                ) : (
                  <BsBookmark size={20} color="#1b4965" />
                )}
              </div>
            )}

            <Link to={`/details/${place._id}`} style={styles.detailsBtn}>
              <IoInformationCircleOutline size={20} color="#1b4965" />
            </Link>
          </div>

          {/* CONTENT */}
          <div style={styles.cardContent}>
            <h2 style={styles.cardTitle}>{place.title}</h2>

            <div style={styles.infoBlock}>
              <InfoRow icon={<CiLocationOn />} text={place.location} />
              <InfoRow icon={<IoHomeOutline />} text={place.houseNo} />
              <InfoRow icon={<SlCalender />} text={place.date} />
              <InfoRow icon={<FaBuilding />} text={place.houseType} />
            </div>

            {/* FOOTER */}
            <div style={styles.bottomRow}>
              <div style={styles.money}>TK {place.price}</div>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {showEdit && place.onEdit && (
                  <button onClick={place.onEdit} style={styles.editBtn}>
                    Edit
                  </button>
                )}

                <button style={styles.messageBtn}>
                  <MdOutlineMessage size={16} />
                  Message
                </button>

                {/* <button
                  style={styles.bookBtn}
                  onClick={() => handleBooking(place._id)}
                >
                  Book Now
                </button> */}
              </div>
            </div>
          </div>
        </div>
      ))}

      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .book-btn:hover { background: #8cb300; }
          .message-btn:hover { background: #073032; }
          .edit-btn:hover { background: #e8f1f5; }
        `}
      </style>
    </div>
  );
}

export default PropertyCard;

/* ----------------------- SMALL HELPER COMPONENT ------------------------ */
const InfoRow = ({ icon, text }) => (
  <div style={styles.row}>
    <span style={styles.icon}>{icon}</span>
    <span style={styles.cardText}>{text}</span>
  </div>
);

/* ======================= STYLES ====================== */
const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "16px",
    background: "#ffffff",
    overflow: "hidden",
    border: "1px solid #E5E7EB",
    boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  imageWrapper: { position: "relative" },
  cardImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
  },
  bookmark: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#ffffff",
    borderRadius: "50%",
    padding: "6px",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  },
  detailsBtn: {
    position: "absolute",
    top: "50px",
    right: "10px",
    background: "#ffffff",
    borderRadius: "50%",
    padding: "6px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  },
  cardContent: { display: "flex", flexDirection: "column", padding: "14px 16px", flexGrow: 1 },
  cardTitle: { fontSize: "17px", fontWeight: "600", color: "#073032", marginBottom: "10px", lineHeight: "1.4" },
  infoBlock: { display: "flex", flexDirection: "column", gap: "6px", flexGrow: 1, marginBottom: "10px" },
  row: { display: "flex", alignItems: "center", gap: "8px" },
  icon: { fontSize: "14px", color: "#1b4965", minWidth: "16px" },
  cardText: { fontSize: "13px", color: "#555", lineHeight: "1.4" },
  bottomRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "12px" },
  money: { fontSize: "14px", fontWeight: "600", color: "#1b4965" },
  messageBtn: { display: "flex", alignItems: "center", gap: "6px", background: "#1b4965", color: "#ffffff", border: "none", borderRadius: "8px", padding: "7px 14px", fontSize: "13px", fontWeight: "500", cursor: "pointer", transition: "all 0.3s ease" },
  bookBtn: { background: "#a5be00", color: "#073032", border: "none", borderRadius: "8px", padding: "7px 14px", fontSize: "13px", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", transition: "all 0.3s ease" },
  editBtn: { background: "#ffffff", color: "#1b4965", border: "1px solid #1b4965", borderRadius: "8px", padding: "7px 14px", fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "all 0.3s ease" },
};
