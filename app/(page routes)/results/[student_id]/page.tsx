"use client";
import { STUDENTS } from "@/components/custom/sections/admin/pageComp/StudentComponents";

import { db } from "@/utils/db";
import { Examinations, Students } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect } from "react";

interface Props {
  params: {
    student_id: string;
  };
}
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EXAMINATIONS } from "@/app/_services/types";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResultSlip from "@/components/custom/StudentDetails.tsx/ResultSlip";

const page = ({ params }: Props) => {
  const studentId = params.student_id;

  const [studentDetails, setStudentDetails] = React.useState<STUDENTS[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedExamId, setSelectedExamId] = React.useState("");
  const [ExamsList, setExamsList] = React.useState<EXAMINATIONS[]>([]);

  const GetExaminations = async () => {
    try {
      const result = await db.select().from(Examinations);
      setExamsList(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    GetStudentDetails(studentId);
    GetExaminations();
  }, [studentId]);

  const GetStudentDetails = async (student_id: string) => {
    try {
      // @ts-ignore
      const result = await db
        .select()
        .from(Students)
        .where(eq(Students.id, student_id));
      setStudentDetails(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    ExamsList.length > 0 && setOpen(true);
  }, [ExamsList]);

  return (
    <div className="px-2 sm:px-4 ">
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogAction
              onClick={() => setOpen(false)}
              className="w-fit !bg-transparent text-foreground border absolute right-3 top-3 p-2 px-3"
            >
              <X className="w-4 h-4" />
            </AlertDialogAction>
            <AlertDialogTitle>Choose your examination</AlertDialogTitle>
            <AlertDialogDescription>
              This will help you track the student's progress for the selected
              examination.
            </AlertDialogDescription>
            <Select onValueChange={setSelectedExamId}>
              <SelectTrigger className="w-full ">
                <SelectValue placeholder="Choose an exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Exams</SelectLabel>
                  {ExamsList.map((exam) => (
                    <SelectItem key={exam.id} value={exam.id.toString()}>
                      {exam.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </AlertDialogHeader>
          <AlertDialogFooter className="border-t py-4">
            <AlertDialogAction
              onClick={() => setOpen(false)}
              className="ml-auto"
            >
              Done
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {studentDetails.map((detail) => (
        <div key={detail.id}>
          <div className="flex">
            <p className="text-2xl md:text-4xl font-semibold">{detail.name}</p>
            <Button
              variant={"outline"}
              className=" ml-2 w-fit p-2"
              onClick={() => setOpen(true)}
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-muted-foreground">{detail.school}</p>
        </div>
      ))}
      <ResultSlip exams_id={selectedExamId} student_id={studentId} />
    </div>
  );
};

export default page;
