import * as React from "react";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaBuilding } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

function PropertyCard({ places = [], onToggleBookmark }) {
  const totalSlots = 4;
  const displayPlaces = [...places];

  while (displayPlaces.length < totalSlots) displayPlaces.push(null);

  return (
    <div
      className="featured-place-body"
      style={{
        display: "flex-1",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      {displayPlaces.map((place, index) =>
        place ? (
          <div
            key={place._id || index}
            style={{
              flex: "1 1 calc(25% - 15px)",
              display: "flex",
              flexDirection: "column",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              paddingBottom: "16px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
              background: "#ffffff",
            }}
          >
            {/* IMAGE + BOOKMARK */}
            <div style={{ position: "relative" }}>
              <Link
              
             to={`/details/${place._id}`}

                style={{ display: "block" }}
              >
                <img
                  src={place.image}
                  alt={place.title}
                  style={styles.cardImageHorizontal}
                />
              </Link>

              {onToggleBookmark && (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleBookmark(place._id, index);
                  }}
                  style={styles.bookmark}
                >
                  {place.bookmarked ? (
                    <BsBookmarkFill size={18} color="#007BFF" />
                  ) : (
                    <BsBookmark size={18} color="#A1A8B0" />
                  )}
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div style={styles.cardContent}>
              <h2 style={styles.cardTitle}>{place.title}</h2>

              <div style={styles.row}>
                <CiLocationOn />
                <p style={styles.cardText}>{place.location}</p>
              </div>

              <div style={styles.row}>
                <IoHomeOutline />
                <p style={styles.cardText}>{place.houseNo}</p>
              </div>

              <div style={styles.row}>
                <SlCalender />
                <p style={styles.cardText}>{place.date}</p>
              </div>

              <div style={styles.row}>
                <FaBuilding />
                <p style={styles.cardText}>{place.houseType}</p>
              </div>

              <div style={styles.bottomRow}>
                <div style={styles.money}>TK {place.price}</div>
                <button style={styles.call}>
                  <MdOutlineMessage /> Message
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div key={index} style={{ flex: "1 1 calc(25% - 15px)" }} />
        ),
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
    cursor: "pointer",
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
    fontSize: "15px",
    color: "#555",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  bottomRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
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
    padding: "6px 10px",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
};
