import React, { useState,useEffect } from "react";
import "./Home.css";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import SwiperSlider from "../../Components/SwiperSlider";
import ApprovedPosts from "./ApprovedPost";
import PropertyCard from "../../Components/PropertyCard";
import HouseCategory from "../../Components/HouseCategory";
const Home = () => {
  const [values, setValues] = useState({
    city: "",
    category: "",
    price: "",
  });
  const navigate = useNavigate();

const baseUrl = "https://bdapis.vercel.app/geo/v2.0";

  
  const [formData, setFormData] = useState({
    title: "",
    division: "",
    district: "",
    upazila: "",
    location: "",
    houseNo: "",
    category: "",
    rent: "",
    deposit: "",
    leaseTerm: "",
    availableDate: "",
    description: "",
    floor: "",
    furnished: "no",
    parking: "",
    bedroom: "",
    commonBath: "",
    balcony: "",
    water: "",
    electricity: "",
    gas: "no",
    security: "",
  });
  // Array to track which cards are bookmarked
  const featuredPlacesInitial = [
    
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
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
  
    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedUpazila, setSelectedUpazila] = useState("");
  
    // Fetch Divisions on mount
    useEffect(() => {
      fetch(`${baseUrl}/divisions`)
        .then((res) => res.json())
        .then((res) => setDivisions(res.data || []))
        .catch((err) => console.error(err));
    }, []);
  
    // Handle Division change
    const handleDivisionChange = (e) => {
      const divisionId = e.target.value;
      const divisionObj = divisions.find((d) => d.id === divisionId);
  
      setSelectedDivision(divisionId);
      setSelectedDistrict("");
      setSelectedUpazila("");
      setDistricts([]);
      setUpazilas([]);
  
      setFormData((prev) => ({
        ...prev,
        division: divisionObj?.name || "",
        district: "",
        upazila: "",
      }));
  
      if (!divisionId) return;
  
      fetch(`${baseUrl}/districts/${divisionId}`)
        .then((res) => res.json())
        .then((res) => setDistricts(res.data || []))
        .catch((err) => console.error(err));
    };
  
    // Handle District change
    const handleDistrictChange = (e) => {
      const districtId = e.target.value;
      const districtObj = districts.find((d) => d.id === districtId);
  
      setSelectedDistrict(districtId);
      setSelectedUpazila("");
      setUpazilas([]);
  
      setFormData((prev) => ({
        ...prev,
        district: districtObj?.name || "",
        upazila: "",
      }));
  
      if (!districtId) return;
  
      fetch(`${baseUrl}/upazilas/${districtId}`)
        .then((res) => res.json())
        .then((res) => setUpazilas(res.data || []))
        .catch((err) => console.error(err));
    };
  
    // Handle Upazila change
    const handleUpazilaChange = (e) => {
      const upazilaName = e.target.value;
      setSelectedUpazila(upazilaName);
      setFormData((prev) => ({ ...prev, upazila: upazilaName }));
    };
  

  return (
    <div className="mx-auto max-w-6xl py-5">


      <SwiperSlider />


      <div className="mt-8" style={styles.selectrow}>
       
        {/* Division */}
            <select
              value={selectedDivision}
              onChange={handleDivisionChange}
             style={styles.select}
            >
              <option value=""> Division</option>
              {divisions.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            {/* District */}
            <select
              value={selectedDistrict}
              onChange={handleDistrictChange}
              disabled={!districts.length}
             style={styles.select}
            >
              <option value=""> District</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            {/* Upazila */}
            <select
              value={selectedUpazila}
              onChange={handleUpazilaChange}
              disabled={!upazilas.length}
             style={styles.select}
            >
              <option value="">Thana</option>
              {upazilas.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
      </div>

      {/* Featured Places */}
      
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
      {/* fetch post */}
      <ApprovedPosts />
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
