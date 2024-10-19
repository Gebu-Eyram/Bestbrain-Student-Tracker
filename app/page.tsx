import ContentSection from "@/components/custom/sections/landing/ContentSection";
import FeatureSection from "@/components/custom/sections/landing/FeatureSection";
import Footer from "@/components/custom/sections/landing/Footer";
import SparkleCurve from "@/components/new-sections/Curve";
import { AuroraHero } from "@/components/new-sections/Hero";
import { ShiftingDropDown } from "@/components/new-sections/Homeheader";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" !bg-black !text-white relative">
      <ShiftingDropDown />
      <AuroraHero />
      <FeatureSection />
      <ContentSection />
      <SparkleCurve />
      <Footer />
    </main>
  );
}
