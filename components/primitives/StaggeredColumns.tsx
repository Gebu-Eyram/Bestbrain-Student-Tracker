"use client";
import { InView } from "@/components/core/in-view";
import { motion, MotionProps } from "framer-motion";
import { twMerge } from "tailwind-merge";

export function InViewImagesGrid() {
  return (
    <div className="h-fit min-h-screen w-full overflow-auto  mx-auto">
      <div className="flex items-end justify-center pb-12">
        <InView
          viewOptions={{ once: true, margin: "0px 0px -250px 0px" }}
          variants={{
            hidden: {
              opacity: 0,
            },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.09,
              },
            },
          }}
        >
          <div className="columns-1 gap-4 px-8 md:columns-2 xl:columns-3 object-scale-down">
            <HeaderBlock />
            <SchoolDetailsBlock />
            <SocialsBlock />

            <LocationBlock />
            {[
              "https://images.beta.cosmos.so/e5ebb6f8-8202-40ec-bc70-976f81153501?format=jpeg",
              // "https://images.beta.cosmos.so/1b6f1bee-1b4c-4035-9e93-c93ef4d445e1?format=jpeg",
              // "https://images.beta.cosmos.so/9968a6cf-d7f6-4ec9-a56d-ac4eef3f8689?format=jpeg",
              // "https://images.beta.cosmos.so/4b88a39c-c657-4911-b843-b473237e83b5?format=jpeg",
              // "https://images.beta.cosmos.so/86af92c0-064d-4801-b7ed-232535b03328?format=jpeg",
              // "https://images.beta.cosmos.so/399e2a4a-e118-4aaf-9c7e-155ed18f6556?format=jpeg",
              // "https://images.beta.cosmos.so/399e2a4a-e118-4aaf-9c7e-155ed18f6556?format=jpeg",
            ].map((imgSrc, index) => {
              return (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                    },
                  }}
                  key={index}
                  className="mb-4"
                >
                  <img
                    src={imgSrc}
                    alt=""
                    className="rounded-lg w-full h-full object-cover"
                  />
                </motion.div>
              );
            })}
            <StudentTableBlock />
          </div>
        </InView>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { FiArrowRight, FiMail, FiMapPin } from "react-icons/fi";
import { SiGithub, SiTiktok, SiX, SiYoutube } from "react-icons/si";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";

import { db } from "@/utils/db";
import { Schools } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Mail, MapPin, Phone, School, User } from "lucide-react";
import { StudentTableUser } from "../custom/sections/admin/SchoolDetailsComps";
import DashboardStudentTable from "../new-sections/DashboardStudentTable";

export const RevealBento = () => {
  return (
    <div className="min-h-screen text-foreground/80">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid  grid-flow-dense grid-cols-12 gap-4"
      >
        <HeaderBlock />
        <SchoolDetailsBlock />
        <StudentTableBlock />

        <LocationBlock />
        <EmailListBlock />
      </motion.div>
      <Footer />
    </div>
  );
};

type BlockProps = {
  className?: string;
} & MotionProps;

const Block = ({ className, ...rest }: BlockProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
        visible: {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge("col-span-4 rounded-lg border  p-6 mb-4", className)}
      {...rest}
    />
  );
};

const HeaderBlock = () => {
  const { user } = useKindeBrowserClient();

  return <Block className="size-full  aspect-auto"></Block>;
};
const SchoolDetailsBlock = () => {
  const { user } = useKindeBrowserClient();
  const [schoolData, setSchoolData] = useState<any>([]);
  const GetSchoolData = async (school_id: string) => {
    try {
      console.log("trying...");
      const result = await db
        .select()
        .from(Schools)
        .where(eq(Schools.id, school_id));
      console.log(result);
      setSchoolData(result);
      return result;
    } catch (error: any) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    user && GetSchoolData(user?.id);
  }, []);
  useEffect(() => {
    user && GetSchoolData(user?.id);
  }, [user]);

  return (
    <Block className="col-span-12 flex-col justify-between   row-span-2 md:col-span-6">
      <div className="flex items-center gap-2 flex-col sm:flex-row max-lg:flex-wrap justify-center">
        <div className="w-full">
          <h2 className="text-3xl font-medium line-clamp-1 w-full">
            {schoolData[0]?.name || "Your school"}
          </h2>
          <p className="text-lg mb-2 text-muted-foreground line-clamp-1 w-full">
            {schoolData[0]?.desc || "Your school description"}
          </p>
          <div className="border-t grid gap-2 pt-2 text-muted-foreground">
            <p className="line-clamp-1 w-full">
              <Mail className="inline-block h-4 w-4 " />{" "}
              {schoolData[0]?.email || "Your school email"}
            </p>
            <p className="line-clamp-1 w-full">
              <Phone className="inline-block h-4 w-4" />{" "}
              {schoolData[0]?.contact || "Your school phone"}
            </p>
            <p className="line-clamp-1 w-full">
              <MapPin className="inline-block h-4 w-4" />{" "}
              {schoolData[0]?.address + ", " + schoolData[0]?.region ||
                "Your school location"}
            </p>
          </div>
        </div>
      </div>
    </Block>
  );
};

const StudentTableBlock = () => {
  const [school_id, setSchool_id] = useState("");
  const { user } = useKindeBrowserClient();
  useEffect(() => {
    user ? setSchool_id(user?.id) : console.log("No user");
  }, [user]);
  return (
    <Block className="aspect-auto w-full  size-full ">
      <DashboardStudentTable school_id={school_id} />
    </Block>
  );
};

const SocialsBlock = () => (
  <>
    <Block className="col-span-6 bg-red-500 md:col-span-3">
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiYoutube />
      </a>
    </Block>

    <Block className="col-span-6 bg-blue-500 md:col-span-3">
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiX />
      </a>
    </Block>
  </>
);

const LocationBlock = () => (
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
    <FiMapPin className="text-3xl" />
    <p className="text-center text-lg ">Cyberspace</p>
  </Block>
);

const EmailListBlock = () => (
  <Block className="col-span-12 md:col-span-9">
    <p className="mb-3 text-lg">Join my mailing list</p>
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center gap-2"
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full rounded border  px-3 py-1.5 transition-colors focus:border-red-300 focus:outline-0"
      />
      <button
        type="submit"
        className="flex items-center gap-2 whitespace-nowrap rounded bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-300"
      >
        <FiMail /> Join the list
      </button>
    </form>
  </Block>
);

const Footer = () => {
  return (
    <footer className="mt-12">
      <p className="text-center ">
        Made with ❤️ by{" "}
        <a href="#" className="text-red-300 hover:underline">
          @tomisloading
        </a>
      </p>
    </footer>
  );
};
