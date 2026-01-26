// @flow strict
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

function SwiperSlider() {
  return (
    <div className="slider-wrapper">
      <Swiper
        className="custom-swiper"
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop
        modules={[Pagination, Autoplay]}
      >
        <SwiperSlide>
          <SlideImage src="https://res.cloudinary.com/dycxc9esi/image/upload/v1769066292/pexels-artbovich-6580396_uc0mnb.jpg" />
        </SwiperSlide>

        <SwiperSlide>
          <SlideImage src="https://res.cloudinary.com/dycxc9esi/image/upload/v1768802597/adam-winger-A4U4dEuN-hw-unsplash_f5kz4j.jpg" />
        </SwiperSlide>

        <SwiperSlide>
          <SlideImage src="https://res.cloudinary.com/dycxc9esi/image/upload/v1768802597/adam-winger-A4U4dEuN-hw-unsplash_f5kz4j.jpg" />
        </SwiperSlide>

        <SwiperSlide>
          <SlideImage src="https://res.cloudinary.com/dycxc9esi/image/upload/v1768802597/adam-winger-A4U4dEuN-hw-unsplash_f5kz4j.jpg" />
        </SwiperSlide>
      </Swiper>

      {/* Custom Swiper Styles */}
      <style>
        {`
        .slider-wrapper {
          width: 100%;
          max-width: 1200px;
          margin: auto;
          padding: 20px 0;
        }

        .custom-swiper {
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(7, 48, 50, 0.18);
        }

        .custom-swiper .swiper-pagination {
          bottom: 16px;
        }

        .custom-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #E3D0B3;
          opacity: 0.6;
          transition: all 0.3s ease;
        }

        .custom-swiper .swiper-pagination-bullet-active {
          width: 22px;
          border-radius: 20px;
          background: #1b4965;
          opacity: 1;
        }
      `}
      </style>
    </div>
  );
}

/* Slide Image Component */
const SlideImage = ({ src }) => (
  <div style={styles.slide}>
    <img src={src} alt="" style={styles.image} />
    <div style={styles.overlay} />
  </div>
);

export default SwiperSlider;

/* Inline Styles */
const styles = {
  slide: {
    position: "relative",
    height: "280px",
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  // overlay: {
  //   position: "absolute",
  //   inset: 0,
  //   background:
  //     "linear-gradient(to top, rgba(7,48,50,0.45), rgba(7,48,50,0.05))",
  // },
};
