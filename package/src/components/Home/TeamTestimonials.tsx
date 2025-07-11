"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const teamMembers = [
  { name: "Alfredo Ottis", role: "CEO", image: "/team/alfredo.jpg" },
  { name: "Jordan Sambo", role: "CTO", image: "/team/jordan.jpg" },
  { name: "Tom Yorke", role: "COO", image: "/team/tom.jpg" },
  { name: "Catty Hills", role: "CMO", image: "/team/catty.jpg" },
  { name: "Brandon Murphy", role: "CFO", image: "/team/brandon.jpg" },
  { name: "Maria Zurloh", role: "Supervisor", image: "/team/maria.jpg" },
];

const testimonials = [
  {
    quote:
      "Cubix managed to provide successful support and development in a timely manner...",
    name: "John Erickson",
    title: "Senior HR, Hotset",
    avatar: "/avatars/john.jpg",
  },
  {
    quote:
      "The engagement met the expectations of the internal team...",
    name: "Hannah Medina",
    title: "Digital Manager, Cubix",
    avatar: "/avatars/hannah.jpg",
  },
  {
    quote:
      "Cubix produced clean code and the app got positive reviews...",
    name: "Gavin Houston",
    title: "Co-founder, Binomo",
    avatar: "/avatars/gavin.jpg",
  },
  {
    quote:
      "Cubix successfully built the application, and the client is waiting for Appstore...",
    name: "Clara Kennedy",
    title: "Director, Dubai Investor",
    avatar: "/avatars/clara.jpg",
  },
];

export default function TeamTestimonialsSection() {
  return (
    <div className="bg-gradient-to-b from-white via-gray-100 to-gray-200 dark:from-[#0f172a] dark:via-[#111827] dark:to-[#003C71] text-gray-800 dark:text-gray-100 py-20 px-4 md:px-16 space-y-20 transition-colors duration-300">
      {/* Team Section */}
      <div className="text-center">
        <h2 className="text-sm uppercase tracking-widest text-green-600 font-semibold">
          Our Team
        </h2>
        <h1 className="text-3xl md:text-4xl font-bold mt-2">Our Talented People</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We bring a mix of design thinking, technical excellence, and industry leadership to build exceptional experiences.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-800"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-left">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="text-center">
        <h2 className="text-sm uppercase tracking-widest text-green-600 font-semibold">
          Testimonials
        </h2>
        <h1 className="text-3xl md:text-4xl font-bold mt-2">
          Our clients simply love <span className="text-green-600">what we do</span>
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Proud to serve as the innovation partner for industry leaders who've experienced our expertise-driven execution firsthand.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className="bg-gray-900 dark:bg-gray-800 text-white border-none shadow-md">
                <CardContent className="p-6 space-y-4">
                  <p className="text-sm text-gray-100 dark:text-gray-200">“{testimonial.quote}”</p>
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p className="text-sm font-semibold">{testimonial.name}</p>
                      <p className="text-xs text-gray-400">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
