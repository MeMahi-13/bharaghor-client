import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaBuilding } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

function PropertyCard({ places, onToggleBookmark }) {
  const navigate = useNavigate();

  const totalSlots = 4;
  const displayPlaces = [...places];
  while (displayPlaces.length < totalSlots) displayPlaces.push(null);

  return (
    <div
      className="featured-place-body"
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      {displayPlaces.map((place, index) =>
        place ? (
          <div
            key={place._id}
            style={{
              flex: "0 0 calc(25% - 15px)",
maxWidth: "calc(25% - 15px)",
              display: "flex",
              flexDirection: "column",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              paddingBottom: "16px",
              boxShadow:
                "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 8px rgba(0, 0, 0, 0.1)",
              background: "#ffffff",
              position: "relative"
            }}
          >
            {/* Bookmark Icon */}
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleBookmark(place._id, index);
              }}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                background: "#fff",
                borderRadius: "50%",
                padding: "6px",
                zIndex: 10
              }}
            >
              {place.bookmarked ? (
                <BsBookmarkFill color="#007BFF" size={18} />
              ) : (
                <BsBookmark color="#A1A8B0" size={18} />
              )}
            </div>

            {/* Image */}
            <Link to="/card_details" state={{ place }}>
              <img
                src={place.image}
                alt={place.title}
                style={{
                  ...styles.cardImageHorizontal,
                  cursor: "pointer",
                }}
              />
            </Link>

            {/* Content */}
            <div style={styles.cardContent}>
              <h2 style={styles.cardTitle}>{place.title}</h2>

              <div className="flex items-center gap-0.5">
                <CiLocationOn />
                <p style={styles.cardText}>{place.location}</p>
              </div>

              <div className="flex items-center gap-0.5">
                <IoHomeOutline />
                <p style={styles.cardText}>{place.houseNo}</p>
              </div>

              <div className="flex items-center gap-0.5">
                <SlCalender />
                <p style={styles.cardText}>{place.date}</p>
              </div>

              <div className="flex items-center gap-0.5">
                <FaBuilding />
                <p style={styles.cardText}>{place.houseType}</p>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <div style={styles.money} className="border-none py-2 px-3">
                  TK {place.price}
                </div>
                <button
                  style={styles.call}
                  className="border py-2 px-3 flex items-center"
                >
                  <MdOutlineMessage /> Message
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div key={index} style={{ flex: "1 1 calc(25% - 15px)" }} />
        )
      )}
    </div>
  );
}

export default PropertyCard;

const styles = {
  cardImageHorizontal: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "10px",
    paddingLeft: "13px",
  },
  cardTitle: {
    marginBottom: "10px",
    fontWeight: "600",
    fontSize: "20px",
    color: "#101828",
  },
  cardText: {
    fontSize: "16px",
    color: "#555",
  },
  money: {
    color: "#0988E3",
    fontWeight: "600",
    fontSize: "14px",
  },
  call: {
    background: "#0988E3",
    border: "none",
    color: "#fff",
    borderRadius: "6px",
    gap: "4px",
    padding: "4px 9px",
    fontSize: "14px",
    cursor: "pointer",
  },
};
