"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const FeatureSection = () => {
  const features = [
    {
      title: "Student performance visualization",
      description:
        "Make your analysis easier with our visualized data for your students.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-6 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "AI explanations and suggestions",
      description:
        "Can't understand the graph, we provide you with AI accurate insights.",
      skeleton: <SkeletonThree />,
      className:
        "col-span-1 lg:col-span-3 border-b lg:border-r   dark:border-neutral-800",
    },
    {
      title: "Result slip",
      description:
        "Get a result slip indicating scores and grades of your students through all our examinations in one click.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];
  return (
    <div className="relative dark z-20 py-8 px-2 sm:px-4 lg:py-20 max-w-7xl mx-auto">
      <div className="px-8">
        <div className="mb-10 lg:mb-16 flex justify-center items-start flex-col gap-x-0 gap-y-6 lg:gap-y-0 lg:flex-row lg:justify-between max-md:max-w-lg max-md:mx-auto">
          <div className="relative w-full text-center lg:text-left lg:w-2/4">
            <h2 className="text-3xl font-bold font-[family-name:var(--font-sora)]   lg:mb-6 mx-auto max-w-max lg:max-w-md lg:mx-0">
              Track your students' performance with ease.
            </h2>
          </div>
          <div className="relative w-full text-center  lg:text-left lg:w-2/4">
            <p className="text-lg font-normal text-gray-500 mb-5 lg:pt-4">
              We provide you with the tools to track your students' performance
              and make informed decisions.
            </p>
          </div>
        </div>
      </div>

      <div className="relative ">
        <div className="grid grid-cols-1 font-[family-name:var(--font-sora)] lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className=" h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FeatureSection;

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className=" max-w-5xl max-xl:mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base  max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
  return (
    <div className="relative flex py-8 px-2 gap-10 h-fit">
      <div className="w-full p-5  mx-auto bg-white dark:bg-neutral-900 shadow-2xl rounded-md group h-fit">
        <div className="flex relative flex-1 w-full min-h-fit flex-col  space-y-2  ">
          {/* TODO */}
          <img
            src="/Student Tracker GraphPage.png"
            alt="header"
            className="h-fit w-full object-cover blur-none rounded-md"
          />
        </div>
        <div className="absolute bottom-0 z-40 inset-x-0 max-md:h-16 h-32 max-sm:hidden bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
      </div>

      <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent w-full pointer-events-none" />
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <div className="h-60 md:h-60  flex flex-col items-center relative bg-transparent dark:bg-transparent mt-10">
      <div className="flex flex-1 w-full h-full flex-col space-y-2  relative">
        <img
          src="/Student Tracker GraphPage AI.png"
          alt="header"
          width={800}
          height={800}
          className="h-full w-full aspect-square object-cover object-center rounded-sm   transition-all duration-200"
        />
      </div>
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="h-60 md:h-60  flex flex-col items-center relative bg-transparent dark:bg-transparent mt-10">
      <div className="flex flex-1 w-full h-full flex-col space-y-2  relative">
        <img
          src="/Student Tracker GraphPage Result.png"
          alt="header"
          width={800}
          height={800}
          className="h-full w-full aspect-square object-cover object-center rounded-sm   transition-all duration-200"
        />
      </div>
    </div>
  );
};
