import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider({ slides }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      loop
      autoplay={{ delay: 3000, disableOnInteraction: true }}
      pagination={{ clickable: true }}
      className="rounded-3xl"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="relative h-[65vh] min-h-107.5 overflow-hidden rounded-3xl">
            <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-center px-6 sm:px-10 lg:px-16">
              <div className="max-w-xl text-white">
                <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">{slide.title}</h1>
                <p className="mt-4 text-lg opacity-95">{slide.subtitle}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/shop" className="rounded-xl bg-white px-5 py-3 font-semibold text-black">
                    {slide.ctaPrimary}
                  </Link>
                  <Link to="/shop" className="rounded-xl border border-white/70 px-5 py-3 font-semibold text-white">
                    {slide.ctaSecondary}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
