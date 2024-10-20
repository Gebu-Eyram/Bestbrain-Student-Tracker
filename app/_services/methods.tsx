import { STUDENTS } from "@/components/custom/sections/admin/pageComp/StudentComponents";
import { SCHOOLS } from "@/components/custom/sections/SchoolComps";

import { db } from "@/utils/db";
import {
  Examinations,
  schoolDatabase,
  Schools,
  ScoreTable,
  Students,
  Users,
} from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import { SCHOOLDATABASE } from "./types";

export const DeleteSchool = async (id: string) => {
  try {
    const result = await db.delete(Schools).where(eq(Schools.id, id));

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteUser = async (id: string) => {
  try {
    const result = await db.delete(Users).where(eq(Users.id, id));
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

export function getSchoolsByMonth(schools: SCHOOLS[]) {
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
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const PostNewSchoolDetails = async (
  schoolName: string,
  contact: string,
  email: string,
  headName: string,
  location: string,
  district: string,
  region: string,
  type: string
) => {
  try {
    const result = await db.insert(schoolDatabase).values({
      schoolName: schoolName,
      contact: contact,
      district: district,
      email: email,
      headName: headName,
      location: location,
      region: region,
      type: type,
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

// export const UpdateMathScore = async (
//   exams_id: string,
//   student_id: string,
//   data: {
//     math_A?: number;
//     math_B?: number;
//   }
// ) => {
//   try {
//     const result = await db
//       .update(ScoreTable)
//       .set(data)
//       .where(
//         and(
//           eq(ScoreTable.exams_id, exams_id),
//           eq(ScoreTable.student_id, student_id)
//         )
//       );
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const UpdateScienceScore = async (
//   exams_id: string,
//   student_id: string,
//   data: {
//     science_A?: number;
//     science_B?: number;
//     science_tot?: number;
//   }
// ) => {
//   try {
//     const result = await db
//       .update(ScoreTable)
//       .set(data)
//       .where(
//         and(
//           eq(ScoreTable.exams_id, exams_id),
//           eq(ScoreTable.student_id, student_id)
//         )
//       );
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const UpdateEnglishScore = async (
//   exams_id: string,
//   student_id: string,
//   data: {
//     english_A?: number;
//     english_B?: number;
//     english_tot?: number;
//   }
// ) => {
//   try {
//     const result = await db
//       .update(ScoreTable)
//       .set(data)
//       .where(
//         and(
//           eq(ScoreTable.exams_id, exams_id),
//           eq(ScoreTable.student_id, student_id)
//         )
//       );
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };
