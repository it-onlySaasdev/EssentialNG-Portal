"use client";

import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface Product {
  title: string;
  description: string;
  image: string;
  link: string;
}

const products: Product[] = [
  {
    title: "E‑News",
    description:
      "Stay informed with real‑time updates delivered straight to your inbox. Curated news, zero noise.",
    image: "/products/enews.jpg",
    link: "#enews",
  },
  {
    title: "E‑Schools",
    description:
      "A complete digital suite for schools — from attendance to virtual classrooms and beyond.",
    image: "/products/eschools.jpg",
    link: "#eschools",
  },
  {
    title: "E‑Drivers",
    description:
      "Manage fleets, track routes, and optimize logistics with our driver‑first platform.",
    image: "/products/edrivers.jpg",
    link: "#edrivers",
  },
  {
    title: "E‑Jobs",
    description:
      "Connecting talent to opportunity with smart matching and real‑time hiring analytics.",
    image: "/products/ejobs.jpg",
    link: "#ejobs",
  },
  {
    title: "E‑Religion",
    description:
      "Tools that foster community engagement, event scheduling, and donation management for faith groups.",
    image: "/products/ereligion.jpg",
    link: "#ereligion",
  },
  {
    title: "E‑Properties",
    description:
      "Your hub for property listings, virtual tours, and seamless real‑estate transactions.",
    image: "/products/eproperties.jpg",
    link: "#eproperties",
  },
  {
    title: "E‑Legal",
    description:
      "Streamline case management, document automation, and compliance tracking for legal teams.",
    image: "/products/elegal.jpg",
    link: "#elegal",
  },
  {
    title: "E‑Stores",
    description:
      "Launch and manage online storefronts with integrated payments and inventory control.",
    image: "/products/estores.jpg",
    link: "#estores",
  },
  {
    title: "E‑Fix",
    description:
      "On‑demand maintenance scheduling and asset tracking for facilities of any scale.",
    image: "/products/efix.jpg",
    link: "#efix",
  },
];

const ProductsShowcase = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="py-24 px-4 md:px-16 bg-gradient-to-b from-[#003C71] via-black to-black dark:from-[#0f172a] dark:via-gray-900 dark:to-black text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center mb-16" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Products</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Explore our E‑Group — a community of essential applications designed to streamline your day‑to‑day with smart, reliable solutions.
        </p>
        <a
          href="#products"
          className="inline-block mt-6 bg-green-600 hover:bg-green-500 text-white font-medium py-3 px-8 rounded-md transition"
        >
          Explore now
        </a>
      </div>

      <div className="space-y-24">
        {products.map((product, idx) => (
          <div
            key={product.title}
            className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${
              idx % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
            data-aos="fade-up"
            data-aos-delay={idx * 100}
          >
            {/* Text */}
            <div className="md:w-1/2 space-y-4">
              <h3 className="text-2xl font-semibold text-green-500">
                {product.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {product.description}
              </p>
              <a
                href={product.link}
                className="inline-flex items-center text-sm font-medium text-green-400 hover:text-green-300 transition"
              >
                Learn more →
              </a>
            </div>

            {/* Image */}
            <div className="md:w-1/2 w-full rounded-lg overflow-hidden shadow-lg">
              <Image
                src={product.image}
                alt={product.title}
                width={600}
                height={350}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsShowcase;
