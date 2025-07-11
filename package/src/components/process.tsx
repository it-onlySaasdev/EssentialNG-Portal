"use client";

import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const steps = [
  {
    step: "01/06",
    title: "Ideate",
    description:
      "We analyze your vision thoroughly to ensure the roadmap is perfectly aligned with your end goals, setting the stage for product success.",
  },
  {
    step: "02/06",
    title: "Design",
    description:
      "Crafting a minimal viable product (MVP) that balances design with core functionality, maximizing value and user satisfaction.",
  },
  {
    step: "03/06",
    title: "Develop",
    description:
      "Developing end-to-end solutions with a focus on feasibility assessment, architecture design, and agile processes to ensure rapid, high-quality delivery.",
  },
  {
    step: "04/06",
    title: "Test",
    description:
      "Ensuring your product meets the highest standards of quality and reliability through extensive QA and software testing across all user touchpoints.",
  },
  {
    step: "05/06",
    title: "Launch",
    description:
      "Executing a successful product launch by developing tailored deployment plans, executing a smooth rollout, and offering dedicated post-launch assistance.",
  },
  {
    step: "06/06",
    title: "Support",
    description:
      "Providing ongoing support and enhancements to ensure continued product success.",
  },
];

const Process = () => {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  return (
    <section className="bg-gradient-to-b from-[#003C71] via-black to-black dark:from-[#0F172A] dark:via-gray-900 dark:to-black text-white py-28 px-4 md:px-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white dark:text-white">
          Our Product <span className="text-green-500">Development Process</span>
        </h2>
        <a
          href="#"
          className="text-sm text-white inline-flex items-center gap-1 mt-2 hover:text-green-400 transition"
        >
          View More →
        </a>
      </div>

      <div className="flex flex-col md:flex-row items-start justify-center gap-14 md:gap-16">
        {/* Left Steps */}
        <div className="flex flex-col gap-14 md:w-5/12">
          {steps.slice(0, 3).map((item, i) => (
            <div key={i} className="flex items-start gap-4" data-aos="fade-up">
              {/* Dot */}
              <div className="relative mt-1 w-4 h-4 shrink-0">
                <div className="absolute inset-0 rounded-full bg-green-500 blur-md opacity-60 animate-ping" />
                <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white relative z-10" />
              </div>

              {/* Text */}
              <div>
                <p className="text-sm text-gray-400">{item.step}</p>
                <h3 className="text-xl font-semibold text-green-500 hover:text-green-400 transition mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Center Image */}
        <div
          className="hidden md:block w-[220px] md:w-[260px] lg:w-[300px] relative drop-shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:drop-shadow-[0_0_35px_rgba(34,197,94,0.5)] transition duration-300"
          data-aos="zoom-in"
        >
          <Image
            src="/images/brain-bulb.jpg"
            alt="Development Process Illustration"
            width={300}
            height={300}
            className="mx-auto rounded-xl"
          />
        </div>

        {/* Right Steps */}
        <div className="flex flex-col gap-14 md:w-5/12">
          {steps.slice(3).map((item, i) => (
            <div key={i} className="flex items-start gap-4" data-aos="fade-up" data-aos-delay={(i + 1) * 100}>
              {/* Dot */}
              <div className="relative mt-1 w-4 h-4 shrink-0">
                <div className="absolute inset-0 rounded-full bg-green-500 blur-md opacity-60 animate-ping" />
                <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white relative z-10" />
              </div>

              {/* Text */}
              <div>
                <p className="text-sm text-gray-400">{item.step}</p>
                <h3 className="text-xl font-semibold text-green-500 hover:text-green-400 transition mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
