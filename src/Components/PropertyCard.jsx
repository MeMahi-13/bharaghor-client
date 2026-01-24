import * as React from "react";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { IoHomeOutline, IoInformationCircleOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaBuilding } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

function PropertyCard({ places = [], onToggleBookmark }) {
  return (
    <div
      className="featured-place-body"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "20px",
      }}
    >
      {places.map((place, idx) => (
        <div
          key={place._id}
          style={{
            ...styles.card,
            animation: `fadeInUp 0.6s ease forwards`,
            animationDelay: `${idx * 0.1}s`, // staggered fade-in
            opacity: 0,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px) scale(1.03)";
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.08)";
          }}
        >
          {/* IMAGE */}
          <div style={styles.imageWrapper}>
            <Link to={`/details/${place._id}`}>
              <img
              className="hover:scale-(1)"
                src={place.image}
                loading="lazy"
                alt={place.title}
                style={styles.cardImage}
              />
            </Link>

            {/* Bookmark */}
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
                  <BsBookmarkFill size={18} color="#217c82" />
                ) : (
                  <BsBookmark size={18} color="#217c82" />
                )}
              </div>
            )}

            {/* Details Button */}
            <Link to={`/details/${place._id}`} style={styles.detailsBtn}>
              <IoInformationCircleOutline size={18} color="#217c82" />
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
              <button style={styles.messageBtn}>
                <MdOutlineMessage size={16} />
                Message
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Keyframes for fade-in animation */}
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default PropertyCard;

/* -----------------------
   SMALL HELPER COMPONENT
------------------------ */
const InfoRow = ({ icon, text }) => (
  <div style={styles.row}>
    <span style={styles.icon}>{icon}</span>
    <span style={styles.cardText}>{text}</span>
  </div>
);

/* =======================
   STYLES
======================= */
const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "14px",
    background: "#ffffff",
    overflow: "hidden",
    border: "1px solid #E5E7EB",
    boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
  },

  imageWrapper: {
    position: "relative",
  },

  cardImage: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
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
    top: "52px",
    right: "10px",
    background: "#ffffff",
    borderRadius: "50%",
    padding: "6px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  },

  cardContent: {
    display: "flex",
    flexDirection: "column",
    padding: "12px 14px",
    flexGrow: 1,
  },

  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#073032",
    marginBottom: "8px",
    lineHeight: "1.3",
  },

  infoBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flexGrow: 1,
  },

  row: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  icon: {
    fontSize: "14px",
    color: "#217c82",
    minWidth: "16px",
  },

  cardText: {
    fontSize: "13px",
    color: "#555",
    lineHeight: "1.4",
  },

  bottomRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "12px",
  },

  money: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#217c82",
  },

  messageBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#217c82",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "7px 12px",
    fontSize: "13px",
    cursor: "pointer",
  },
};
