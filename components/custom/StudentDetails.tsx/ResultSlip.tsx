"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

//@ts-ignore
import html2pdf from "html2pdf.js";

interface GridBlockProps {
  student_id: string;
  exams_id: string;
}

//@ts-ignore

const ResultSlip = ({ student_id, exams_id }: GridBlockProps) => {
  const resultSlipRef = useRef(null);
  const handleClick = async () => {
    const target = document.querySelector("#resultSlip");
    html2pdf(target);
  };
  return (
    <div className="border w-full p-2 sm:p-10 my-6 rounded-xl max-w-screen-lg mx-auto">
      <Button className="max-lg:hidden" onClick={handleClick}>
        Print
      </Button>
      <div id="resultSlip" ref={resultSlipRef} className="px-2 py-8 sm:px-4">
        <header className="flex justify-center flex-wrap gap-6 items-center">
          <Image
            src={"/bestbrain-logo.jpeg"}
            width={120}
            height={40}
            alt="bestbrain"
            className="w-20"
          />
          <div className="w-full flex max-w-fit flex-col items-center justify-center text-center">
            <p className="sm:text-2xl font-semibold">
              BESTBRAIN EXAMINATIONS KONSORTIUM
            </p>
            <p className="max-sm:text-sm text-muted-foreground">
              SPECIAL PRIVATE MOCK FOR BECE CANDIDATES
            </p>
          </div>
        </header>
        <ScrollArea className="mt-16 flex flex-col w-full">
          <HeaderTable student_id={student_id} exams_id={exams_id} />
        </ScrollArea>
      </div>
    </div>
  );
};

export default ResultSlip;

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { STUDENTS } from "../sections/admin/pageComp/StudentComponents";
import { EXAMINATIONS, EXAMSCORES } from "@/app/_services/types";
import { Examinations, ScoreTable, Students } from "@/utils/schema";
import { db } from "@/utils/db";
import { and, eq } from "drizzle-orm";
import { Scroll } from "lucide-react";
import Core from "markdown-it/lib/parser_core.mjs";
import { Button } from "@/components/ui/button";

function HeaderTable({ student_id, exams_id }: GridBlockProps) {
  // Details
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
    GetStudentDetails(student_id);
    GetExaminations();
  }, [student_id]);

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

  // Date and Time
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000); // update every second

    return () => clearInterval(intervalId);
  }, []);

  // Scores

  const [scores, setScores] = useState<EXAMSCORES[]>([]);
  const [coreScores, setCoreScores] = useState<any[]>([]);
  const [electiveScores, setElectiveScores] = useState<any[]>([]);

  const GetScores = async (student_id: string, exams_id: string) => {
    try {
      const result: any = await db
        .select()
        .from(ScoreTable)
        .where(
          and(
            eq(ScoreTable.exams_id, exams_id),
            eq(ScoreTable.student_id, student_id)
          )
        );

      setScores(result);
      return result;
    } catch (error: any) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    exams_id && student_id && GetScores(student_id, exams_id);
  }, [exams_id, student_id]);

  useEffect(() => {
    scores.length > 0 &&
      setCoreScores([
        {
          subject: "Mathematics",
          score: scores[0].math_tot,
        },
        {
          subject: "Integrated Science",
          score: scores[0].science_tot,
        },
        {
          subject: "Social Studies",
          score: scores[0].social_tot,
        },
        {
          subject: "English Language",
          score: scores[0].english_tot,
        },
      ]);

    scores.length > 0 &&
      setElectiveScores([
        {
          subject: "French",
          score: scores[0].french_tot,
        },
        {
          subject: "Career Technology",
          score: scores[0].career_tot,
        },
        {
          subject: "RME",
          score: scores[0].rme_tot,
        },
        {
          subject: "Computing",
          score: scores[0].comp_tot,
        },
        {
          subject: "Creative Arts",
          score: scores[0].c_arts_tot,
        },
        {
          subject: "Ghanaian Language",
          score: scores[0].gh_lang_tot,
        },
      ]);
  }, [scores]);

  // Total Score
  const [totalScoreElec, setTotalScoreElec] = useState(0);
  const [totaScoreCore, setTotalScoreCore] = useState(0);

  const [totalGradeElec, setTotalGradeElec] = useState(0);
  const [totalGradeCore, setTotalGradeCore] = useState(0);

  const GetGrade = (score: number) => {
    return score > 79
      ? 1
      : score > 69
      ? 2
      : score > 59
      ? 3
      : score > 49
      ? 4
      : score > 39
      ? 5
      : score > 29
      ? 6
      : score > 24
      ? 7
      : score > 19
      ? 8
      : 9;
  };

  useEffect(() => {
    let total = 0;
    let highestScore1 = -1;
    let highestScore2 = -1;

    electiveScores &&
      electiveScores.forEach((item: any) => {
        // Update the two highest scores
        if (item.score > highestScore1) {
          highestScore2 = highestScore1; // Update second highest
          highestScore1 = item.score; // Update highest
        } else if (item.score > highestScore2 && item.score !== highestScore1) {
          highestScore2 = item.score; // Update second highest if it's not equal to the highest
        } else if (item.score > highestScore2 && item.score === highestScore1) {
          highestScore2 = item.score; // Update second highest if it's equal to the highest
        }
      });

    setTotalScoreElec(highestScore1 + highestScore2);
    console.log(GetGrade(highestScore1) + GetGrade(highestScore2));
    setTotalGradeElec(GetGrade(highestScore1) + GetGrade(highestScore2));
  }, [electiveScores]);

  useEffect(() => {
    let total = 0;
    let grade = 0;
    coreScores &&
      coreScores.forEach((item: any) => {
        total += item.score;
        grade += GetGrade(item.score);
      });
    setTotalScoreCore(total);
    setTotalGradeCore(grade);
  }, [coreScores]);

  return (
    <Card className="shadow-none border-none">
      <CardContent className="p-0">
        <table className="w-full">
          <thead className="w-full">
            <tr className="bg-muted border grid grid-cols-6 w-full ">
              <td className="border-r p-2 text-sm min-w-fit font-medium table-cell ">
                Name:
              </td>
              <td className=" text-wrap border-r col-span-2 p-2 uppercase text-sm min-w-fit font-medium ">
                {studentDetails[0]?.name}
              </td>
              <td className=" text-wrap p-2 border-r text-sm min-w-fit font-medium ">
                Year:
              </td>
              <td className=" text-wrap p-2 col-span-2 text-sm min-w-fit font-medium ">
                {date.getFullYear()}
              </td>
            </tr>
            <tr className="border border-t-0 grid grid-cols-6 w-full ! text-wrap-t-transparent ">
              <td className=" border-r text-wrap p-2 text-sm min-w-fit font-medium table-cell ">
                School:
              </td>
              <td className="border-r text-wrap col-span-2 p-2 uppercase  w-full text-sm min-w-fit font-medium ">
                {studentDetails[0]?.school}
              </td>
              <td className="border-r text-wrap p-2 text-sm min-w-fit font-medium ">
                Date:
              </td>
              <td className=" text-wrap p-2 uppercase col-span-2 text-sm min-w-fit font-medium ">
                {date.toDateString()}
              </td>
            </tr>
          </thead>
        </table>

        <div className="w-full my-8">
          <div className="flex justify-center flex-col w-full items-center uppercase">
            <p className="text-xl font-semibold text-center">
              Statement of Results
            </p>
            <p className="text-muted-foreground text-sm">
              {ExamsList.length > 0 && ExamsList[0].name}
            </p>
          </div>
        </div>

        <p className="my-4 font-semibold">CORE SUBJECTS</p>
        <table className="w-full">
          <thead className="w-full">
            <tr className="bg-muted  border grid grid-cols-6 w-full ">
              <td className="border-r g p-2 col-span-2 text-center text-sm min-w-fit font-medium table-cell text-black dark:text-foreground">
                Subject
              </td>
              <td className=" text-wrap text-center border-r  p-2  text-sm min-w-fit font-medium text-black dark:text-foreground">
                Score
              </td>
              <td className=" text-wrap text-center p-2 border-r text-sm min-w-fit font-medium text-black dark:text-foreground">
                Grade
              </td>
              <td className=" text-wrap text-center p-2 col-span-2 text-sm min-w-fit font-medium text-black dark:text-foreground">
                Remarks
              </td>
            </tr>
            {coreScores.map((score, index) => (
              <tr
                key={index}
                className="border border-t-0 grid grid-cols-6 w-full "
              >
                <td className="border-r uppercase text-center p-2 col-span-2 text-sm min-w-fit font-medium table-cell text-black dark:text-foreground">
                  {score.subject}
                </td>
                <td className=" text-wrap border-r text-center  p-2  text-sm min-w-fit font-medium text-black dark:text-foreground">
                  {score.score}
                </td>
                <td className=" text-wrap p-2 border-r text-center text-sm min-w-fit font-medium text-black dark:text-foreground">
                  {score.score > 79
                    ? "1"
                    : score.score > 69
                    ? "2"
                    : score.score > 59
                    ? "3"
                    : score.score > 49
                    ? "4"
                    : score.score > 39
                    ? "5"
                    : score.score > 29
                    ? "6"
                    : score.score > 24
                    ? "7"
                    : score.score > 19
                    ? "8"
                    : 9}
                </td>
                <td className=" text-wrap p-2 text-center uppercase col-span-2 text-sm min-w-fit font-medium text-black dark:text-foreground">
                  {score.score > 79
                    ? "Highest"
                    : score.score > 69
                    ? "Higher"
                    : score.score > 59
                    ? "High"
                    : score.score > 49
                    ? "High Average"
                    : score.score > 39
                    ? "Average"
                    : score.score > 29
                    ? "Low Average"
                    : score.score > 24
                    ? "Low"
                    : score.score > 19
                    ? "Lower"
                    : "Lowest"}
                </td>
              </tr>
            ))}
          </thead>
        </table>

        <p className="my-4 font-semibold">ELECTIVE SUBJECTS</p>
        <table className="w-full">
          <thead className="w-full">
            <tr className="bg-muted  border grid grid-cols-6 w-full ">
              <td className="border-r g p-2 col-span-2 text-center text-sm min-w-fit font-medium table-cell text-black dark:text-foreground">
                Subject
              </td>
              <td className=" text-wrap text-center border-r  p-2  text-sm min-w-fit font-medium text-black dark:text-foreground">
                Score
              </td>
              <td className=" text-wrap text-center p-2 border-r text-sm min-w-fit font-medium text-black dark:text-foreground">
                Grade
              </td>
              <td className=" text-wrap text-center p-2 col-span-2 text-sm min-w-fit font-medium text-black dark:text-foreground">
                Remarks
              </td>
            </tr>
            {electiveScores.map((score, index) => (
              <tr
                key={index}
                className="border border-t-0 grid grid-cols-6 w-full "
              >
                <td className="border-r uppercase text-center p-2 col-span-2 text-sm min-w-fit font-medium table-cell text-black dark:text-foreground">
                  {score.subject}
                </td>
                <td className=" text-wrap border-r text-center  p-2  text-sm min-w-fit font-medium text-black dark:text-foreground">
                  {score.score}
                </td>
                <td className=" text-wrap p-2 border-r text-center text-sm min-w-fit font-medium text-black dark:text-foreground">
                  {score.score > 79
                    ? "1"
                    : score.score > 69
                    ? "2"
                    : score.score > 59
                    ? "3"
                    : score.score > 49
                    ? "4"
                    : score.score > 39
                    ? "5"
                    : score.score > 29
                    ? "6"
                    : score.score > 24
                    ? "7"
                    : score.score > 19
                    ? "8"
                    : 9}
                </td>
                <td className=" text-wrap p-2 uppercase text-center col-span-2 text-sm min-w-fit font-medium text-black dark:text-foreground">
                  {score.score > 79
                    ? "Highest"
                    : score.score > 69
                    ? "Higher"
                    : score.score > 59
                    ? "High"
                    : score.score > 49
                    ? "High Average"
                    : score.score > 39
                    ? "Average"
                    : score.score > 29
                    ? "Low Average"
                    : score.score > 24
                    ? "Low"
                    : score.score > 19
                    ? "Lower"
                    : "Lowest"}
                </td>
              </tr>
            ))}
          </thead>
        </table>

        <table className="w-full my-4 mt-8">
          <thead className="w-full">
            <tr className="  border grid grid-cols-6 w-full ">
              <td className="border-r g p-2 col-span-2  text-sm min-w-fit font-medium table-cell text-black dark:text-foreground">
                RAW SCORE:
              </td>
              <td className=" text-wrap bg-muted text-center border-r  p-2  text-sm min-w-fit font-medium text-black dark:text-foreground">
                {totaScoreCore + totalScoreElec}
              </td>
              <td className=" text-wrap  p-2 col-span-2 border-r text-sm min-w-fit font-medium text-black dark:text-foreground">
                AGGREGATE:
              </td>
              <td className=" text-wrap text-center p-2 bg-muted  text-sm min-w-fit font-medium text-black dark:text-foreground">
                {totalGradeCore + totalGradeElec}
              </td>
            </tr>
          </thead>
        </table>
      </CardContent>
    </Card>
  );
}
