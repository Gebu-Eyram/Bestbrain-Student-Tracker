//
//
import React from "react";
import { Sparkles } from "@/components/sparkles";
import HyperText from "../ui/hyper-text";

function SparkleCurve() {
  return (
    <>
      <div className=" w-full overflow-hidden  font-[family-name:var(--font-sora)] bg-black">
        <div className="mx-auto mt-32 w-full max-w-2xl md:text-3xl">
          <div className="text-center text-xl  md:text-3xl font-medium ">
            <span className=" text-indigo-200">Our numbers don't lie.</span>

            <br />

            <span className="text-indigo-300">
              Our stats speak for themselves.
            </span>
          </div>
          <div className="mt-14 text-white text-center grid relative z-[500000] items-center grid-cols-3 px-2">
            <div className="w-full flex flex-col items-center justify-center gap-2">
              <HyperText
                text="100K+"
                className="text-2xl sm:text-3xl md:text-4xl font-bold cursor-pointer !p-0 !m-0 "
              />
              <span className="text-sm ">SCHOOLS</span>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-2">
              <HyperText
                text="20+"
                className="text-2xl sm:text-3xl md:text-4xl font-bold cursor-pointer !p-0 !m-0 "
              />
              <span className="text-sm ">YEARS</span>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-2">
              <HyperText
                text="10M+"
                className="text-2xl sm:text-3xl md:text-4xl font-bold cursor-pointer !p-0 !m-0 "
              />
              <span className="text-sm ">STUDENTS</span>
            </div>
          </div>
        </div>
        <div className="relative -mt-32 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#369eff,transparent_80%)] before:opacity-100 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-border/30 after:bg-black/90">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px]  "></div>

          <Sparkles
            density={800}
            speed={1}
            size={1.1}
            color="#FFFFFF"
            className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
          />
        </div>
      </div>
    </>
  );
}

export default SparkleCurve;
//
