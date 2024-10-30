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
import { Block } from "../BentoGrid";

export default function DashboardGraph1() {
  const { user } = useKindeBrowserClient();

  // Details

  const [ExamsList, setExamsList] = useState<EXAMINATIONS[]>([]);
  const [recentExam, setRecentExam] = useState<EXAMINATIONS>();
  const [coreAvg, setCoreAvg] = useState<number>(0);
  const [electiveAvg, setElectiveAvg] = useState<number>(0);
  const [school_id, setSchool_id] = useState<string>();
  const [examScores, setExamScores] = useState<any[]>([]);
  const [examAverage, setExamAverage] = useState<number>(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const [prompt, setPrompt] = useState<string>(
    `Give headings, sections or whatever you deem applicable. Words be elaborate and should range from 300 to 400 words. You are a school grading expert in Ghana. You follow rules. This data presents the average scores of students in recent examinations across various subjects. Please analyze the trends in student performance and explain these to the school owner. Highlight any issues but do not suggest remedies for low scores, only reference the school's average performance. 
Each score represents the average for all students in the school for this exam. The grading scale is as follows. Do not infer grades from average scores. PLEASE STICK TO THIS SCALE AND ONLY THIS SCALE. Please do not categorize grades relative to one anothr or use any scale apart from this: any deviations will render the information irrelevant.If you are unsure, please consult the school owner or the school's grading policy.:
    80 to 100 only: HIGHEST 
    70 to 79 only: HIGHER
    60 to 69 only: HIGH
    50 to 59 only: HIGH AVERAGE
    40 to 49 only: AVERAGE
    30 to 39 only: LOW AVERAGE
    25 to 29 only: LOW  
    20 to 24 only: LOWER
    0 to 19 only: LOWEST
    Important: Always correlate average scores with the corresponding grades DO NOT infer.
    Note:  Any average score below 50 is considered below average and should not be considered as "HIGH".
    Please identify possible reasons for the observed trends and correlate average scores with the corresponding grades. Conduct a thorough analysis of the data. Make sure to use tables to support your analysis. Be mindful of decimals as well. 
    Eg 1:42.125 is in the range 40 to 49 and should be considered AVERAGE according to the grading scale.
    Eg2: 54.23 is in the range 50 to 59 and should be considered HIGH AVERAGE according to the grading scale.
    Eg3: 19.99 is in the range 0 to 19 and should be considered LOWEST according to the grading scale.
    Eg4: 79.99 is in the range 70 to 79 and should be considered HIGHER according to the grading scale.
    Eg5: 93 is in the range 80 to 100 and should be considered HIGHEST according to the grading scale.
    Eg6: 29.99 is in the range 25 to 29 and should be considered LOW according to the grading scale.`
  );
  useEffect(() => {
    user && setSchool_id(user.id);
  }, [user]);

  useEffect(() => {
    if (user) {
      const school_id = user.id;
      GetExaminations(school_id);
    }
  }, [user]);

  const GetExaminations = async (school_id: any) => {
    try {
      const result = await db
        .select()
        .from(Examinations)
        .orderBy(Examinations.createdAt);
      setExamsList(result.reverse().slice(0)); // Get last three exams
      if (result.length > 0) {
        result
          .reverse()
          .slice(0)
          .forEach((exam) => {
            GetScores(school_id, exam.id.toLocaleString());
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const GetScores = async (school_id: any, exam_id: any) => {
    try {
      const result = await db
        .select()
        .from(ScoreTable)
        .where(
          and(
            eq(ScoreTable.school_id, school_id),
            eq(ScoreTable.exams_id, exam_id)
          )
        );

      const length = result.length;
      const totalScores = sumScores(result);

      // Prepare the average scores for each subject
      const averageScores = [
        { subject: "Maths", total: totalScores.math_tot / length },
        { subject: "English", total: totalScores.english_tot / length },
        { subject: "Science", total: totalScores.science_tot / length },
        { subject: "Social Studies", total: totalScores.social_tot / length },
        { subject: "RME", total: totalScores.rme_tot / length },
        { subject: "French", total: totalScores.french_tot / length },
        { subject: "ICT", total: totalScores.comp_tot / length },
        { subject: "Career", total: totalScores.career_tot / length },
        { subject: "Creative Arts", total: totalScores.c_arts_tot / length },
        {
          subject: "Ghanaian Language",
          total: totalScores.gh_lang_tot / length,
        },
      ];
      setCoreAvg(
        (totalScores.math_tot / length +
          totalScores.english_tot / length +
          totalScores.science_tot / length +
          totalScores.social_tot / length) /
          4
      );
      setElectiveAvg(
        (totalScores.rme_tot / length +
          totalScores.french_tot / length +
          totalScores.comp_tot / length +
          totalScores.career_tot / length +
          totalScores.c_arts_tot / length +
          totalScores.gh_lang_tot / length) /
          6
      );

      setExamScores(averageScores);

      // Calculate overall average
      const overallAverage =
        (totalScores.math_tot / length +
          totalScores.english_tot / length +
          totalScores.career_tot / length +
          totalScores.c_arts_tot / length +
          totalScores.comp_tot / length +
          totalScores.french_tot / length +
          totalScores.gh_lang_tot / length +
          totalScores.rme_tot / length +
          totalScores.science_tot / length +
          totalScores.social_tot / length) /
        10;
      setExamAverage(overallAverage);
    } catch (error) {
      console.error(error);
    }
  };

  const sumScores = (scores: any) => {
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

    scores.forEach((score: any) => {
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

  return (
    <Block className="col-span-12 row-span-1 h-fit p-0 border-none md:col-span-6 xl:col-span-4">
      <Card className="w-full">
        <CardHeader className="p-4 text-center">
          <AiExplain chartData={examScores} otherPrompt={prompt} />
          <CardTitle>Average School Performance</CardTitle>
          <CardDescription>
            Scores from the most recent examination.
          </CardDescription>
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
          <CardFooter className="flex flex-row border-t p-4">
            <div className="flex w-full items-center gap-2">
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Average</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  {examAverage.toFixed(2)}
                  <span className="text-sm font-normal text-muted-foreground">
                    /100
                  </span>
                </div>
              </div>
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Cores</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  {coreAvg.toFixed(2)}
                  <span className="text-sm font-normal text-muted-foreground">
                    %
                  </span>
                </div>
              </div>
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Electives</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  {electiveAvg.toFixed(2)}
                  <span className="text-sm font-normal text-muted-foreground">
                    %
                  </span>
                </div>
              </div>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </Block>
  );
}

import { and, eq } from "drizzle-orm";
import AiExplain from "@/components/custom/AiExplain";

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
