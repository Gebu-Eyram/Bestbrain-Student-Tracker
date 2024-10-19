"use client";
import { STUDENTS } from "@/components/custom/sections/admin/pageComp/StudentComponents";
import { Charts } from "@/components/custom/sections/Charts";
import {
  AreaChartComp,
  BarChartComp,
  LineChartComp,
} from "@/components/custom/sections/LineChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SchoolsHead, {
  SCHOOLS,
  SchoolsTable,
  SchoolStats,
} from "@/components/custom/sections/SchoolComps";

import { db } from "@/utils/db";
import { Schools, Students, Users } from "@/utils/schema";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect, useState } from "react";
import { AreaChart, BarChart } from "lucide-react";
import AiExplain from "@/components/custom/AiExplain";
import ExamsCard from "@/components/custom/ExamsCard";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { eq } from "drizzle-orm";

const AdminSchools = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useKindeBrowserClient();
  const { toast } = useToast();

  const [userList, setUserList] = useState<any[]>([]);
  const [authUser, setAuthUser] = useState<any>(null);

  useEffect(() => {
    user && setAuthUser(user);
  }, [user]);

  const GetCurrentUser = async () => {
    try {
      const result: any = await db
        .select()
        .from(Users)
        .where(eq(Users.id, authUser?.id));
      setUserList(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    authUser && GetCurrentUser();
  }, [authUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (userList.length > 0 && userList[0].role !== "admin") {
          console.log(userList);
          toast({
            title: "Unauthorized Access",
            description: "You are not authorized to view this page",
          });
          router.push("/dashboard");
        }
      } catch (error: any) {
        console.error(error.message);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [userList]);
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (userList[0].role !== "admin") {
          router.push("/dashboard");
          toast({
            title: "Unauthorized Access",
            description: "You are not authorized to view this page",
          });
        }
        if (userList.length < 1) {
          router.push("/dashboard");
          toast({
            title: "Unauthorized Access",
            description: "You are not authorized to view this page",
          });
        }
      } catch (error: any) {
        console.error(error.message);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const [schools, setSchools] = useState<SCHOOLS[]>([]);
  const [students, setStudents] = useState<STUDENTS[]>([]);
  const [schoolsByMonth, setSchoolsByMonth] = useState<
    { month: string; schools: number; students: number }[]
  >([]);

  const GetSchools = async () => {
    try {
      const result: SCHOOLS[] = await db
        .select()
        .from(Schools)
        .orderBy(Schools.createdAt);
      setSchools(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const GetStudents = async () => {
    try {
      const result: STUDENTS[] = await db
        .select()
        .from(Students)
        .orderBy(Students.createdAt);
      setStudents(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const schoolsByMonth: {
      month: string;
      schools: number;
      students: number;
    }[] = [];
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

    schools.forEach((school) => {
      const createdAt = new Date(school.createdAt);
      const month = months[createdAt.getMonth()];

      const existingMonth = schoolsByMonth.find((m) => m.month === month);
      if (existingMonth) {
        existingMonth.schools++;
      } else {
        schoolsByMonth.push({ month, schools: 1, students: 0 });
      }
    });

    students.forEach((student) => {
      const createdAt = new Date(student.createdAt);
      const month = months[createdAt.getMonth()];

      const existingMonth = schoolsByMonth.find((m) => m.month === month);
      if (existingMonth) {
        existingMonth.students++;
      } else {
        schoolsByMonth.push({ month, schools: 0, students: 1 });
      }
    });

    months.forEach((month) => {
      const existingMonth = schoolsByMonth.find((m) => m.month === month);
      if (!existingMonth) {
        schoolsByMonth.push({ month, schools: 0, students: 0 });
      }
    });

    schoolsByMonth.sort(
      (a, b) => months.indexOf(a.month) - months.indexOf(b.month)
    );

    setSchoolsByMonth(schoolsByMonth);
  }, [schools, students]);

  useEffect(() => {
    GetSchools();
    GetStudents();
  }, []);

  //Schools by day

  const [schoolsByDay, setSchoolsByDay] = useState<
    { date: string; schools: number; students: number }[]
  >([]);

  useEffect(() => {
    const schoolsByDay: { date: string; schools: number; students: number }[] =
      [];
    const currentDate = new Date();
    const threeMonthsAgo = new Date(
      currentDate.getTime() - 3 * 30 * 24 * 60 * 60 * 1000
    );

    schools.forEach((school) => {
      const createdAt = new Date(school.createdAt);
      if (createdAt >= threeMonthsAgo) {
        const date = createdAt.toISOString().split("T")[0];
        const existingDay = schoolsByDay.find((d) => d.date === date);
        if (existingDay) {
          existingDay.schools++;
        } else {
          schoolsByDay.push({ date, schools: 1, students: 0 });
        }
      }
    });

    students.forEach((student) => {
      const createdAt = new Date(student.createdAt);
      if (createdAt >= threeMonthsAgo) {
        const date = createdAt.toISOString().split("T")[0];
        const existingDay = schoolsByDay.find((d) => d.date === date);
        if (existingDay) {
          existingDay.students++;
        } else {
          schoolsByDay.push({ date, schools: 0, students: 1 });
        }
      }
    });

    //@ts-ignore
    schoolsByDay.sort((a, b) => new Date(b.date) - new Date(a.date));

    setSchoolsByDay(schoolsByDay);
  }, [schools, students]);

  return (
    <div className="grid w-full md:gap-6 gap-4 bg-background">
      <SchoolsHead />
      <SchoolStats />
      <div className="grid flex-1 items-start gap-4  sm:py-0 md:gap-8 lg:grid-cols-2 ">
        <SchoolsTable />

        <Tabs defaultValue="bar" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bar">
              <div className="flex items-center gap-2">
                <BarChart className=" w-4 h-4" />
                Bar
              </div>
            </TabsTrigger>
            <TabsTrigger value="area">
              <div className="flex items-center gap-2">
                <AreaChart className=" w-4 h-4" />
                Area
              </div>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="bar">
            <BarChartComp data={schoolsByMonth} />
          </TabsContent>
          <TabsContent value="area">
            <AreaChartComp data={schoolsByMonth} />
          </TabsContent>
        </Tabs>
        <ExamsCard />
      </div>
    </div>
  );
};

export default AdminSchools;
