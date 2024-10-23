import { PostNewSchoolDetails } from "@/app/_services/methods";
import NewSection from "@/components/custom/sections/admin/NewSection";
import { RevealBento } from "@/components/new-sections/BentoGrid";

import { SchoolContactdetails } from "@/constants/schoolsContacts";
import { School } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="">
      <RevealBento />
    </div>
  );
};

export default page;
