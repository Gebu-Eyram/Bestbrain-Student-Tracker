"use client";
import { PostNewSchoolDetails } from "@/app/_services/methods";
import NewSection from "@/components/custom/sections/admin/NewSection";
import {
  Graph1,
  HeaderBlock,
  RevealBento,
  SocialsBlock,
  StudentTableBlock,
} from "@/components/new-sections/BentoGrid";

import { SchoolContactdetails } from "@/constants/schoolsContacts";
import { School } from "lucide-react";
import React from "react";
import { motion, MotionProps } from "framer-motion";
import DashboardGraph1 from "@/components/new-sections/dashboard/graph-1";

const page = () => {
  return (
    <div className="min-h-screen px-2  sm:px-4  sm:py-6 text-zinc-50">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid grid-flow-dense grid-cols-12 gap-4"
      >
        <HeaderBlock />
        <SocialsBlock />

        {/* <SchoolDetailsBlock />
        <StudentLinkBlock /> */}
        {/* <AboutBlock /> */}
        <Graph1 />

        <StudentTableBlock />
        {/* <Graph3 /> */}
      </motion.div>
    </div>
  );
};

export default page;
