import React, { useState, useContext, useRef, useEffect, useMemo } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../Components/css/Navbar";
import SwiperSlider from "../../Components/SwiperSlider";
import HouseCategory from "../../Components/HouseCategory";
import LocationFilter from "../../Components/LocationFilter";
import PropertySection from "../../Components/PropertySection";
import Contact from "./Contact";
import { usePosts } from "../../hooks/usePosts";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const { places, loading, toggleBookmark } = usePosts(user);

  const [selectedType, setSelectedType] = useState("All");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");

  const propertyRef = useRef(null);

  // Filtered places
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return places
      .filter((p) => selectedType === "All" || p.houseType === selectedType)
      .filter(
        (p) =>
          (!selectedDivision || p.division === selectedDivision) &&
          (!selectedDistrict || p.district === selectedDistrict) &&
          (!selectedUpazila || p.upazila === selectedUpazila)
      )
      .filter((p) => {
        if (!q) return true;
        return (
          p.title?.toLowerCase().includes(q) ||
          p.division?.toLowerCase().includes(q) ||
          p.district?.toLowerCase().includes(q) ||
          p.upazila?.toLowerCase().includes(q)
        );
      });
  }, [places, selectedType, selectedDivision, selectedDistrict, selectedUpazila, searchQuery]);

  // Scroll to property section on filter/search change
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
    <div className="home-page  fade-in">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="mx-auto max-w-6xl pt-20 px-4">
        <SwiperSlider />

        <HouseCategory selectedType={selectedType} onSelectType={setSelectedType} />

        <LocationFilter
          selectedDivision={selectedDivision}
          selectedDistrict={selectedDistrict}
          selectedUpazila={selectedUpazila}
          setSelectedDivision={setSelectedDivision}
          setSelectedDistrict={setSelectedDistrict}
          setSelectedUpazila={setSelectedUpazila}
        />

        <div ref={propertyRef}>
          <PropertySection
            className="fade-in"
            places={filtered}
            onToggleBookmark={toggleBookmark}
            animated
          />
        </div>
      </div>


      <Contact />
    </div>
  );
};

export default Home;
