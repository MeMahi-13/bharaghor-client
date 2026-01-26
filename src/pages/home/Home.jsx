import React, { useState, useContext, useRef, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import SwiperSlider from "../../Components/SwiperSlider";
import HouseCategory from "../../Components/HouseCategory";
import LocationFilter from "../../Components/LocationFilter";
import PropertySection from "../../Components/PropertySection";
import { AuthContext } from "../../context/AuthContext";
import { usePosts } from "../../hooks/usePosts";
import "./Home.css"; // Import CSS for loader & animations
import Contact from "./Contact";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { places, loading, toggleBookmark } = usePosts(user);

  const [selectedType, setSelectedType] = useState("All");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Ref to property section for scrolling
  const propertyRef = useRef(null);

  // Filtered places
  const filtered = places
    .filter((p) => selectedType === "All" || p.houseType === selectedType)
    .filter(
      (p) =>
        (!selectedDivision || p.division === selectedDivision) &&
        (!selectedDistrict || p.district === selectedDistrict) &&
        (!selectedUpazila || p.upazila === selectedUpazila)
    )
    .filter(
      (p) =>
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Scroll to PropertySection whenever filters or type change
  useEffect(() => {
    if (propertyRef.current) {
      propertyRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedType, selectedDivision, selectedDistrict, selectedUpazila, searchQuery]);

  if (loading)
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p className="loader-text">Loading approved posts...</p>
      </div>
    );

  return (
    <div className="home-page fade-in">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="mx-auto max-w-6xl pt-10 px-4">
        <SwiperSlider />

        <HouseCategory
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />

        <LocationFilter
          selectedDivision={selectedDivision}
          selectedDistrict={selectedDistrict}
          selectedUpazila={selectedUpazila}
          setSelectedDivision={setSelectedDivision}
          setSelectedDistrict={setSelectedDistrict}
          setSelectedUpazila={setSelectedUpazila}
        />

        {/* Scroll target */}
        <div ref={propertyRef}>
          <PropertySection
            className="fade-in"
            places={filtered}
            onToggleBookmark={toggleBookmark}
            animated
          />
        </div>
      </div>
      <Contact/>
    </div>
  );
};

export default Home;
