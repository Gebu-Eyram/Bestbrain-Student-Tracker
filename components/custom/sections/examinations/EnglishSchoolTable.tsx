"use client";

import { UpdateExamScore } from "@/app/_services/methods";
import { EXAMINATIONS, EXAMSCORES } from "@/app/_services/types";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/utils/db";
import { Examinations, ScoreTable } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Loader2, PlusCircleIcon, X } from "lucide-react";

export interface SchoolProps {
  school_id: string;
  exams_id?: string | undefined;
}

const EnglishSchoolTable = ({ school_id, exams_id }: SchoolProps) => {
  const [UpdatedStudents, setUpdatedStudents] = useState<boolean>(false);
  const [postedId, setPostedId] = useState<string>("");

  const [StudentsList, setStudentsList] = useState<EXAMSCORES[]>();

  const GetScores = async (exams_id: string) => {
    try {
      // @ts-ignore
      const result: EXAMSCORES[] = await db
        .select()
        .from(ScoreTable)
        .where(
          and(
            eq(ScoreTable.exams_id, exams_id),
            eq(ScoreTable.school_id, school_id)
          )
        )
        .orderBy(ScoreTable.name);

      setStudentsList(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    exams_id !== "" && exams_id && GetScores(exams_id);
  }, [exams_id]);

  useEffect(() => {
    exams_id !== "" && exams_id && GetScores(exams_id);
  }, [UpdatedStudents]);

  useEffect(() => {
    console.log("exam id:", exams_id);
  }, [exams_id]);
  return (
    <div className="w-full">
      <div className="flex flex-col w-full ">
        <div className="grid grid-cols-5 gap-2 text-sm w-full border-b pb-2">
          <h1 className="font-medium text-muted-foreground/80 col-span-2">
            Student
          </h1>
          <h1 className="font-medium hidden sm:flex text-muted-foreground/80">
            Section A
          </h1>
          <h1 className="font-medium hidden sm:flex text-muted-foreground/80">
            Section B
          </h1>
          <h1 className="font-medium hidden sm:flex text-muted-foreground/80">
            Score
          </h1>
        </div>
        {StudentsList && StudentsList?.length > 0 ? (
          StudentsList?.map((student, index) => (
            <div className="">
              <div key={index} className="grid sm:grid-cols-5  w-full">
                <h1 className="col-span-2 font-medium text-sm border p-2">
                  {student.name}
                </h1>
                <div className=" font-medium text-sm border p-2">
                  {student.english_A}
                </div>
                <div className=" font-medium text-sm border p-2">
                  {student.english_B}
                </div>
                <div className=" bg-muted text-sm border p-2 max-sm:col-span-2 font-semibold">
                  {student.english_tot}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-[20vh] col-span-full  py-52">
            You have not registered for this examination
          </div>
        )}
        {!StudentsList && (
          <div className="flex items-center justify-center  py-52">
            <Loader2 className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 text-muted-foreground" />
          </div>
        )}
      </div>
    </div>
  );
};

export default EnglishSchoolTable;
