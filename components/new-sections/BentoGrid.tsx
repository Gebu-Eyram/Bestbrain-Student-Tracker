"use client";
import React, { useEffect, useState } from "react";
import { motion, MotionProps } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiArrowRight, FiMail, FiMapPin } from "react-icons/fi";
import { SiGithub, SiTiktok, SiX, SiYoutube } from "react-icons/si";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/utils/db";
import { Schools } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Mail, MapPin, Phone } from "lucide-react";
import DashboardStudentTable, {
  DashboardStudentLink,
} from "./DashboardStudentTable";
import DashboardGraph1 from "./dashboard/graph-1";
import { IconCloudDemo } from "./dashboard/IconCloud";
import { DashboardGraph2 } from "./dashboard/graph-2";
import DashboardGraph3 from "./dashboard/graph-3";

export const RevealBento = () => {
  return (
    <div className="min-h-screen  px-4 py-12 text-zinc-50">
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
type BlockProps = {
  className?: string;
} & MotionProps;

const Block = ({ className, ...rest }: BlockProps) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "col-span-4 rounded-lg !text-foreground border p-6",
        className
      )}
      {...rest}
    />
  );
};

export const HeaderBlock = () => {
  const { user } = useKindeBrowserClient();
  return (
    <Block className="col-span-12 row-span-2 md:col-span-6 xl:col-span-4 ">
      <Image
        width={40}
        height={40}
        src={user?.picture || "/bb-logo.svg"}
        alt="avatar"
        className="mb-4 size-14 rounded-full"
      />
      <h1 className="mb-6 text-foreground text-4xl font-medium leading-tight">
        Hi, {user?.given_name}.{" "}
        <span className="text-muted-foreground w-full line-clamp-[7] ">
          You can now track your students' performance.
        </span>
      </h1>
      <Link
        href="/dashboard/students"
        className="flex items-center gap-1 text-primary hover:underline"
      >
        Track Students <FiArrowRight />
      </Link>
    </Block>
  );
};

export const SocialsBlock = () => (
  <>
    <SchoolDetailsBlock />
    <Block className="col-span-12 row-span-2 md:col-span-6 xl:col-span-4">
      <DashboardGraph2 />
    </Block>
    <StudentLinkBlock />
  </>
);

export const SchoolDetailsBlock = () => {
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
    <Block className="col-span-12   md:col-span-6 xl:col-span-4">
      <div className="flex items-center gap-2 flex-col sm:flex-row max-lg:flex-wrap justify-center">
        <div className="w-full">
          <h2 className="text-3xl font-medium line-clamp-1 w-full text-primary">
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

const AboutBlock = () => (
  <Block className="col-span-12 row-span-2  md:col-span-6 xl:col-span-4">
    <DashboardGraph2 />
  </Block>
);

export const Graph1 = () => (
  <Block className="col-span-12 row-span-1 h-fit p-0 border-none md:col-span-6 xl:col-span-4">
    <DashboardGraph1 />
  </Block>
);

const Graph3 = () => (
  <Block className="col-span-12 row-span-1 h-fit p-0 border-none md:col-span-6 xl:col-span-4">
    <DashboardGraph3 />
  </Block>
);
export const StudentTableBlock = () => {
  const [school_id, setSchool_id] = useState("");
  const { user } = useKindeBrowserClient();
  useEffect(() => {
    user ? setSchool_id(user?.id) : console.log("No user");
  }, [user]);
  return (
    <Block className="col-span-12  row-span-2 md:col-span-6 xl:col-span-8">
      <DashboardStudentTable />
    </Block>
  );
};

export const StudentLinkBlock = () => {
  return (
    <Block className="col-span-12 flex items-center justify-center md:col-span-6 xl:col-span-4">
      <DashboardStudentLink />
    </Block>
  );
};

const LocationBlock = () => (
  <Block className="col-span-12  md:col-span-6 xl:col-span-4">
    <FiMapPin className="text-3xl" />
    <p className="text-center text-lg text-zinc-400">Cyberspace</p>
  </Block>
);
