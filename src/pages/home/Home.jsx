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
  const getLS = (key, fallback) => {
  const value = localStorage.getItem(key);
  return value !== null ? value : fallback;
};

  const { user } = useContext(AuthContext);

  const [searchQuery, setSearchQuery] = useState(
    () => localStorage.getItem("searchQuery") || ""
  );
  const [selectedType, setSelectedType] = useState(
    () => localStorage.getItem("selectedType") || "All"
  );
  const [selectedDivision, setSelectedDivision] = useState(
    () => localStorage.getItem("selectedDivision") || ""
  );
  const [selectedDistrict, setSelectedDistrict] = useState(
    () => localStorage.getItem("selectedDistrict") || ""
  );
  const [selectedUpazila, setSelectedUpazila] = useState(
    () => localStorage.getItem("selectedUpazila") || ""
  );
  const [sortBy, setSortBy] = useState(() => getLS("sortBy", ""));

  

  const { places, loading, toggleBookmark } = usePosts(user);
  const propertyRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
    localStorage.setItem("selectedType", selectedType);
    localStorage.setItem("selectedDivision", selectedDivision);
    localStorage.setItem("selectedDistrict", selectedDistrict);
    localStorage.setItem("selectedUpazila", selectedUpazila);
    localStorage.setItem("sortBy", sortBy);
  }, [
    searchQuery,
    selectedType,
    selectedDivision,
    selectedDistrict,
    selectedUpazila,
     sortBy,
  ]);

  // 🔹 Filter + Sort
  const filtered = useMemo(() => {
    let result = places
      .filter((p) => selectedType === "All" || p.houseType === selectedType)
      .filter(
        (p) =>
          (!selectedDivision || p.division === selectedDivision) &&
          (!selectedDistrict || p.district === selectedDistrict) &&
          (!selectedUpazila || p.upazila === selectedUpazila)
      )
      .filter((p) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          p.title?.toLowerCase().includes(q) ||
          p.division?.toLowerCase().includes(q) ||
          p.district?.toLowerCase().includes(q) ||
          p.upazila?.toLowerCase().includes(q)
        );
      });

    // 🔹 SORTING LOGIC
    if (sortBy === "lowToHigh") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sortBy === "highToLow") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [
    places,
    selectedType,
    selectedDivision,
    selectedDistrict,
    selectedUpazila,
    searchQuery,
    sortBy,
  ]);

  useEffect(() => {
    if (propertyRef.current) {
      propertyRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [
    selectedType,
    selectedDivision,
    selectedDistrict,
    selectedUpazila,
    searchQuery,
    sortBy,
  ]);

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

      <div className="mx-auto max-w-6xl pt-20 px-4">
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

        {/*  SORT UI */}
        <div className="flex items-center mt-4 justify-end gap-2">
          <p className="text-black text-xs font-medium md:text-[13px]">
            Sort by:
          </p>

          <select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)
    
  } className="border px-2 py-1 rounded text-sm"
>
  <option value="">Default</option>
  <option value="lowToHigh">Price (Low → High)</option>
  <option value="highToLow">Price (High → Low)</option>
</select>

        </div>

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
