import { useLocation ,useNavigate} from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaBuilding } from "react-icons/fa";
import {Swiper, SwiperSlide } from "swiper/react";
import {  Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
const CardDetails = () => {
   const navigate = useNavigate();
  const { state } = useLocation();
  const place = state?.place;

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
        width: "100%",
        padding: "80px",
        margin: "0 auto",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
        <Swiper
              
                spaceBetween={30}
                slidesPerView={1}
                
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop
                modules={[ Pagination, Autoplay]}
              >
                <SwiperSlide style={styles.slide}>
                 <img src={place.image} alt={place.title}  style={styles.image} />
               </SwiperSlide>
               <SwiperSlide style={styles.slide}>
                 <img src={place.image} alt={place.title}  style={styles.image} />
               </SwiperSlide>
              </Swiper>
        
               {/*  <img
        src={place.image}
        alt={place.title}
        style={{
          width: "100%",
          height: "400px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "20px",
         
        }}
      /> */}
     
      {/* House details:title,location,house no,date,housetype */}
      <div className="border border-[#E5E7EB] px-3 py-2 shadow-[0_0_4px_0_rgba(0,0,0,0.15)]">
        <h2 style={{ fontSize: "28px", fontWeight: "600" }}>{place.title}</h2>
      <div style={{ display: "flex", flexDirection: "row",justifyContent:"space-between", gap: "10px" }}>
        <p className="flex items-center gap-1"><strong><CiLocationOn /></strong> {place.location}</p>
        <p className="flex items-center gap-1"><strong>< IoHomeOutline /></strong> {place.home}</p>
        <p className="flex items-center gap-1"><strong><SlCalender /></strong> {place.date}</p>
        <p className="flex items-center gap-1"> <strong>< FaBuilding /></strong> {place.houseType}</p>
      </div>

    </div>
     {/* House details */}
      <div className="border border-[#E5E7EB] px-3 py-2 shadow-[0_0_4px_0_rgba(0,0,0,0.15)] mt-8">
        <h2 className="font-semibold text-3xl leading-[1.2] text-[#101828]">House Details</h2>
      <p className="font-normal text-base leading-[1.2] text-[#101828]">Lorem ipsum dolor sit amet consectetur. Ornare felis nulla sit aliquam tortor suscipit dolor. Montes vulputate nisl quam elit cras nec nisi a. Id turpis quam ipsum eleifend.Lorem ipsum dolor sit amet consectetur. 
        Ornare felis nulla sit aliquam tortor suscipit dolor. Montes vulputate nisl quam elit cras nec nisi a. Id turpis quam ipsum eleifend.</p>

    </div>
       {/* Recent Details */}
      <div className="border border-[#E5E7EB] px-3 py-2 shadow-[0_0_4px_0_rgba(0,0,0,0.15)] mt-8">
        <h2 className="font-semibold text-3xl leading-[1.2] text-[#101828]">Recent Details</h2>
      <div className="w-full flex gap-6  justify-between mt-6">
        
<div className="border flex justify-between rounded-md border-[#0988E3] px-3 py-2   w-1/3 ">
     <p>Recent details</p>  
     <p>10000</p> 

    </div>
    <div className="border flex justify-between rounded-md border-[#0988E3] px-3 py-2   w-1/3 ">
        <p>Lease Term</p>  
     <p>6 to 12 mon</p> 

    </div>
    <div className="border flex justify-between rounded-md border-[#0988E3] px-3 py-2   w-1/3 ">
        <p>Availability Date</p>  
     <p>1 Jan 2025</p>  

    </div>
      </div>

    </div>
   {/* Property Features */}
<div className="border border-[#E5E7EB] px-3 py-2 shadow-[0_0_4px_0_rgba(0,0,0,0.15)] mt-8">
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

     {/* Utilities and Amenities */}
      <div className="border border-[#E5E7EB] px-3 py-2 shadow-[0_0_4px_0_rgba(0,0,0,0.15)] mt-8">
        <h2 className="font-semibold text-3xl leading-[1.2] text-[#101828]">Utilities and Amenities</h2>
     <div className="grid grid-cols-3 gap-4 mt-4">
    <Feature label="Water" value={place.Water} />
    <Feature label="Electricity" value={place.electricity} />
    <Feature label="Security" value={place.security} />
    <Feature label="Gas" value={place.gas} />
  </div>


    </div>
      </div>

  );
};

export default CardDetails;
const styles = {
  slide: {
    background: "#ffffff",
    height: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    height: "350px",
    objectFit: "cover",
    borderRadius: "10px",
  },
};
function Feature({ label, value }) {
  return (
    <div className="border flex justify-between px-3 py-2 rounded-md border-[#0988E3]">
      <span>{label}</span>
      <span>
        {value === "yes" ? "Yes" :
         value === "no" ? "No" :
         value || "N/A"}
      </span>
    </div>
  );
}

