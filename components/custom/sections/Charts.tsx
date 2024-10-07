"use client";

import { Bar, BarChart } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { SCHOOLS } from "./SchoolComps";
import { db } from "@/utils/db";
import { Schools } from "@/utils/schema";

const chartConfig = {
  desktop: {
    label: "Schools",
    color: "#2563eb",
  },
  // mobile: {
  //   label: "Mobile",
  //   color: "#60a5fa",
  // },
} satisfies ChartConfig;

export function Charts() {
  interface School {
    createdAt: Date;
  }

  interface ChartData {
    month: string;
    schools: number;
  }

  const [schools, setSchools] = useState<any>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    GetResults();
  }, []);

  const GetResults = async () => {
    try {
      const result = await db.select().from(Schools).orderBy(Schools.createdAt);
      setSchools(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const chartDataObject: { [month: string]: number } = {};
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    schools.forEach((school: School) => {
      const schoolDate = new Date(school.createdAt);
      const month = months[schoolDate.getMonth()];
      if (!chartDataObject[month]) {
        chartDataObject[month] = 0;
      }
      chartDataObject[month]++;
    });

    const chartDataArray: ChartData[] = Object.keys(chartDataObject).map(
      (month) => ({
        month,
        schools: chartDataObject[month],
      })
    );

    setChartData(chartDataArray);
  }, [schools]);
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
