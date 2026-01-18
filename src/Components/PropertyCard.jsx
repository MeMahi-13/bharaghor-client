// PropertyCard.js
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaBuilding } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { Link } from "react-router-dom";

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
        display: "flex-1",
        gap: "20px",
        flexWrap: "wrap", 
      }}
    >
      {displayPlaces.map((place, index) =>
        place ? (
          <div
            key={index}
            style={{
              flex: "1 1 calc(25% - 15px)", 
              display: "flex",
              flexDirection: "column",
              border:"1px solid #E5E7EB",
              borderRadius:"12px",
              paddingBottom:"16px",
               boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 8px 0 rgba(0, 0, 0, 0.2)",
             background:"#ffffff",
            }}
          >
            {/* Image */}
            <div style={{ position: "relative" }}>
  <Link
    to="/card_details"
    state={{ place }}
    style={{ display: "block" }}
  >
    <img
      src={place.image}
      alt={place.title}
      style={{
        ...styles.cardImageHorizontal,
        cursor: "pointer",
      }}
    />
  </Link>
</div>


            {/* Content */}
             {/* Description */}

                        <div style={styles.cardContent}>
                          <h2 style={styles.cardTitle}>{place.title}</h2>
                          <div className="flex items-center gap-0.5">
                            <CiLocationOn />
                            <p style={styles.cardText}>{place.location}</p>
                          </div>
                          <div className="flex items-center gap-0.5">
                            <IoHomeOutline />
                            <p style={styles.cardText}>{place.home}</p>
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
                            <div style={styles.money} className="border-none py-2 px-3">TK 12000</div>
                            <button style={styles.call} className="border py-2 px-3 flex items-center"><MdOutlineMessage />Message</button>
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
    marginTop:"",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: "10px",
     paddingLeft:"13px",
     
      
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
