"use client";

import { ActivityIcon, GitCommitVertical } from "lucide-react";
import { Line, LineChart } from "recharts";

const chartConfig = {
  schools: {
    label: "Schools",
    color: "hsl(var(--chart-1))",
  },
  students: {
    label: "Students",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function LineChartComp({ data }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chart</CardTitle>
        <CardDescription>Yearly chart</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
              // bottom: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="schools"
              type="natural"
              stroke="var(--color-schools)"
              strokeWidth={2}
              dot={({ cx, cy, payload }) => {
                const r = 24;
                return (
                  <GitCommitVertical
                    key={payload.month}
                    x={cx - r / 2}
                    y={cy - r / 2}
                    width={r}
                    height={r}
                    fill="hsl(var(--background))"
                    stroke="var(--color-schools)"
                  />
                );
              }}
            />
            <Line
              dataKey="students"
              type="natural"
              stroke="var(--color-students)"
              strokeWidth={2}
              dot={({ cx, cy, payload }) => {
                const r = 24;
                return (
                  <GitCommitVertical
                    key={payload.month}
                    x={cx - r / 2}
                    y={cy - r / 2}
                    width={r}
                    height={r}
                    fill="hsl(var(--background))"
                    stroke="var(--color-schools)"
                  />
                );
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function AreaChartComp({ data }: any) {
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex items-center ">
          <Button variant={"outline"} size={"icon"}>
            <ActivityIcon size={24} />
          </Button>
          <span className="ml-2 sm:text-lg lg:text-xl">Activity</span>
        </CardTitle>
        <CardDescription>Students and schools by month</CardDescription>
        <AiExplain chartData={data} />
      </CardHeader>

      <CardContent>
        <ChartContainer className="p-2" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
              bottom: 12,
              top: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillSchools" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-schools)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-schools)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillStudents" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-students)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-students)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="students"
              type="natural"
              fill="url(#fillStudents)"
              fillOpacity={0.4}
              stroke="var(--color-students)"
              stackId="a"
            />
            <Area
              dataKey="schools"
              type="natural"
              fill="url(#fillSchools)"
              fillOpacity={0.4}
              stroke="var(--color-schools)"
              stackId="b"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Total enrollments
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
import { Bar, BarChart } from "recharts";
import { useMemo, useState } from "react";
import AiExplain from "../AiExplain";
import { Button } from "@/components/ui/button";

export function BarChartComp({ data }: any) {
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex items-center ">
          <Button variant={"outline"} size={"icon"}>
            <ActivityIcon size={24} />
          </Button>
          <span className="ml-2 sm:text-lg lg:text-xl">Activity</span>
        </CardTitle>
        <CardDescription className=" line-clamp-1 max-w-64">
          Students and schools by month
        </CardDescription>
        <AiExplain chartData={data} />
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="schools" fill="var(--color-schools)" radius={4} />
            <Bar dataKey="students" fill="var(--color-students)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Total enrollments
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
