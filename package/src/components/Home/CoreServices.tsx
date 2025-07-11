"use client";

import { useEffect } from "react";
import { ShieldCheck, Puzzle, Rocket, Users } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const services = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
    title: "Security First",
    description:
      "We implement modern security protocols ensuring safe and trustworthy user experiences.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-green-500" />,
    title: "Performance Focused",
    description:
      "Optimized code, scalable architecture, and blazing-fast performance across all devices.",
  },
  {
    icon: <Puzzle className="w-8 h-8 text-green-500" />,
    title: "Custom Solutions",
    description:
      "Tailored strategies and development to meet unique business goals and challenges.",
  },
  {
    icon: <Users className="w-8 h-8 text-green-500" />,
    title: "User-Centered",
    description:
      "Designed with empathy—putting the user’s needs and journey at the heart of everything.",
  },
];

const CoreServices = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-black via-gray-900 to-[#003C71] dark:from-[#0f172a] dark:via-[#111827] dark:to-[#003C71] text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center mb-16" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold">
          Our <span className="text-green-500">Core Services</span>
        </h2>
        <p className="mt-4 text-gray-300 max-w-xl mx-auto">
          We offer foundational solutions that ensure innovation, speed, and reliability for your product.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-left shadow-lg hover:shadow-xl transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay={idx * 150}
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {service.title}
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreServices;
