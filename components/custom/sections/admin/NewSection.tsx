"use client";
import { db } from "@/utils/db";
import { Schools } from "@/utils/schema";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { eq } from "drizzle-orm";
import { LineChart, School } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const NewSection = () => {
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
    <div>
      <section className="">
        <div className="flex flex-col lg:grid gap-4 grid-cols-4 mb-4">
          <div className="relative w-full h-auto lg:col-span-2">
            <div className="bg-gray-800 rounded-2xl h-full flex  justify-between flex-row flex-wrap">
              <div className="p-5  xl:p-8 w-full md:w-1/2 ">
                <div className="block">
                  <Image
                    height={40}
                    width={40}
                    src="/logowhite.svg"
                    alt="logo"
                  />
                </div>
                <h3 className="text-2xl font-semibold md:text-3xl text-white py-5 w-full max-w-sm">
                  {user ? `Welcome ${user.given_name}👋,` : "Welcome 👋"}
                </h3>
                <p className="text-xs font-normal text-gray-300 w-full mb-8 max-w-md">
                  Get a real-time view of your school's performance. Explore
                  student data, find areas to improve, and make better decisions
                  for all students.
                </p>
              </div>
              <div className="relative hidden h-auto md:w-1/2 md:block">
                <img
                  src="https://pagedone.io/asset/uploads/1695028873.png"
                  alt="Header tailwind Section"
                  className="h-full ml-auto object-cover"
                />
              </div>
            </div>
          </div>
          <div className="bg-indigo-500 rounded-2xl p-5  xl:p-8 h-full">
            <div className="block">
              <School className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="py-5 text-white text-lg font-bold xl:text-xl">
                {schoolData[0]?.name || "School Name"}
              </h3>
              <p className="text-xs font-normal text-white mb-8">
                {schoolData[0]?.desc || "School Description"}
              </p>
            </div>

            {/* <button className="py-2 mt-auto px-5 border border-solid border-gray-300 rounded-full gap-2 text-xs text-white font-semibold flex items-center justify-between transition-all duration-500 hover:bg-white/5">
              View More
            </button> */}
          </div>
          <div className="bg-violet-500 rounded-2xl p-5 xl:p-8 h-full">
            <div className="block">
              <LineChart className="h-6 w-6 text-white" />
            </div>
            <h3 className="py-5 text-white text-lg font-bold xl:text-xl">
              Built for schools with students at heart
            </h3>
            <p className="text-xs font-normal text-white mb-8">
              We invite you to apply our platform and tools to your school and
              see the real difference
            </p>
            <button className="py-2 px-5 border border-solid border-gray-300 rounded-full gap-2 text-xs text-white font-semibold flex items-center justify-between transition-all duration-500 hover:bg-white/5">
              View More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewSection;
