// @flow strict
import * as React from "react";
import HouseCategory from "./HouseCategory";
import PropertyCard from "./PropertyCard";

function PropertyPage({ onToggleBookmark }) {
  const [selectedType, setSelectedType] = React.useState("All");
  const [places, setPlaces] = React.useState([]);

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

  return (
    <div>
      <HouseCategory
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />

      <PropertyCard
        places={filteredPlaces}
        onToggleBookmark={onToggleBookmark}
      />
    </div>
  );
}

export default PropertyPage;
