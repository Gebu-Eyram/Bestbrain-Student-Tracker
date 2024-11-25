"use server";
import { STUDENTS } from "@/components/custom/sections/admin/pageComp/StudentComponents";
import { SCHOOLS } from "@/components/custom/sections/SchoolComps";

import { db } from "@/utils/db";
import {
  Examinations,
  Schools,
  ScoreTable,
  Students,
  Users,
} from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import { EXAMINATIONS, SCHOOLDATABASE } from "./types";

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
    const date = new Date().toISOString().split("T")[0];
    const result = await db.insert(Schools).values({
      address: address,
      contact: contact,
      name: name,
      email: email,
      id: id,
      region: region,
      desc: desc,
      picture: picture,
      createdAt: date,
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
  try {
    const date = new Date().toISOString().split("T")[0];
    console.log(date);
    const result = await db.insert(Students).values({
      name: name,
      school_id: school_id,
      id: id,
      school: school,
      createdAt: date,
    });

    console.log("Done");
    return result;
  } catch (error: any) {
    console.log(error);
  }
};

export const AddExamsToStudent = async (
  student_name: string,
  student_id: string,
  school_id: string,
  school_name: string
) => {
  try {
    const EXAMS = await db
      .select()
      .from(Examinations)
      .where(eq(Examinations.status, "active"));
    const result = EXAMS.forEach(async (exam: EXAMINATIONS) => {
      await CreateNewExamScore(
        student_name,
        student_id,
        school_id,
        exam.id.toString(),
        school_name
      );
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteSchool = async (id: string) => {
  try {
    const result = await db.delete(Schools).where(eq(Schools.id, id));

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteStudent = async (id: string) => {
  try {
    const result = await db.delete(Students).where(eq(Students.id, id));

    return result;
  } catch (error) {
    console.log(error);
  }
};
export const DeleteUser = async (id: string) => {
  try {
    const result = await db.delete(Users).where(eq(Users.id, id));
    const result2 = await db
      .delete(ScoreTable)
      .where(eq(ScoreTable.school_id, id));
    const result3 = await db.delete(Schools).where(eq(Schools.id, id));

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteStudentExamDetails = async (id: string) => {
  try {
    const result2 = await db
      .delete(ScoreTable)
      .where(eq(ScoreTable.student_id, id));
    return result2;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteExam = async (id: number) => {
  try {
    const result = await db.delete(Examinations).where(eq(Examinations.id, id));
    const result2 = await db
      .delete(ScoreTable)
      .where(eq(ScoreTable.exams_id, id.toString()));

    return result2;
  } catch (error) {
    console.log(error);
  }
};

export async function getSchoolsByMonth(schools: SCHOOLS[]) {
  const schoolsByMonth = {};

  schools.forEach((school) => {
    const createdAt = new Date(school.createdAt);
    const month = createdAt.toLocaleString("en-US", { month: "long" });

    //@ts-ignore
    if (!schoolsByMonth[month]) {
      //@ts-ignore
      schoolsByMonth[month] = 0;
    }
    //@ts-ignore
    schoolsByMonth[month]++;
  });

  return schoolsByMonth;
}

export const PostNewExmaination = async (name: string, type: string) => {
  try {
    const result = await db.insert(Examinations).values({
      name: name,
      type: type,
      createdAt: new Date().toISOString().split("T")[0],
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const CreateNewExamScore = async (
  name: string,
  student_id: string,
  school_id: string,
  exams_id: string,
  school_name: string
) => {
  try {
    const result = await db.insert(ScoreTable).values({
      school_id: school_id,
      exams_id: exams_id,
      student_id: student_id,
      school_name: school_name,
      name: name,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const CreateNewStudentInstances = async (exams_id: string) => {
  try {
    const students = await db.select().from(Students);
    students.forEach(async (student: STUDENTS) => {
      await CreateNewExamScore(
        student.name,
        student.id,
        student.school_id,
        exams_id,
        student.school
      );
    });
    console.log("Done");
  } catch (error) {
    console.log(error);
  }
};

export const UpdateExamScore = async (
  exams_id: string,
  student_id: string,
  data: {
    science_A?: number;
    science_B?: number;
    science_tot?: number;
    social_A?: number;
    social_B?: number;
    social_tot?: number;
    english_A?: number;
    english_B?: number;
    english_tot?: number;
    math_A?: number;
    math_B?: number;
    math_tot?: number;
    c_arts_A?: number;
    c_arts_B?: number;
    c_arts_tot?: number;
    comp_A?: number;
    comp_B?: number;
    comp_tot?: number;
    french_A?: number;
    french_B?: number;
    french_tot?: number;
    gh_lang_A?: number;
    gh_lang_B?: number;
    gh_lang_tot?: number;
    rme_A?: number;
    rme_B?: number;
    rme_tot?: number;
    career_A?: number;
    career_B?: number;
    career_tot?: number;
  }
) => {
  try {
    const result = await db
      .update(ScoreTable)
      .set(data)
      .where(
        and(
          eq(ScoreTable.exams_id, exams_id),
          eq(ScoreTable.student_id, student_id)
        )
      );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const ChangeUserRole = async (id: string, role: string) => {
  try {
    const result = await db
      .update(Users)
      .set({ role: role })
      .where(eq(Users.id, id));
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const SetExamsActive = async (id: number) => {
  try {
    const result = await db
      .update(Examinations)
      .set({ status: "active" })
      .where(eq(Examinations.id, id));
    return result;
  } catch (error) {
    console.log(error);
  }
};
