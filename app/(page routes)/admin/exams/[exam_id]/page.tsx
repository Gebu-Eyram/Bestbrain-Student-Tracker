"use client";
import { EXAMINATIONS, EXAMSCORES } from "@/app/_services/types";
import { db } from "@/utils/db";
import { Examinations, Schools, ScoreTable } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Check, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface PageProps {
  params: {
    exam_id: string;
  };
}

const Features = ["View student performance", "View enrolled students"];
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AdminExamsPage = ({ params }: PageProps) => {
  const [SelectedExam, setSelectedExam] = useState<EXAMINATIONS[]>();
  const GetExaminations = async (id: number) => {
    try {
      const result = await db
        .select()
        .from(Examinations)
        .where(eq(Examinations.id, id));
      setSelectedExam(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetExaminations(parseInt(params.exam_id));
  }, [params.exam_id]);
  return (
    <div className=" ">
      <div className="h-full min-h-[80vh] flex max-lg:items-start lg:items-center lg:justify-center">
        <div className="grid lg:grid-cols-3 w-full  max-w-screen-lg lg:items-center lg:justify-center">
          <div className=" border-l  lg:border-b lg:rounded-l-lg border-t max-lg:border-r max-lg:rounded-t-lg    w-full ">
            <CardHeader className="pb-2 ">
              <CardDescription className="">Examination</CardDescription>
              <CardTitle className="text-4xl">
                {SelectedExam ? SelectedExam[0].name : "Exam name"}
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="text-lg font-medium text-muted-foreground">
                {SelectedExam ? SelectedExam[0].type : "Exam type"}
              </div>
            </CardContent>
            <div className="pl-6 border-t py-6">
              <h3 className="text-primary mb-2">What you can do</h3>
              {Features.map((feature, index) => (
                <div
                  className="flex items-center gap-2 py-2 text-sm"
                  key={index}
                >
                  <Check className="w-4 h-4 text-primary" />
                  <span className="w-full line-clamp-1">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:col-span-2 shadow-sm bg-muted/10 rounded-lg">
            <Component exam_id={params.exam_id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminExamsPage;

import { DataTable } from "@/app/dataTable/data-table";
import { ExamsScoreTable } from "@/app/dataTable/columData/ExamsColumns";

interface ComponentProps {
  exam_id: string;
}

const Component = ({ exam_id }: ComponentProps) => {
  const [scores, setScores] = useState<EXAMSCORES[]>();

  const GetScores = async () => {
    try {
      // @ts-ignore
      const result: EXAMSCORES[] = await db
        .select()
        .from(ScoreTable)
        .where(eq(ScoreTable.exams_id, exam_id))
        .orderBy(ScoreTable.name);
      setScores(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    GetScores();
  }, []);
  useEffect(() => {
    GetScores();
  }, [exam_id]);

  return (
    <div className="w-full  border rounded-lg shadow-lg min-h-[30vh] p-2 sm:p-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl lg:text-2xl font-semibold mb-4 pl-4 ">
          Performance
        </h1>
        <h3 className="font-medium">Enrollment: {scores?.length}</h3>
      </div>
      {scores ? (
        <DataTable data={scores} columns={ExamsScoreTable} />
      ) : (
        <div className="flex h-[30vh] items-center justify-center">
          <Loader2 className="w-8 animate-spin h-8 text-primary" />
        </div>
      )}
    </div>
  );
};
