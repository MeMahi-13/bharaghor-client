// @flow strict
import * as React from "react";
import HouseCategory from "./HouseCategory";
import PropertyCard from "./PropertyCard";

function PropertyPage({ onToggleBookmark }) {
  const [selectedType, setSelectedType] = React.useState("All");
  const [places, setPlaces] = React.useState([]);
  const [language, setLanguage] = React.useState("en"); 

  // Fetch all posts once
  React.useEffect(() => {
    fetch("https://yessghor-server.vercel.app/posts")
      .then((res) => res.json())
      .then((data) => setPlaces(data))
      .catch(console.error);
  }, []);

  // Filtered places according to selectedType
  const filteredPlaces =
    selectedType === "All"
      ? places
      : places.filter(
          (place) =>
            place.houseType?.toLowerCase() === selectedType.toLowerCase()
        );

  // Toggle language
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "bn" : "en"));
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      {/* Language Switch Button */}
      <div className="text-right mb-4">
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-[#1b4965] text-white rounded hover:bg-[#073032]"
        >
          {language === "en" ? "বাংলা" : "English"}
        </button>
      </div>

      {/* HouseCategory */}
      <HouseCategory
        selectedType={selectedType}
        onSelectType={setSelectedType}
        language={language} 
      />

      {/* Property cards */}
      <PropertyCard places={filteredPlaces} onToggleBookmark={onToggleBookmark} />
    </div>
  );
}

export default PropertyPage;
