import { InView } from "@/components/core/in-view";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import Link from "next/link";

const PricingSection = () => {
  return (
    <section id="pricing" className=" dark overflow-hidden">
      <InView
        variants={{
          hidden: {
            opacity: 0,
            y: 30,
            scale: 0.95,
            filter: "blur(4px)",
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        viewOptions={{ margin: "0px 0px -350px 0px" }}
      >
        <div className="px-2 w-full pb-8 mx-auto md:px-12 lg:pb-20 max-w-screen-xl dark relative">
          <div className="max-w-xl text-center mx-auto">
            <span className="font-mono text-xs text-muted-foreground font-medium tracking-tight text-accent-600 uppercase">
              PRICING
            </span>
            <p className="text-4xl mt-4 font-semibold tracking-tight font-[family-name:var(--font-sora)] text-base-900 lg:text-balance">
              Equip your <span className="text-indigo-500">business</span>{" "}
              <br /> with
              <span className="text-indigo-500"> world class</span> tools
            </p>
          </div>
          <div className="flex  flex-col gap-4 mt-12 sm:flex-row items-center justify-center  mx-auto">
            <div className="flex flex-col max-w-sm h-full  justify-between p-1 border bg-base-50 rounded-3xl shadow">
              <div className="">
                <div className="flex flex-col p-8 border shadow rounded-[1.3rem]">
                  <span className="text-xl text-base-900  font-[family-name:var(--font-sora)] font-medium">
                    Free{" "}
                  </span>
                  <p className="text-sm text-base-500 mt-2">
                    Get started with our free tier, no payment required.
                  </p>
                </div>
                <div className="p-8 pt-0 mt-8">
                  <p className="font-semibold lg:text-3xl flex items-baseline  font-[family-name:var(--font-sora)] text-2xl tracking-tighter text-base-900">
                    ₵0.00
                    <span className="text-sm font-normal tracking-normal  text-base-500">
                      /month
                    </span>
                  </p>
                  <div className="w-full mt-4">
                    <Link href="#hero">
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Tier 2 --> */}
            <div className="flex h-full border max-w-sm justify-between flex-col bg-muted/30 p-1 rounded-3xl bg-base-900 shadow">
              <div>
                <div className="flex flex-col border p-8 bg-base-800 shadow rounded-[1.3rem]">
                  <span className="text-xl font-[family-name:var(--font-sora)] font-medium">
                    {" "}
                    Pro{" "}
                  </span>
                  <p className="text-sm text-base-300 mt-2">
                    More added features to make your school business a smoother
                    experience.
                  </p>
                </div>
                <div className="p-8 pt-0 mt-8">
                  <p className="font-semibold flex font-[family-name:var(--font-sora)] lg:text-3xl items-baseline text-2xl tracking-tighter">
                    ₵ ?
                    <span className="text-sm font-normal tracking-normal font-sans text-base-300">
                      /month
                    </span>
                  </p>
                  <div className="w-full mt-4">
                    <button className=" bg-indigo-500 hover:bg-indigo-500/90 text-white p-2 text-sm rounded-md font-medium w-full ">
                      Coming Soon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </InView>
    </section>
  );
};

export default PricingSection;
