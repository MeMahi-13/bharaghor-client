// PropertyCard.js
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaBuilding } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
function PropertyCard({ places }) {
  const navigate = useNavigate();

  // Always make an array of 4 slots
  const totalSlots = 4;
  const displayPlaces = [...places];

  // Fill empty slots with null
  while (displayPlaces.length < totalSlots) {
    displayPlaces.push(null);
  }

  return (
    <div
      className="featured-place-body"
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap", // wrap in one row
      }}
    >
      {displayPlaces.map((place, index) =>
        place ? (
          <div
            key={index}
            style={{
              flex: "1 1 calc(25% - 15px)", // 4 cards per row
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Image */}
            <div style={{ position: "relative" }}>
              <img
                src={place.image}
                alt={place.title}
                style={styles.cardImageHorizontal}
                onClick={() => navigate("/details")}
              />
            </div>

            {/* Content */}
            <div style={styles.cardContent}>
              <h2 style={styles.cardTitle}>{place.title}</h2>
              <p style={styles.cardText}>{place.location}</p>
              <p style={styles.cardText}>{place.home}</p>
              <p style={styles.cardText}>{place.date}</p>
              <p style={styles.cardText}>{place.houseType}</p>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <div style={styles.money}>TK 12000</div>
                <button style={styles.call}>Call</button>
              </div>
            </div>
          </div>
        ) : (
          // Empty placeholder for missing cards
          <div
            key={index}
            style={{ flex: "1 1 calc(25% - 15px)" }}
          ></div>
        )
      )}
    </div>
  );
}

export default PropertyCard;

// same styles as before
const styles = {
  cardImageHorizontal: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
    marginTop:"24px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "10px",
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
    color: "#FFFFFF",
    borderRadius: "6px",
    gap: "4px",
    padding: "4px 9px",
    fontWeight: "400",
    fontSize: "14px",
    cursor: "pointer",
  },
};
