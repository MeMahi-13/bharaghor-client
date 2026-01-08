// @flow strict
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {  Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

function SwiperSlider() {
  return (
    <div>
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
          <img src="/images/SI5.jpg" alt="" style={styles.image} />
        </SwiperSlide>
        <SwiperSlide style={styles.slide}>
          <img src="/images/SI2.jpg" alt="" style={styles.image} />
        </SwiperSlide>
        <SwiperSlide style={styles.slide}>
          <img src="/images/SI3.jpg" alt="" style={styles.image} />
        </SwiperSlide>
        <SwiperSlide style={styles.slide}>
          <img src="/images/SI4.jpg" alt="" style={styles.image} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default SwiperSlider;

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
