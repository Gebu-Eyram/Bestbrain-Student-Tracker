import { CardStackDemo } from "@/components/aceternity/CardStack";
import ContentSection from "@/components/custom/sections/landing/ContentSection";
import FAQ from "@/components/custom/sections/landing/FAQ";
import FeatureSection from "@/components/custom/sections/landing/FeatureSection";
import Footer from "@/components/custom/sections/landing/Footer";
import PricingSection from "@/components/custom/sections/landing/PricingSection";
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
      <CardStackDemo />
      <SparkleCurve />
      <PricingSection />
      <Footer />
    </main>
  );
}
