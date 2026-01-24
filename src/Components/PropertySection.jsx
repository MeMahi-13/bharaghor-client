import PropertyCard from "./PropertyCard";

const PropertySection = ({ places, onToggleBookmark }) => {
  if (!places.length) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>No properties found</p>;
  }

  return (
    <div className="mt-5" style={{ paddingTop: "20px" }}>
        {/* <h1 className="text-2xl font-semibold py-10 ">Featured Properties</h1> */}
      <PropertyCard places={places} onToggleBookmark={onToggleBookmark} />
    </div>
  );
};

export default PropertySection;
