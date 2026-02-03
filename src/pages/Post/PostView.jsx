import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaBuilding } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const PostView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://yessghor-server.vercel.app/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPlace(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-center p-10">Loading...</p>;
  }

  if (!place) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">No property data found.</p>
        <button
          onClick={() => navigate("/post")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      {/* IMAGE SLIDER */}
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        modules={[Pagination, Autoplay]}
      >
        {place.images?.length > 0 ? (
          place.images.map((img, index) => (
            <SwiperSlide key={index} style={styles.slide}>
              <img src={img} alt="Property" style={styles.image} />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide style={styles.slide}>
            <p>No images available</p>
          </SwiperSlide>
        )}
      </Swiper>

      {/* BASIC INFO */}
      <div className="mt-6">
        <h2 className="text-3xl font-semibold">{place.title}</h2>

        <div className="flex flex-wrap gap-6 mt-3 text-gray-700">
          <p className="flex items-center gap-1">
            <CiLocationOn /> {place.location}
          </p>
          <p className="flex items-center gap-1">
            <IoHomeOutline /> House No: {place.houseNo}
          </p>
          <p className="flex items-center gap-1">
            <SlCalender /> Available: {place.availableDate}
          </p>
          <p className="flex items-center gap-1">
            <FaBuilding /> {place.category}
          </p>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-8">
        <h2 className="font-semibold text-2xl">House Details</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          {place.description || "No description available"}
        </p>
      </div>

      {/* RECENT DETAILS */}
      <div className="mt-8">
        <h2 className="font-semibold text-2xl">Recent Details</h2>
        <div className="flex flex-wrap gap-10 mt-4 text-lg text-gray-700">
          <p><strong>Rent:</strong> {place.rent}</p>
          <p><strong>Lease Term:</strong> {place.leaseTerm}</p>
          <p><strong>Available From:</strong> {place.availableDate}</p>
        </div>
      </div>

      {/* PROPERTY FEATURES */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Property Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 mt-4 text-gray-700">
          <p><strong>Floor:</strong> {place.floor}</p>
          <p><strong>Bedroom:</strong> {place.bedroom}</p>
          <p><strong>Balcony:</strong> {place.balcony}</p>
          <p><strong>Furnished:</strong> {place.furnished ? "Yes" : "No"}</p>
          <p><strong>Parking:</strong> {place.parking ? "Yes" : "No"}</p>
        </div>
      </div>

      {/* UTILITIES */}
      <div className="mt-8">
        <h2 className="font-semibold text-2xl">Utilities & Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 mt-4 text-gray-700">
          <p><strong>Water:</strong> {place.water ? "Yes" : "No"}</p>
          <p><strong>Electricity:</strong> {place.electricity ? "Yes" : "No"}</p>
          <p><strong>Gas:</strong> {place.gas ? "Yes" : "No"}</p>
          <p><strong>Security:</strong> {place.security ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );
};

export default PostView;

const styles = {
  wrapper: {
    maxWidth: "100%",
    padding: "80px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  slide: {
    height: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "350px",
    objectFit: "cover",
    borderRadius: "10px",
  },
};
