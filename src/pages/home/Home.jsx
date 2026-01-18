import React, { useState } from "react";
import './Home.css';
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import SwiperSlider from "../../Components/SwiperSlider";
import PropertyCard from "../../Components/PropertyCard";
const Home = () => {
  const [values, setValues] = useState({
    city: "",
    category: "",
    price: "",
  });
  const navigate = useNavigate();


  // Array to track which cards are bookmarked
  const featuredPlacesInitial = [
    {
      image: "/images/slider.png",
      title: "2 Bedroom Flat For Rent",
      location: "Road No 7, Sector 10, Uttara",
      home: "House No: 10",
      date: "Date: 10-10-2025",
      houseType: "Family Flat",
    },
    {
      image: "/images/slider.png",
      title: "2 Bedroom Flat For Rent",
      location: "Road No 7, Sector 10, Uttara",
      home: "House No: 10",
      date: "Date: 10-10-2025",
      houseType: "Family Flat",
    },
    {
      image: "/images/slider.png",
      title: "2 Bedroom Flat For Rent",
      location: "Road No 7, Sector 10, Uttara",
      home: "House No: 10",
      date: "Date: 10-10-2025",
      houseType: "Family Flat",
    },
    {
      image: "/images/slider.png",
      title: "Apartment 2",
      location: "Road No 7, Sector 10, Uttara",
      home: "House No: 10",
      date: "Date: 10-10-2025",
      houseType: "Family Flat",
    },
    {
      image: "/images/slider.png",
      title: "Apartment 2",
      location: "Road No 7, Sector 10, Uttara",
      home: "House No: 10",
      date: "Date: 10-10-2025",
      houseType: "Family Flat",
    },
    {
      image: "/images/slider.png",
      title: "Apartment 2",
      location: "Road No 7, Sector 10, Uttara",
      home: "House No: 80",
      date: "Date: 10-10-2025",
      houseType: "Family Flat",
    },
  ];

  // Add a bookmarked state for each card
  const [featuredPlaces, setFeaturedPlaces] = useState(
    featuredPlacesInitial.map(place => ({ ...place, bookmarked: false }))
  );

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Toggle bookmark for a single card
  const toggleBookmark = (index) => {
    const updatedPlaces = [...featuredPlaces];
    updatedPlaces[index].bookmarked = !updatedPlaces[index].bookmarked;
    setFeaturedPlaces(updatedPlaces);
  };

  return (
    <div className="mx-auto max-w-6xl py-5">


      <SwiperSlider />


      <div style={styles.selectrow}>
        <select
          name="price"
          value={values.price}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="">District</option>
          <option value="10k">Below 10k</option>
          <option value="20k">10k – 20k</option>
          <option value="30k">Above 20k</option>
        </select>
        <select
          name="city"
          value={values.city}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="">City</option>
          <option value="10k">Below 10k</option>
          <option value="20k">10k – 20k</option>
          <option value="30k">Above 20k</option>
        </select>
        <select
          name="category"
          value={values.category}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="">Area</option>
          <option value="10k">Below 10k</option>
          <option value="20k">10k – 20k</option>
          <option value="30k">Above 20k</option>
        </select>
      </div>

      {/* Featured Places */}
      <h5 style={styles.title}>Featured Place</h5>
      <div style={{ position: "relative" }} >
        <PropertyCard places={featuredPlaces} />

        {/* Bookmark layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            paddingTop: "10px",
          }}
        >
          {featuredPlaces.map((place, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                pointerEvents: "auto",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  cursor: "pointer",
                  background: "#fff",
                  borderRadius: "50%",
                  padding: "6px",
                }}
                onClick={() => toggleBookmark(index)}
              >
                {place.bookmarked ? (
                  <BsBookmarkFill color="#007BFF" size={18} />
                ) : (
                  <BsBookmark color="#A1A8B0" size={18} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;


const styles = {
  slide: {
    background: "#ffffff",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  select: {
    flex: 1,
    height: "40px",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  selectrow: {
    display: "flex",
    gap: "15px",
    width: "100%",
    marginTop: "18px",
  },
  cardImageHorizontal: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  cardContent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  cardTitle: {
    marginBottom: "10px",
    marginTop: "10px",
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "100%",
    color: "#101828",

  },
  cardText: {
    fontSize: "16px",
    color: "#555",
  },

  title: {
    paddingTop: "20px",
    paddingBottom: "20px",
    fontWeight: "600",
    fontSize: "24px",

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
