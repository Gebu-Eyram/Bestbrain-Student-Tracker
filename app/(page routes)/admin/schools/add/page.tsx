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

export const PostNewSchool = async (
  name: string,
  email: string,
  address: string,
  id: string,
  contact: string,
  region: string,
  desc: string,
  picture: string
) => {
  try {
    const result = await db.insert(Schools).values({
      address: address,
      contact: contact,
      name: name,
      email: email,
      id: id,
      region: region,
      desc: desc,
      picture: picture,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const PostNewUser = async (
  email: string,
  id: string,
  picture: string
) => {
  try {
    const result = await db.insert(Users).values({
      email: email,
      id: id,
      picture: picture,
    });
    console.log("User posted");
    return result;
  } catch (error) {
    console.log("Error");
  }
};

export const PostNewStudent = async (
  name: string,
  school_id: string,
  school: string,
  id: string
) => {
  const result = await db.insert(Students).values({
    name: name,
    school_id: school_id,
    id: id,
    school: school,
  });
  return result;
};

const AddSchool = () => {
  return (
    <div className="flex justify-center flex-col items-center max-w-screen-lg w-full mx-auto gap-4 ">
      <AddNewSchoolHeader />
      <AddNewSchool />
    </div>
  );
};
export default AddSchool;
