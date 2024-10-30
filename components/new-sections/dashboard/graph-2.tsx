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
    `You are a school grading expert in Ghana. You follow rules. This data presents the average scores of students in recent examinations across various subjects. Please analyze the trends in student performance and explain these to the school owner. Highlight any issues and suggest remedies for low scores, referencing the school's average performance. 
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
    Eg6: 29.99 is in the range 25 to 29 and should be considered LOW according to the grading scale.
    `
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
      setExamsList(result.reverse().slice(0, 3)); // Get last three exams
      if (result.length > 0) {
        result
          .reverse()
          .slice(0, 3)
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
        .where(eq(ScoreTable.school_id, school_id));

      const length = result.length;
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
    <Card className="flex flex-col w-full h-full border-none">
      <CardHeader className="items-center  relative pb-0">
        <AiExplain chartData={chartData} otherPrompt={prompt} />
        <CardTitle>Core Subject Performance</CardTitle>
        <CardDescription>
          Core Subject Averages from Last Three Exams
        </CardDescription>
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
