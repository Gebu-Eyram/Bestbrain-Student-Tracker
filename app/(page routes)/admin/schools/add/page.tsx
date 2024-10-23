"use client";
import AddNewSchool, {
  AddNewSchoolHeader,
} from "@/components/custom/sections/AddNewSchool";
import { SCHOOLS } from "@/components/custom/sections/SchoolComps";
import { db } from "@/utils/db";
import { Schools, Students, Users } from "@/utils/schema";
import { desc } from "drizzle-orm";
// import { getSchoolsFromDb } from "@/components/custom/sections/SchoolComps";
import { useEffect, useState } from "react";
const revalidate = 900;

const AddSchool = () => {
  return (
    <div className="flex justify-center flex-col items-center max-w-screen-lg w-full mx-auto gap-4 ">
      <AddNewSchoolHeader />
      <AddNewSchool />
    </div>
  );
};
export default AddSchool;
