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

const PostDetails = () => {
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
    <div
      style={{
        maxWidth: "100%",
        padding: "80px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
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
              <img src={img} alt={place.title} style={styles.image} />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide style={styles.slide}>
            <p>No images available</p>
          </SwiperSlide>
        )}
      </Swiper>

      {/* BASIC INFO */}
      <div className="border border-gray-300 rounded px-3 py-5 shadow mt-6">
        <h2 style={{ fontSize: "28px", fontWeight: "600" }}>
          {place.title}
        </h2>

        <div className="flex  justify-between gap-4 mt-2">
          <p className="flex items-center gap-1">
            <CiLocationOn /> {place.location}
          </p>
          <p className="flex items-center gap-1">
            <IoHomeOutline /> {place.houseNo}
          </p>
          <p className="flex items-center gap-1">
            <SlCalender /> {place.availableDate}
          </p>
          <p className="flex items-center gap-1">
            <FaBuilding /> {place.category}
          </p>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="border rounded border-gray-300 px-3 py-5 shadow mt-8">
        <h2 className="font-semibold text-3xl">House Details</h2>
        <p>{place.description}</p>
      </div>

      {/* RENT INFO */}
      <div className="border rounded border-gray-300 px-3 py-5 shadow mt-8">
        <h2 className="font-semibold text-3xl">Recent Details</h2>
        <div className="flex gap-6 mt-6">
          <Info label="Rent" value={`৳ ${place.rent}`} />
          <Info label="Lease Term" value={place.leaseTerm} />
          <Info label="Available From" value={place.availableDate} />
        </div>
      </div>

      {/* FEATURES */}
      <div className="border rounded border-gray-300 px-3 py-5 shadow mt-8">
        <h2 className="text-2xl font-semibold">Property Features</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Feature label="Floor" value={place.floor} />
          <Feature label="Bedroom" value={place.bedroom} />
          <Feature label="Common Bath" value={place.commonBath} />
          <Feature label="Balcony" value={place.balcony} />
          <Feature label="Furnished" value={place.furnished} />
          <Feature label="Parking" value={place.parking} />
        </div>
      </div>

      {/* UTILITIES */}
      <div className="border rounded border-gray-300 px-3 py-5 shadow mt-8">
        <h2 className="font-semibold text-3xl">Utilities & Amenities</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Feature label="Water" value={place.water} />
          <Feature label="Electricity" value={place.electricity} />
          <Feature label="Gas" value={place.gas} />
          <Feature label="Security" value={place.security} />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

function Feature({ label, value }) {
  return (
    <div className="border flex justify-between px-3 py-2 rounded-md border-blue-300">
      <span>{label}</span>
      <span>{value ?? "N/A"}</span>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="border flex justify-between rounded-md border-blue-300 px-3 py-2 w-1/3">
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
}
const styles = {
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
