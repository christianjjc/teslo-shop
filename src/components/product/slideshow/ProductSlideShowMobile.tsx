"use client";
// Import Swiper React components
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, FreeMode, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./slideshow.css";
import { ProductImage } from "../product-image/ProductImage";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideShowMobile = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: "100vw",
          height: "500px",
        }}
        pagination
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2">
        {images.map((img) => (
          <SwiperSlide key={img}>
            <ProductImage src={img} alt={title} height={500} width={600} className="object-fill" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
