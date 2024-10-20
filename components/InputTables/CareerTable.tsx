"use client";

import { UpdateExamScore } from "@/app/_services/methods";
import { EXAMINATIONS, EXAMSCORES } from "@/app/_services/types";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/utils/db";
import { Examinations, ScoreTable } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, PlusCircleIcon, X } from "lucide-react";

export interface SchoolProps {
  school_id: string;
  exams_id?: string | undefined;
}

const CareerTable = ({ school_id, exams_id }: SchoolProps) => {
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

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { toast } = useToast();

  const onSubmit = (data: any) => {
    data = data.students[postedId];

    const student_id = data.id;
    const post = {
      career_A: data.career_A,
      career_B: data.career_B,
      career_tot: Math.round(data.career_A + data.career_B),
    };

    exams_id && exams_id !== "" && UpdateExamScore(exams_id, student_id, post);
    toast({
      title: "Score Updated",
      description: "Student score has been updated successfully",
    });
    setUpdatedStudents(!UpdatedStudents);
  };

  useEffect(() => {
    console.log("exam id:", exams_id);
  }, [exams_id]);
  return (
    <div className="w-full">
      <div className="flex flex-col w-full gap-3">
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
            Actions
          </h1>
        </div>
        {StudentsList && StudentsList?.length > 0 ? (
          StudentsList?.map((student, index) => (
            <div>
              <form
                name={student.student_id}
                key={index}
                onSubmit={handleSubmit(onSubmit)}
                className="grid sm:grid-cols-5 gap-2 w-full"
              >
                <h1 className="col-span-2 font-medium text-sm">
                  {student.name}
                </h1>
                <input
                  {...register(`students.${student.student_id}.id`)}
                  defaultValue={student.student_id}
                  className="hidden"
                />

                <Input
                  max={40}
                  min={0}
                  type="number"
                  defaultValue={student.career_A}
                  {...register(`students.${student.student_id}.career_A`)}
                />
                <Input
                  type="number"
                  max={100}
                  min={0}
                  defaultValue={student.career_B}
                  {...register(`students.${student.student_id}.career_B`)}
                />
                <Button
                  className="text-sm w-fit max-sm:w-full   max-sm:col-span-2 flex gap-1 items-center justify-center"
                  type="submit"
                  onClick={() => {
                    //@ts-ignore
                    setPostedId(student.student_id);
                  }}
                >
                  <PlusCircleIcon className="w-4 h-4" />
                  Submit
                </Button>
              </form>
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

export default CareerTable;
