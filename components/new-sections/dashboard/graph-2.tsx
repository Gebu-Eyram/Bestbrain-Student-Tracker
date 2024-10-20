"use client";

import { EXAMINATIONS } from "@/app/_services/types";
import AiExplain from "@/components/custom/AiExplain";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { db } from "@/utils/db";
import { Examinations, ScoreTable } from "@/utils/schema";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { eq } from "drizzle-orm";

import { useEffect, useState } from "react";
import { LabelList, Pie, PieChart, RadialBar, RadialBarChart } from "recharts";

const chartConfig = {
  total: {
    label: "Total",
  },
  math: {
    label: "Mathematics",
    color: "hsl(var(--chart-1))",
  },
  english: {
    label: "English",
    color: "hsl(var(--chart-2))",
  },
  science: {
    label: "Science",
    color: "hsl(var(--chart-3))",
  },
  social: {
    label: "Social Studies",
    color: "hsl(var(--chart-4))",
  },
  perfect: {
    label: "100%",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function DashboardGraph2() {
  const [chartData, setChartData] = useState<any[]>([]);
  const { user } = useKindeBrowserClient();

  // Details

  const [ExamsList, setExamsList] = useState<EXAMINATIONS[]>([]);
  const [recentExam, setRecentExam] = useState<EXAMINATIONS>();
  const [school_id, setSchool_id] = useState<string>();
  const [examScores, setExamScores] = useState<any[]>([]);
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
      setChartData([
        {
          subject: "math",
          total: totalScores.math_tot / length,
          fill: "var(--color-math)",
        },
        {
          subject: "science",
          total: totalScores.science_tot / length,
          fill: "var(--color-science)",
        },
        {
          subject: "english",
          total: totalScores.english_tot / length,
          fill: "var(--color-english)",
        },
        {
          subject: "social",
          total: totalScores.social_tot / length,
          fill: "var(--color-social)",
        },
        {
          subject: "100%",
          total: 100,
          fill: "var(--color-perfect)",
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
  }, []);

  useEffect(() => {
    ExamsList.length > 0 && setRecentExam(ExamsList[0]);
  }, [ExamsList]);

  useEffect(() => {
    school_id && user && recentExam?.id && GetScores(school_id, recentExam.id);
  }, [school_id]);

  return (
    <Card className="flex flex-col w-full border col-span-12 row-span-2  md:col-span-6 xl:col-span-4">
      <CardHeader className="items-center  relative pb-0">
        <AiExplain chartData={chartData} otherPrompt={prompt} />
        <CardTitle>Core Subject Performance</CardTitle>
        <CardDescription>{recentExam?.name}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 p-0 items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-squareh-full w-full"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="subject" />}
            />
            <RadialBar dataKey="total" background>
              <LabelList
                position="insideStart"
                dataKey="subject"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
