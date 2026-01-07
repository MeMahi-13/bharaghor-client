import React, { useState } from "react";
import './Home.css';
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaBuilding } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import SwiperSlider from "../../Components/SwiperSlider";



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
    
     
<SwiperSlider/>
      
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
      <div className="featured-place-body">
        {featuredPlaces.map((place, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            {/* Image */}
            <div className="house-item-img-container" style={{ position: "relative" }}>
              <img src={place.image} alt={place.title} style={styles.cardImageHorizontal} onClick={() => navigate("/details")}/>              
              <div
                className="add"
                onClick={() => toggleBookmark(index)}>
                {place.bookmarked ? (
                  <BsBookmarkFill color="#007BFF" size={20} />
                ) : (
                  <BsBookmark color="#A1A8B0" size={20} />
                )}
              </div>
            </div>
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
                <button style={styles.call} className="border py-2 px-3 flex items-center"><IoCallOutline />Call</button>
              </div>
            </div>
          </div>
        ))}
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
    marginTop:"18px",
  },
  cardImageHorizontal: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  cardContent: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  cardTitle: {
    marginBottom: "10px",
    fontWeight:"600",
    fontSize:"20px",
    lineHeight:"100%",
    color:"#101828",
  },
  cardText: {
    fontSize: "16px",
    color: "#555",
  },
  
  title:{
    paddingTop:"20px",
    paddingBottom:"20px",
    fontWeight:"600",
    fontSize:"24px",

  },
  money:{
    color:"#0988E3",
    fontWeight:"600",
  fontSize:"14px",  },
  call:{
background:"#0988E3",
border:"none",
color:"#FFFFFF",
borderRadius:"6px",
gap:"4px",
padding:"4px 9px",
fontWeight:"400",
fontSize:"14px",
cursor:"pointer",
  },

};
