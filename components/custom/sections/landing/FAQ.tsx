import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/core/accordion";
import { ChevronRight, ChevronUp } from "lucide-react";

const FAQ = () => {
  return (
    <Accordion
      className="flex w-full flex-col divide-y max-w-2xl mx-auto p-4 py-8  sm:py-16 sm:px-8  divide-border dark dark:divide-zinc-700"
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <AccordionItem value="getting-started" className="py-2">
        <AccordionTrigger className="w-full text-left text-zinc-9200 dark:text-zinc-200">
          <div className="flex items-center justify-between">
            <div>Getting Started</div>
            <ChevronUp className="h-4 w-4 text-zinc-9200 transition-transform duration-200 group-data-[expanded]:-rotate-180 dark:text-zinc-200" />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-muted-foreground py-2 text-sm ">
            You just have to click on get started and create an account. We will
            authorize you to use our services and you can start using our
            services.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="animation-properties" className="py-2">
        <AccordionTrigger className="w-full text-left text-zinc-9200 dark:text-zinc-200">
          <div className="flex items-center justify-between">
            <div>How does it work</div>
            <ChevronUp className="h-4 w-4 text-zinc-9200 transition-transform duration-200 group-data-[expanded]:-rotate-180 dark:text-zinc-200" />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-muted-foreground py-2 text-sm ">
            This is a digitalized form of our option A procedures. We input the
            student data into our system and it is processed to give the best
            results.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="advanced-usage" className="py-2">
        <AccordionTrigger className="w-full text-left text-zinc-9200 dark:text-zinc-200">
          <div className="flex items-center justify-between">
            <div>Authentication and security</div>
            <ChevronUp className="h-4 w-4 text-zinc-9200 transition-transform duration-200 group-data-[expanded]:-rotate-180 dark:text-zinc-200" />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-zinc-2000 py-2 text-muted-foreground text-sm ">
            This app is secured with the latest security protocols and we have a
            team of experts who are always monitoring the app for any security
            breaches.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="community-and-support" className="py-2">
        <AccordionTrigger className="w-full text-left text-zinc-9200 dark:text-zinc-200">
          <div className="flex items-center justify-between">
            <div>Payment and upgrades</div>
            <ChevronUp className="h-4 w-4 text-zinc-9200 transition-transform duration-200 group-data-[expanded]:-rotate-180 dark:text-zinc-200" />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-zinc-2000 text-sm py-2 text-muted-foreground ">
            Upgrades are currently not availabe as we are working on these
            features, howver, you can contact us for more information.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FAQ;
