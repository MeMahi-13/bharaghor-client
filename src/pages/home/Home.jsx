import React, { useState, useContext, useRef, useEffect, useMemo } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../Components/css/Navbar";
import SwiperSlider from "../../Components/SwiperSlider";
import HouseCategory from "../../Components/HouseCategory";
import LocationFilter from "../../Components/LocationFilter";
import PropertySection from "../../Components/PropertySection";
import Contact from "./Contact";
import { usePosts } from "../../hooks/usePosts";
import PropertyCardSkeleton from "../../Components/PropertyCardSkeleton";

const Home = () => {
  const getLS = (key, fallback) => {
    const value = localStorage.getItem(key);
    return value !== null ? value : fallback;
  };

  const { user } = useContext(AuthContext);

  const [searchQuery, setSearchQuery] = useState(
    () => localStorage.getItem("searchQuery") || "",
  );
  const [selectedType, setSelectedType] = useState(
    () => localStorage.getItem("selectedType") || "All",
  );
  const [selectedDivision, setSelectedDivision] = useState(
    () => localStorage.getItem("selectedDivision") || "",
  );
  const [selectedDistrict, setSelectedDistrict] = useState(
    () => localStorage.getItem("selectedDistrict") || "",
  );
  const [selectedUpazila, setSelectedUpazila] = useState(
    () => localStorage.getItem("selectedUpazila") || "",
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

  
  const filtered = useMemo(() => {
    let result = places
      .filter((p) => selectedType === "All" || p.houseType === selectedType)
      .filter(
        (p) =>
          (!selectedDivision || p.division === selectedDivision) &&
          (!selectedDistrict || p.district === selectedDistrict) &&
          (!selectedUpazila || p.upazila === selectedUpazila),
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
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = false;
      return; 
    }

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

  const AnimatedCounter = ({ value, duration = 1500 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const increment = value / (duration / 16);
      let frame;

      const animate = () => {
        start += increment;
        if (start < value) {
          setCount(Math.ceil(start));
          frame = requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };

      animate();

      return () => cancelAnimationFrame(frame);
    }, [value, duration]);

    return <span>{count}</span>;
  };
  const staticStats = [
    { label: "Properties", value: 12000 },
    { label: "Districts", value: 64 },
    { label: "Happy Clients", value: 8500 },
  ];

  return (
    <div className="home-page fade-in">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* ================= HERO SECTION ================= */}
      <div className="relative h-[85vh] w-full flex items-center justify-center">
        {/* Swiper Background */}
        <SwiperSlider />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10"></div>

        {/* Hero Content */}
        <div className="absolute z-20 text-center max-w-5xl px-4 w-full">
          {/* Headline */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-500 leading-tight">
            Find Your Perfect Dream Home
          </h1>

          <p className="mt-4 text-sm md:text-lg text-gray-200">
            Discover flats, houses & rentals across Bangladesh easily and
            quickly
          </p>

          {/* CTA Button */}
          <button
            onClick={() =>
              propertyRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="mt-6 bg-orange-500 hover:bg-orange-600 transition duration-300 px-6 py-3 rounded-full text-white font-semibold shadow-xl"
          >
            Browse Properties
          </button>

          {/* Glassmorphism Filter Box */}
          <div className="mt-10 bg-white/10 backdrop-blur-lg p-4 rounded-xl">
            <p className="text-white text-sm mb-4 font-medium">
              Select your preferred location
            </p>

            <LocationFilter
              selectedDivision={selectedDivision}
              selectedDistrict={selectedDistrict}
              selectedUpazila={selectedUpazila}
              setSelectedDivision={setSelectedDivision}
              setSelectedDistrict={setSelectedDistrict}
              setSelectedUpazila={setSelectedUpazila}
            />
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center gap-8 mt-10 text-white text-center flex-wrap">
            {staticStats.map((stat, index) => (
              <div key={index}>
                <h3 className="text-3xl font-bold">
                  <AnimatedCounter value={stat.value} />
                  {stat.label === "Properties" && "+"}
                  {stat.label === "Happy Clients" && "+"}
                </h3>
                <p className="text-sm text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ================= END HERO ================= */}

      <div className="mx-auto max-w-6xl px-4 mt-12">
        <HouseCategory
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />

        {/* SORT UI */}
        <div className="flex items-center mt-4 justify-end gap-2">
          <p className="text-black text-xs font-medium md:text-[13px]">
            Sort by:
          </p>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-2 py-1 rounded text-sm"
          >
            <option value="">Default</option>
            <option value="lowToHigh">Price (Low → High)</option>
            <option value="highToLow">Price (High → Low)</option>
          </select>
        </div>

        {/* Property Section */}
        <div ref={propertyRef} className="mt-6">
          {loading ? (
            <PropertyCardSkeleton count={6} />
          ) : (
            <PropertySection
              className="fade-in"
              places={filtered}
              onToggleBookmark={toggleBookmark}
              animated
            />
          )}
        </div>
      </div>

      <Contact />
    </div>
  );
};

export default Home;
