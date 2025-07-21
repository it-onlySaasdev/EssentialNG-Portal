import React from "react";
import { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import CoreServices from "@/components/Home/CoreServices";
import Process from "@/components/process";
import TeamTestimonialsSection from "@/components/Home/TeamTestimonials";
import Newsletter from "@/components/Home/NewsLetter";
import Testimonial from "@/components/Home/Testimonial";
import Volunteer from "@/components/SharedComponent/Volunteer";

export const metadata: Metadata = {
  title: "EssentialNG",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <CoreServices />
      <Process />
      <TeamTestimonialsSection />
      <Newsletter />
      <Testimonial />
      <Volunteer />
    </main>
  );
}
