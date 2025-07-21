"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

interface Service {
  id: string;
  subtitle: string;
  title: string;
  description: string;
  bullets: string[];
  cta: string;
  image: string;
}

const services: Service[] = [
  {
    id: "01",
    subtitle: "Digital Product Design",
    title: "Crafting Intuitive Interfaces",
    description:
      "From wireframes to polished prototypes, our UX process ensures every user interaction feels effortless and engaging.",
    bullets: [
      "Human-centred research",
      "Rapid wireframing",
      "Interactive prototyping",
      "Usability testing",
    ],
    cta: "Read more",
    image: "/services/design.jpg",
  },
  {
    id: "02",
    subtitle: "Web & Mobile Development",
    title: "Pixel-perfect Engineering",
    description:
      "Modern tech stacks, clean code, and performance-first builds ensure your product delights users everywhere.",
    bullets: [
      "React / Next.js",
      "Native & Flutter apps",
      "Cloud-ready architecture",
      "Automated testing",
    ],
    cta: "Discover",
    image: "/services/development.jpg",
  },
  {
    id: "03",
    subtitle: "Cloud, DevOps & Deployment",
    title: "Scale with Confidence",
    description:
      "CI/CD pipelines, infrastructure-as-code, and 24/7 monitoring — so you can roll out updates without downtime.",
    bullets: [
      "AWS / Azure / GCP",
      "Docker & Kubernetes",
      "Automated scaling",
      "Realtime observability",
    ],
    cta: "See how",
    image: "/services/devops.jpg",
  },
];

export default function ServicesShowcase() {
//   useEffect(() => AOS.init({ once: true, duration: 700 }), []);

  return (
    <section
      className="bg-gradient-to-b from-[#f8fafb] to-white dark:from-[#111827] dark:to-[#0f172a]
        text-gray-900 dark:text-gray-100 py-24 px-4 md:px-16 transition-colors duration-300"
    >
      {/* Header */}
      <header className="max-w-4xl mx-auto text-center mb-16" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Our <span className="text-green-600">Services</span>
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          We empower your ideas with professional services that are reliable, innovative, and user-focused.
        </p>
      </header>

      <div className="space-y-20">
        {services.map((svc, idx) => (
          <div
            key={svc.id}
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-16
              ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            // data-aos="fade-up"
            // data-aos-delay={idx * 150}
          >
            {/* Image */}
            <div className="md:w-1/2 w-full rounded-xl overflow-hidden shadow-lg group">
              <Image
                src={svc.image}
                alt={svc.subtitle}
                width={600}
                height={350}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-white/80 dark:bg-black/60 text-xs px-3 py-1 rounded-full font-semibold">
                {svc.id}
              </div>
            </div>

            {/* Text */}
            <div className="md:w-1/2 w-full space-y-4">
              <h3 className="text-sm uppercase tracking-wide text-green-600 font-semibold">
                {svc.subtitle}
              </h3>
              <h4 className="text-2xl font-bold">{svc.title}</h4>
              <p className="text-gray-600 dark:text-gray-300">{svc.description}</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-400 ml-4">
                {svc.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-500 font-medium mt-4 group"
              >
                {svc.cta}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Banner */}
      <div
        className="mt-24 bg-green-600 rounded-2xl py-16 px-8 text-center text-white"
        data-aos="zoom-in"
      >
        <h3 className="text-2xl md:text-3xl font-extrabold">
          Let's build great things together!
        </h3>
        <p className="mt-4 max-w-xl mx-auto text-white/90">
          Start your next project with confidence. Our team is ready when you are.
        </p>
        <a
          href="#contact"
          className="mt-6 inline-block bg-white text-green-700 font-semibold px-8 py-3 rounded-md hover:bg-gray-100 transition"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
}
