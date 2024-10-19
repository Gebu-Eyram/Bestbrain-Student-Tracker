"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ReferenceLine,
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
} from "@/components//ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components//ui/chart";
import { Separator } from "@/components//ui/separator";
import { EXAMINATIONS, EXAMSCORES } from "@/app/_services/types";
import { use, useEffect, useState } from "react";
import { Examinations, ScoreTable } from "@/utils/schema";
import { db } from "@/utils/db";
import { and, eq } from "drizzle-orm";
import { set } from "react-hook-form";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AiExplain from "../AiExplain";
import { TrendingUp } from "lucide-react";
import StudentAIExplain from "./StudentAIExplain";

interface GridBlockProps {
  student_id: string;
  exams_id: string;
}

export function GridBlock({ student_id, exams_id }: GridBlockProps) {
  return (
    <div className="chart-wrapper mx-auto flex w-full flex-col flex-wrap items-start justify-center gap-6 py-3 sm:py-6 sm:flex-row ">
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2 h-full grid gap-6 ">
          <CompExamsBar exams_id={exams_id} student_id={student_id} />
        </div>
        <div className="grid w-full sm:col-span-2 lg:col-span-1 sm:grid-cols-2 lg:grid-cols-1 h-fit flex-1 gap-6">
          <BoxComponent exams_id={exams_id} student_id={student_id} />
          <ExamStats exams_id={exams_id} student_id={student_id} />
        </div>
      </div>
    </div>
  );
}

const chartConfigExam = {
  total: {
    label: "Total",
  },
  maths: {
    label: "Maths",
    color: "hsl(var(--chart-1))",
  },
  science: {
    label: "Science",
    color: "hsl(var(--chart-2))",
  },
  social: {
    label: "Social",
    color: "hsl(var(--chart-3))",
  },
  english: {
    label: "English",
    color: "hsl(var(--chart-4))",
  },
  french: {
    label: "french",
    color: "hsl(var(--chart-5))",
  },
};
const CompExamsBar = ({ exams_id, student_id }: GridBlockProps) => {
  const [exam_name, setExamName] = useState<string>("");
  const GetExamName = async (exams_id: string) => {
    try {
      const result = await db
        .select()
        .from(Examinations)
        .where(eq(Examinations.id, parseInt(exams_id)));
      setExamName(result[0].name);
      return result;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    exams_id && GetExamName(exams_id);
  }, [exams_id]);
  // Exams Details
  const newExamid = parseInt(exams_id);

  //Get Scores
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
    scores.length > 0 &&
      setCoreScores([
        {
          subject: "Maths",
          score: scores[0].math_tot,
        },
        {
          subject: "Science",
          score: scores[0].science_tot,
        },
        {
          subject: "Social",
          score: scores[0].social_tot,
        },
        {
          subject: "English",
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
          subject: "Career",
          score: scores[0].career_tot,
        },
        {
          subject: "RME",
          score: scores[0].rme_tot,
        },
        {
          subject: "Comp",
          score: scores[0].comp_tot,
        },
        {
          subject: "Arts",
          score: scores[0].c_arts_tot,
        },
        {
          subject: "Gha Lang",
          score: scores[0].gh_lang_tot,
        },
      ]);
  }, [scores]);

  useEffect(() => {
    exams_id && student_id && GetScores(student_id, exams_id);
  }, [exams_id, student_id]);

  return (
    <Tabs defaultValue="core" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="core">Core</TabsTrigger>
        <TabsTrigger value="elective">Electives</TabsTrigger>
      </TabsList>
      <TabsContent value="core">
        <BarChartComp exam_name={exam_name} data={coreScores} />
      </TabsContent>
      <TabsContent value="elective">
        <BarChartComp exam_name={exam_name} data={electiveScores} />
      </TabsContent>
    </Tabs>
  );
};

// ExamStats
// ExamStats
// ExamStats
// ExamStats
// ExamStats
// ExamStats
// ExamStats
// ExamStats
// ExamStats

const ExamStats = ({ exams_id, student_id }: GridBlockProps) => {
  const newExamid = parseInt(exams_id);
  const [exam, setExam] = useState<EXAMINATIONS | null>(null);
  const GetExamData = async (exams_id: string) => {
    try {
      const result = await db
        .select()
        .from(Examinations)
        .where(eq(Examinations.id, newExamid));
      setExam(result[0]);
      return result;
    } catch (error: any) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    exams_id && GetExamData(exams_id);
  }, [exams_id]);

  //Get Scores
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

  const [totalScore, setTotalScore] = useState<number>(0);
  const [averageScore, setAverageScore] = useState<number>(0);
  const [highest, setHighest] = useState<number>(0);
  const [lowestScore, setLowest] = useState<number>(0);

  useEffect(() => {
    scores.length > 0 &&
      setCoreScores([
        {
          subject: "Maths",
          score: scores[0].math_tot,
        },
        {
          subject: "Science",
          score: scores[0].science_tot,
        },
        {
          subject: "Social",
          score: scores[0].social_tot,
        },
        {
          subject: "English",
          score: scores[0].english_tot,
        },
        {
          subject: "French",
          score: scores[0].french_tot,
        },
        {
          subject: "Career",
          score: scores[0].career_tot,
        },
        {
          subject: "RME",
          score: scores[0].rme_tot,
        },
        {
          subject: "Comp",
          score: scores[0].comp_tot,
        },
        {
          subject: "Arts",
          score: scores[0].c_arts_tot,
        },
        {
          subject: "Gha Lang",
          score: scores[0].gh_lang_tot,
        },
      ]);
  }, [scores]);

  useEffect(() => {
    let total = 0;
    let highestScore = 0;
    let lowestScore = 0;
    coreScores &&
      coreScores.forEach((item: any) => {
        total += item.score;
        highestScore = Math.max(highestScore, item.score);
        lowestScore = Math.min(lowestScore, item.score);
        setTotalScore(total);
        setHighest(highestScore);
        setLowest(lowestScore);
      });
  }, [coreScores]);

  useEffect(() => {
    console.log(totalScore);
  }, [totalScore]);

  // Function to find the highest score
  const findHighestScore = (scores: any) => {
    return Math.max(...scores.map((score: any) => score.total));
  };

  useEffect(() => {
    exams_id && student_id && GetScores(student_id, exams_id);
  }, [exams_id, student_id]);
  return (
    <Card className="w-full" x-chunk="charts-01-chunk-4">
      <CardHeader className="flex relative items-center pb-4">
        <CardTitle>Exam Stats</CardTitle>
        <CardDescription>Performance in the last exam</CardDescription>
        <StudentAIExplain
          chartData={[
            {
              total: totalScore,
              outOf: 1000,
            },
            {
              average: totalScore / 10,
              outOf: 100,
            },

            {
              highest: highest,
              outOf: 100,
            },
            {
              lowest: lowestScore,
              outOf: 100,
            },
          ]}
        />
      </CardHeader>

      <CardContent className="flex gap-4 p-4 pb-2">
        <ChartContainer
          config={{
            total: {
              label: "Total",
              color: "hsl(var(--chart-1))",
            },
            average: {
              label: "Average",
              color: "hsl(var(--chart-2))",
            },
            highest: {
              label: "Highest",
              color: "hsl(var(--chart-3))",
            },
            lowest: {
              label: "Lowest",
              color: "hsl(var(--chart-4))",
            },
          }}
          className="h-[140px] w-full"
        >
          <BarChart
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 10,
            }}
            data={[
              {
                activity: "total",
                value: (totalScore / 1000) * 100,
                label: totalScore,
                fill: "var(--color-total)",
              },

              {
                activity: "highest",
                value: highest,
                label: highest,
                fill: "var(--color-highest)",
              },
              {
                activity: "lowest",
                value: lowestScore,
                label: lowestScore,
                fill: "var(--color-lowest)",
              },
            ]}
            layout="vertical"
            barSize={32}
            barGap={2}
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="activity"
              type="category"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
              className="capitalize"
            />
            <Bar dataKey="value" radius={5}>
              <LabelList
                position="insideLeft"
                dataKey="label"
                fill="white"
                offset={8}
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-row border-t p-4">
        <div className="flex w-full items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Average</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              {totalScore / 10}
              <span className="text-sm font-normal text-muted-foreground">
                /100
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Lowest</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              {lowestScore}
              <span className="text-sm font-normal text-muted-foreground">
                %
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Highest</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              {highest}
              <span className="text-sm font-normal text-muted-foreground">
                %
              </span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--chart-1))",
  },
  subject: {
    label: "Subject",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

// Radar Chart
// Radar Chart
// Radar Chart
// Radar Chart
// Radar Chart
// Radar Chart
// Radar Chart

interface Props {
  data: any;
  exam_name?: string;
}

function BarChartComp({ data, exam_name }: Props) {
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle>{exam_name}</CardTitle>
        <CardDescription className=" line-clamp-1 max-w-64">
          Scores for each subject
        </CardDescription>
        <StudentAIExplain chartData={data} />
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <ReferenceLine
              y={1200}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                position="insideBottomLeft"
                value="Average Steps"
                offset={10}
                fill="hsl(var(--foreground))"
              />
              <Label
                position="insideTopLeft"
                value="12,343"
                className="text-lg"
                fill="hsl(var(--foreground))"
                offset={10}
                startOffset={100}
              />
            </ReferenceLine>

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
            <Bar dataKey="score" fill="var(--color-score)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Exam Scores
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - December 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

function BoxComponent({ exams_id, student_id }: GridBlockProps) {
  // Exams Details
  const newExamid = parseInt(exams_id);
  const [exam, setExam] = useState<EXAMINATIONS | null>(null);
  const GetExamData = async (exams_id: string) => {
    try {
      const result = await db
        .select()
        .from(Examinations)
        .where(eq(Examinations.id, newExamid));
      setExam(result[0]);
      return result;
    } catch (error: any) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    exams_id && GetExamData(exams_id);
  }, [exams_id]);

  //Get Scores
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
    scores.length > 0 &&
      setCoreScores([
        {
          subject: "Maths",
          score: scores[0].math_tot,
        },
        {
          subject: "Science",
          score: scores[0].science_tot,
        },
        {
          subject: "Social",
          score: scores[0].social_tot,
        },
        {
          subject: "English",
          score: scores[0].english_tot,
        },
        {
          subject: "French",
          score: scores[0].french_tot,
        },
        {
          subject: "Career",
          score: scores[0].career_tot,
        },
        {
          subject: "RME",
          score: scores[0].rme_tot,
        },
        {
          subject: "Comp",
          score: scores[0].comp_tot,
        },
        {
          subject: "Arts",
          score: scores[0].c_arts_tot,
        },
        {
          subject: "Gha Lang",
          score: scores[0].gh_lang_tot,
        },
      ]);

    scores.length > 0 &&
      setElectiveScores([
        {
          subject: "French",
          score: scores[0].french_tot,
        },
        {
          subject: "Career",
          score: scores[0].career_tot,
        },
        {
          subject: "RME",
          score: scores[0].rme_tot,
        },
        {
          subject: "Comp",
          score: scores[0].comp_tot,
        },
        {
          subject: "Arts",
          score: scores[0].c_arts_tot,
        },
        {
          subject: "Gha Lang",
          score: scores[0].gh_lang_tot,
        },
      ]);
  }, [scores]);

  useEffect(() => {
    exams_id && student_id && GetScores(student_id, exams_id);
  }, [exams_id, student_id]);
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Radar Chart - Strengths</CardTitle>
        <CardDescription>Scores Showing Strengths in Subjects</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={coreScores}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <PolarGrid className="fill-[--color-score] opacity-20" />
            <PolarAngleAxis
              dataKey="subject"
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Radar
              dataKey="score"
              fill="var(--color-score)"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
