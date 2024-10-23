import BlurryBlob, { BlurryBlob2 } from "@/components/animata/backgrounds/bg";
import { InView } from "@/components/core/in-view";
import { IconCloudDemo } from "@/components/new-sections/dashboard/IconCloud";
import React from "react";
import { MdAutoGraph } from "react-icons/md";
import { PiBrainFill } from "react-icons/pi";

const ContentSection = () => {
  return (
    <div className="bg-black  relative  mx-auto  md:px-12 xl:px-16">
      <div className="py-16 px-4 sm:px-8  bg-transparent/5 backdrop-blur-lg overflow-hidden dark  rounded-3xl">
        <BlurryBlob
          className="rounded-xl opacity-45 relative max-md:hidden"
          firstBlobColor="bg-purple-800"
          secondBlobColor="bg-blue-400"
        />
        <BlurryBlob2
          className="rounded-xl opacity-45 rotate-45 relative "
          firstBlobColor="bg-purple-800"
          secondBlobColor="bg-blue-500"
        />
        <div className="xl:container relative Sz-50 m-auto ">
          <div className=" lg:p-16  rounded-[4rem] space-y-6 md:flex max-lg:flex-wrap flex-row-reverse md:gap-6 justify-center md:space-y-0   items-center">
            <div className="lg:w-1/2">
              <IconCloudDemo />
            </div>
            <div className="md:7/12 lg:w-1/2">
              <h2 className="text-3xl font-bold font-[family-name:var(--font-sora)] text-gray-900 md:text-4xl dark:text-white">
                Built with the latest technologies and tools.
              </h2>
              <p className="my-8 text-gray-600 dark:text-gray-300">
                We have built this app with the latest technologies and tools to
                help you manage your school data and improve your student's
                performance in one app.
              </p>
              <div className="divide-y space-y-4 divide-gray-100 dark:divide-gray-800">
                <div className="mt-8 flex gap-4 md:items-center">
                  <div className="w-12 h-12 flex gap-4 rounded-full bg-indigo-100 dark:bg-indigo-900/20">
                    <MdAutoGraph className="w-6 h-6 m-auto text-indigo-600 " />
                  </div>
                  <div className="w-5/6">
                    <h4 className="font-semibold text-lg font-[family-name:var(--font-sora)] text-gray-700 dark:text-indigo-400">
                      Reliable data visualization
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      Watch your students' scores come to life with our tool.
                    </p>
                  </div>
                </div>
                <div className="pt-4 flex gap-4 md:items-center">
                  <div className="w-12 h-12 flex gap-4 rounded-full bg-teal-100 dark:bg-teal-900/20">
                    <PiBrainFill className="w-6 h-6 m-auto text-red-600" />
                  </div>
                  <div className="w-5/6">
                    <h4 className="font-semibold text-lg font-[family-name:var(--font-sora)] text-red-400">
                      Real Time Analysis
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      Get real time analysis of your student's performance by
                      AI.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
{
  /* </InView> */
}
