// @flow strict
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Import modules
import { Navigation, Pagination } from "swiper/modules";
function details() {
    // Array to track which cards are bookmarked
  const featuredPlacesInitial = [   
    {
      image: "/images/slider.png",
      title: "Apartment 2",
      location: "Road No 7, Sector 10, Uttara",
      home: "House No: 10",
      date: "Date: 10-10-2025",
      houseType: "Family Flat",
    },
  ];
  const [featuredPlaces, setFeaturedPlaces] = useState(
      featuredPlacesInitial.map(place => ({ ...place, bookmarked: false }))
    );
    return (
        <div>
           {/* Swiper */}
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
      >
        <SwiperSlide style={styles.slide}>
          <img src="/images/slider.png" alt="" style={styles.image} />
        </SwiperSlide>
        <SwiperSlide style={styles.slide}>Slide 2</SwiperSlide>
        <SwiperSlide style={styles.slide}>Slide 3</SwiperSlide>
        <SwiperSlide style={styles.slide}>Slide 4</SwiperSlide>
      </Swiper>
      <h2 className="details-title">House for rent</h2>
      {/* Featured Places */}
            <h5 style={styles.title}>Featured Place</h5>
            <div className="featured-place-body">
              {featuredPlaces.map((place, index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                 
                  {/* Description */}
                  <div style={styles.cardContent}>
                    <h2 style={styles.cardTitle}>{place.title}</h2>
                    <div className="flex items-center gap-0.5">
                      <CiLocationOn />
                      <p style={styles.cardlocation}>{place.location}</p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <IoHomeOutline />
                      <p style={styles.cardhome}>{place.home}</p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <SlCalender />
                      <p style={styles.cardDate}>{place.date}</p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <FaBuilding />
                      <p style={styles.cardhouseType}>{place.houseType}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div style={styles.money} className="border-none py-2 px-3">TK 12000</div>
                      <button style={styles.call} className="border py-2 px-3 flex items-center"><IoCallOutline />Call</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
    );
};
export default details;
const styles = {
  slide: {
    background: "#ffffff",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
 
image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
  },
detailsTitle:{
    fontWeight:"600",
    fontSize:"24px",
    color:"#101828",
}
 
};