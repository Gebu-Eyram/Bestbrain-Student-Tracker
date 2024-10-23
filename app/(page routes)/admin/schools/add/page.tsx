"use client";
import AddNewSchool, {
  AddNewSchoolHeader,
} from "@/components/custom/sections/AddNewSchool";

// import { getSchoolsFromDb } from "@/components/custom/sections/SchoolComps";

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
