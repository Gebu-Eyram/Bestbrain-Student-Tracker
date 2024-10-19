"use client";

import { cn } from "@/lib/utils";
import { CardStack } from "../card-stack";
export function CardStackDemo() {
  return (
    <div className="flex items-start sm:py-20 max-w-7xl justify-center gap-x-20 w-full mx-auto p-2 max-sm:flex-col">
      <div>
        <h1 className="text-4xl w-full sm:max-w-md mt-4 font-semibold  font-[family-name:var(--font-sora)] text-base-900 lg:text-balance tracking-wide">
          Don't just take <span className="text-indigo-500">our word</span> for
          it
        </h1>
        <p className="text-base-500 mt-4 w-full sm:max-w-sm">
          Here's what some of our users have to say about us.
        </p>
        <div>
          <div className="flex items-center gap-2 mt-8">
            <div className="w-8 h-8 bg-indigo-600 rounded-full" />
            <div className="w-8 h-8 bg-indigo-600 rounded-full" />
            <div className="w-8 h-8 bg-indigo-600 rounded-full" />
          </div>
        </div>
      </div>
      <CardStack items={CARDS} />
    </div>
  );
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Kwame Adu",
    designation: "Accra, Ghana",
    content: (
      <p>
        Bestbrain is amazing,{" "}
        <Highlight>I love their diversification</Highlight> in web tools to make
        life easier and better 🙏
      </p>
    ),
  },
  {
    id: 1,
    name: "Kpodo Mawunyo",
    designation: "Kumasi, Ghana",
    content: (
      <p>
        What I love about this <Highlight>map app</Highlight> by Bestbrain is
        the ability to locate schools and get directions in the easiest way
        possible.
      </p>
    ),
  },
  {
    id: 3,
    name: "Gebu Eyram Henry",
    designation: "Bestbrain User, Takoradi",
    content: (
      <p>
        I am very impressed with the user experience of the Bestbrain app. It is
        very easy to use and navigate. This is a{" "}
        <Highlight>very great </Highlight> company.{" "}
      </p>
    ),
  },
];
