"use client";
import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart,
  ChevronDown,
  Home,
  PieChart,
} from "lucide-react";
import Image from "next/image";

export const ShiftingDropDown = () => {
  return (
    <div className="flex w-full justify-center bg-transparent absolute top-0 right-0 left-0 z-50   p-8 text-white items-center">
      <div className="flex justify-between w-full items-center max-w-screen-lg">
        <Image src={"/bb-logo.svg"} width={40} height={40} alt="logo" />
      </div>
    </div>
  );
};
