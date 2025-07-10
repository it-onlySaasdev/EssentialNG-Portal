"use client";

import Slider from "react-slick";

const slides = [
  {
    image: "images/hero/sliders/banner-img1.jpg",
    title: "Empowering Personal Consultancy",
    subtitle: "Tailored advice to grow your goals.",
  },
  {
    image: "/images/hero/sliders/banner-img2.jpg",
    title: "Unlock Your Business Potential",
    subtitle: "Strategy, support, and success—on your terms.",
  },
  {
    image: "/images/hero/sliders/banner-img3.jpg",
    title: "Partner with Industry Experts",
    subtitle: "We bring insight. You make impact.",
  },
];

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 10000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section
      className="w-full relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg,rgb(8, 8, 9) 0%, #003C71 100%)",
      }}
    >
        
<div
  className="
    w-full 
    lg:py-40 
    container 
    mx-auto 
    flex 
    flex-col 
    md:flex-row 
    items-center 
    justify-between 
    gap-10
    rounded-xl
    bg-white/20
    border
    border-white/30
    px-6
    py-10
  ">
        {/* Left side: Text content */}
        <div className="w-full md:w-1/2 text-white">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6 max-w-xl">
            We craft digital experiences through websites and apps.
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-lg">
            Tailored advice to grow your goals.
          </p>
          {/* <a
            href="#contact"
            className="inline-block bg-white text-[#0A7ADA] font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition"
          >
            Get in Touch now
          </a> */}
        </div>

        {/* Right side: Slider */}
        <div className="w-full md:w-1/2">
          <Slider {...settings}>
            {slides.map((slide, idx) => (
              <div key={idx}>
                <div
                  className="h-64 md:h-80 lg:h-96 rounded-lg bg-cover bg-center shadow-lg"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="h-full w-full flex flex-col justify-end bg-black/30 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-white">{slide.title}</h3>
                    <p className="text-sm text-white/80">{slide.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Hero;
