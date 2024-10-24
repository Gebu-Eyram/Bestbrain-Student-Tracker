"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useMemo, useState } from "react";
import { STUDENTS } from "@/components/custom/sections/admin/pageComp/StudentComponents";
import { EXAMINATIONS } from "@/app/_services/types";
import { db } from "@/utils/db";
import { Examinations, ScoreTable } from "@/utils/schema";

export default function DashboardGraph1() {
  const { user } = useKindeBrowserClient();

  // Details

  const [ExamsList, setExamsList] = useState<EXAMINATIONS[]>([]);
  const [recentExam, setRecentExam] = useState<EXAMINATIONS>();
  const [school_id, setSchool_id] = useState<string>();
  const [examScores, setExamScores] = useState<any[]>([]);
  const [examAverage, setExamAverage] = useState<number>(0);
  const [prompt, setPrompt] = useState<string>(
    "This data shows the average scores of a student in the subjects of the recent examination for a school. Please explain to the school owner the trends in the student's performance, and highlight any problems and remedies to scores. Please make reference to the score grading and site the student's performance in the context of the school's average performance.Every number and average is an average of scores scored by a student in an exam. The grade interpretation is 100-80 interpreted as HIGHEST 79-70 interpreted as HIGHER 69-60 interpreted as HIGH 59-50 interpreted as HIGH AVERAGE 49-40 interpreted as AVERAGE 39-30 interpreted as LOW AVERAGE 29-25 interpreted as LOW 24-20 interpreted as LOWER 19-0 interpreted as LOWEST. Any score less than 50 is below average. Please try to find possible reasons for the trends and match the aveage scores accordingly to the grades. Analyse the data deeply too."
  );
  useEffect(() => {
    user && setSchool_id(user.id);
  }, [user]);

  const GetExaminations = async () => {
    try {
      const result = await db
        .select()
        .from(Examinations)
        .orderBy(Examinations.createdAt);
      console.log(result);
      setExamsList(result.reverse());
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const GetScores = async (school_id: string, exams_id: number) => {
    try {
      const result: any = await db
        .select()
        .from(ScoreTable)
        .where(eq(ScoreTable.school_id, school_id));

      const length = result.length;

      // Summing scores for each subject
      const totalScores = sumScores(result);
      const overallTotal =
        totalScores.math_tot +
        totalScores.english_tot +
        totalScores.science_tot +
        totalScores.social_tot +
        totalScores.rme_tot +
        totalScores.french_tot +
        totalScores.comp_tot +
        totalScores.career_tot +
        totalScores.c_arts_tot +
        totalScores.gh_lang_tot;

      const Average = overallTotal / (length * 10);

      setExamAverage(Average);

      setExamScores([
        {
          subject: "Maths",
          total: totalScores.math_tot / length,
        },
        {
          subject: "English",
          total: totalScores.english_tot / length,
        },
        {
          subject: "Science",
          total: totalScores.science_tot / length,
        },
        {
          subject: "Social Studies",
          total: totalScores.social_tot / length,
        },
        {
          subject: "RME",
          total: totalScores.rme_tot / length,
        },
        {
          subject: "French",
          total: totalScores.french_tot / length,
        },
        {
          subject: "ICT",
          total: totalScores.comp_tot / length,
        },
        {
          subject: "Career",
          total: totalScores.career_tot / length,
        },
        {
          subject: "Creative Arts",
          total: totalScores.c_arts_tot / length,
        },
        {
          subject: "Ghanaian Language",
          total: totalScores.gh_lang_tot / length,
        },
      ]);

      return result;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const sumScores = (scores: any[]) => {
    // Initialize an object to hold the total scores for each subject
    const totals = {
      c_arts_tot: 0,

      career_tot: 0,
      comp_tot: 0,
      english_tot: 0,
      french_tot: 0,
      gh_lang_tot: 0,
      math_tot: 0,
      rme_tot: 0,
      science_tot: 0,
      social_tot: 0,
    };

    // Iterate through each score object and sum the scores
    scores.forEach((score) => {
      totals.c_arts_tot += score.c_arts_tot || 0;
      totals.career_tot += score.career_tot || 0;
      totals.comp_tot += score.comp_tot || 0;
      totals.english_tot += score.english_tot || 0;
      totals.french_tot += score.french_tot || 0;
      totals.gh_lang_tot += score.gh_lang_tot || 0;
      totals.math_tot += score.math_tot || 0;
      totals.rme_tot += score.rme_tot || 0;
      totals.science_tot += score.science_tot || 0;
      totals.social_tot += score.social_tot || 0;
    });

    return totals;
  };

  useEffect(() => {
    GetExaminations();
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      GetExaminations();
    }, 100);
  }, []);

  useEffect(() => {
    ExamsList.length > 0 && setRecentExam(ExamsList[0]);
  }, [ExamsList]);

  useEffect(() => {
    school_id && user && recentExam?.id && GetScores(school_id, recentExam.id);
  }, [school_id]);

  return (
    <Card className="w-full">
      <CardHeader className="p-4 text-center">
        <AiExplain chartData={examScores} otherPrompt={prompt} />
        <CardTitle>Average Student Performance</CardTitle>
        <CardDescription>{recentExam?.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={examScores}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="subject"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="total" fill="var(--color-total)" radius={4} />
          </BarChart>
        </ChartContainer>
        <CardFooter className="flex flex-col p-2 border-t justify-center">
          Exam average: {examAverage.toFixed(2)}
        </CardFooter>
      </CardContent>
    </Card>
  );
}

import { Label } from "recharts";

import { and, eq } from "drizzle-orm";
import AiExplain from "@/components/custom/AiExplain";
import StudentAIExplain from "@/components/custom/StudentDetails.tsx/StudentAIExplain";

const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
  subject: {
    label: "Subject",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

import {
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
