"use client";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";

import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { GradientText } from "../custom/GradientText";
import { ShiftingDropDown } from "./Homeheader";
import Link from "next/link";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const COLORS_TOP = ["#1E67C6", "#DD335C"];

export const AuroraHero = () => {
  const { user } = useKindeBrowserClient();

  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(150% 150% at 50% 100%, #020617 60%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      id="home"
      style={{
        backgroundImage,
      }}
      className="relative grid sm:min-h-screen dark place-content-center overflow-hidden bg-black px-4 py-24 text-gray-200"
    >
      <div className="relative z-50 flex flex-col items-center">
        <span className="mb-1.5 inline-block rounded-full max-sm:hidden  text-sm">
          <GradientText />
        </span>
        <h1 className="max-w-4xl bg-gradient-to-br from-white to-gray-500 bg-clip-text text-center text-4xl  leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-6xl font-extrabold md:leading-tight font-[family-name:var(--font-sora)]">
          Data to enrich your <br />
          student's performance
        </h1>
        <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
          The best way to manage your school's data and improve your student's
          performance in one app.
        </p>
        <Link href={user ? "/dashboard" : "/auth/sign-in"}>
          <motion.button
            style={{
              border,
              boxShadow,
            }}
            whileHover={{
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.985,
            }}
            className="group relative flex w-fit items-center  cursor-pointer gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
          >
            {user ? "Continue" : "Get started"}
            <ArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
          </motion.button>
        </Link>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={3000} factor={4} fade speed={2} />
        </Canvas>
      </div>

      <div className="absolute w-full z-10 h-60 bg-gradient-to-b bottom-0 from-transparent  to-black" />
    </motion.section>
  );
};
