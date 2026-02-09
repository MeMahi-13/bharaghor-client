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
import { LuShare2 } from "react-icons/lu";
import { AuthContext } from "../context/AuthContext";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter, FaInstagram, FaTelegramPlane } from "react-icons/fa";

import Swal from "sweetalert2";

function PropertyCard({ places = [], onToggleBookmark, showEdit = false }) {
  const { user } = useContext(AuthContext);
const [shareModalOpen, setShareModalOpen] = React.useState(false);
const [shareLink, setShareLink] = React.useState("");
  //  SHARE HANDLER
  const handleShare = (placeId) => {
    const shareUrl = `${window.location.origin}/details/${placeId}`;
 setShareLink(shareUrl);
  setShareModalOpen(true);

   
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
                alt={place.title}
                loading="lazy"
                style={styles.cardImage}
              />
            </Link>

            {/* BOOKMARK */}
            {onToggleBookmark && (
              <div
                style={styles.bookmark}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleBookmark(place._id);
                }}
              >
                {place.bookmarked ? (
                  <BsBookmarkFill size={20} color="#1b4965" />
                ) : (
                  <BsBookmark size={20} color="#1b4965" />
                )}
              </div>
            )}

            {/* DETAILS */}
            <Link to={`/details/${place._id}`} style={styles.detailsBtn}>
              <IoInformationCircleOutline size={20} color="#1b4965" />
            </Link>

            {/* SHARE */}
            <div
              style={styles.linkBtn}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleShare(place._id);
              }}
            >
              <LuShare2 size={20} color="#1b4965" />
            </div>
          </div>

          {/* CONTENT */}
          <div style={styles.cardContent}>
            <h2 style={styles.cardTitle}>{place.title}</h2>

            <div style={styles.infoBlock}>
              <InfoRow icon={<CiLocationOn />} label="Location" text={place.location} />
              <InfoRow icon={<IoHomeOutline />} label="House No" text={place.houseNo} />
              <InfoRow icon={<SlCalender />} label="Available Date" text={place.date} />
              <InfoRow icon={<FaBuilding />} label="House Type" text={place.houseType} />
            </div>

            {/* FOOTER */}
            <div style={styles.bottomRow}>
              <div style={styles.money}>Rent: {place.price} TK</div>

              <div style={{ display: "flex", gap: "8px" }}>
                {showEdit && place.onEdit && (
                  <button onClick={place.onEdit} style={styles.editBtn}>
                    Edit
                  </button>
                )}

                <button style={styles.messageBtn}>
                  <MdOutlineMessage size={16} />
                  Message
                </button>
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
        `}
      </style>
      {shareModalOpen && (
  <div style={styles.modalOverlay} onClick={() => setShareModalOpen(false)}>
    <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
      <h3 style={{ marginBottom: "10px" }}>Share Property</h3>

      {/* SHARE LINK INPUT */}
<div style={styles.inputWrapper}>
  <input
    type="text"
    value={shareLink}
    readOnly
    style={styles.shareInput}
  />

  <span
    style={styles.copyIcon}
    onClick={() => {
      navigator.clipboard.writeText(shareLink);
      Swal.fire({
        icon: "success",
        title: "Copied!",
        timer: 1000,
        showConfirmButton: false,
      });
    }}
    title="Copy link"
  >
    📋
  </span>
</div>

{/* SOCIAL ICONS */}
<div style={styles.socialRow}>
  {/* WhatsApp */}
  <a
    href={`https://wa.me/?text=${encodeURIComponent(shareLink)}`}
    target="_blank"
    rel="noreferrer"
    style={{ ...styles.socialBtn, background: "#25D366" }}
    title="Share on WhatsApp"
  >
    <FaWhatsapp />
  </a>

  {/* Facebook */}
  <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareLink
    )}`}
    target="_blank"
    rel="noreferrer"
    style={{ ...styles.socialBtn, background: "#1877F2" }}
    title="Share on Facebook"
  >
    <FaFacebookF />
  </a>

  {/* Twitter / X */}
  <a
    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareLink
    )}`}
    target="_blank"
    rel="noreferrer"
    style={{ ...styles.socialBtn, background: "#000000" }}
    title="Share on X"
  >
    <FaTwitter />
  </a>

  {/* Telegram */}
  <a
    href={`https://t.me/share/url?url=${encodeURIComponent(shareLink)}`}
    target="_blank"
    rel="noreferrer"
    style={{ ...styles.socialBtn, background: "#229ED9" }}
    title="Share on Telegram"
  >
    <FaTelegramPlane />
  </a>

  {/* Instagram (copy + open) */}
  <span
    style={{ ...styles.socialBtn, background: "#E1306C", cursor: "pointer" }}
    title="Copy link for Instagram"
    onClick={() => {
      navigator.clipboard.writeText(shareLink);
      Swal.fire({
        icon: "info",
        title: "Link Copied",
        text: "Paste it in Instagram",
        timer: 1500,
        showConfirmButton: false,
      });
      window.open("https://www.instagram.com/", "_blank");
    }}
  >
    <FaInstagram />
  </span>
</div>



      <button
        onClick={() => setShareModalOpen(false)}
        style={styles.closeBtn}
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}

export default PropertyCard;

/* ---------- INFO ROW ---------- */
const InfoRow = ({ icon, label, text }) => (
  <div style={styles.row}>
    <span style={styles.icon}>{icon}</span>
    <span style={styles.label}>{label}:</span>
    <span style={styles.cardText}>{text}</span>
  </div>
);

/* ---------- STYLES ---------- */
const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "16px",
    background: "#fff",
    overflow: "hidden",
    border: "1px solid #E5E7EB",
    boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
  },
  imageWrapper: { position: "relative" },
  cardImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  bookmark: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#fff",
    borderRadius: "50%",
    padding: "6px",
    cursor: "pointer",
  },
  detailsBtn: {
    position: "absolute",
    top: "50px",
    right: "10px",
    background: "#fff",
    borderRadius: "50%",
    padding: "6px",
  },
  linkBtn: {
    position: "absolute",
    top: "90px",
    right: "10px",
    background: "#fff",
    borderRadius: "50%",
    padding: "6px",
    cursor: "pointer",
  },
  cardContent: {
    padding: "14px 16px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  cardTitle: {
    fontSize: "17px",
    fontWeight: "600",
    marginBottom: "10px",
  },
  infoBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  icon: { color: "#1b4965" },
  label: { fontSize: "13px", fontWeight: "600", color: "#757575" },
  cardText: { fontSize: "13px", color: "#555" },
  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "12px",
  },
  money: { fontWeight: "600", color: "#1b4965" },
  messageBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#1b4965",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "7px 14px",
    cursor: "pointer",
  },
  editBtn: {
    background: "#fff",
    border: "1px solid #1b4965",
    borderRadius: "8px",
    padding: "7px 14px",
    cursor: "pointer",
  },
  modalOverlay: {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
},
modal: {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "380px",
},
shareInput: {
 width: "100%",
  padding: "10px 40px 10px 10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "13px",
},
modalActions: {
  display: "flex",
  gap: "8px",
  marginBottom: "12px",
},
copyBtn: {
  flex: 1,
  background: "#1b4965",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "8px",
  cursor: "pointer",
},
whatsappBtn: {
  flex: 1,
  background: "#25D366",
  color: "#fff",
  borderRadius: "6px",
  padding: "8px",
  textAlign: "center",
  textDecoration: "none",
},
fbBtn: {
  flex: 1,
  background: "#1877F2",
  color: "#fff",
  borderRadius: "6px",
  padding: "8px",
  textAlign: "center",
  textDecoration: "none",
},
closeBtn: {
  width: "100%",
  border: "none",
  background: "#eee",
  padding: "8px",
  borderRadius: "6px",
  cursor: "pointer",
},

inputWrapper: {
  position: "relative",
  marginBottom: "14px",
},
socialRow: {
  display: "flex",
  justifyContent: "center",
  gap: "14px",
  marginBottom: "12px",
},

socialBtn: {
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "20px",
  textDecoration: "none",
},
copyIcon: {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  fontSize: "18px",
},
};
