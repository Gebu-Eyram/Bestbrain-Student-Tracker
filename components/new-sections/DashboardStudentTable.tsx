"use client";
import { UpdateContentContext } from "@/app/(context)/UpdateContext";
import { useContext, useEffect, useState } from "react";
import { STUDENTS } from "../custom/sections/admin/pageComp/StudentComponents";
import { db } from "@/utils/db";
import { Students } from "@/utils/schema";
import { eq } from "drizzle-orm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DataTable } from "@/app/dataTable/data-table";
import {
  MiniStudentColumnsUser,
  StudentColumnsUser,
} from "@/app/dataTable/definitions";
import { MinimalDataTable } from "@/app/dataTable/minimal-data-table";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "../ui/scroll-area";
import Link from "next/link";
import { Button } from "../ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function DashboardStudentTable() {
  const [school_id, setSchool_id] = useState("");
  const { user } = useKindeBrowserClient();
  useEffect(() => {
    user ? setSchool_id(user?.id) : console.log("No user");
  }, [user]);
  useEffect(() => {
    GetStudents(school_id);
  }, [school_id]);

  useEffect(() => {
    GetStudents(school_id);
  }, [school_id]);
  const [StudentsList, setStudentsList] = useState<STUDENTS[]>([]);

  const GetStudents = async (id: string) => {
    try {
      const result = await db
        .select()
        .from(Students)
        .where(eq(Students.school_id, id));
      setStudentsList(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <Card className="h-full w-full border-none">
      <CardHeader>
        <CardTitle className=" text-2xl lg:text-4xl">
          {StudentsList.length
            ? `Students (${StudentsList.length})`
            : "No students yet"}
        </CardTitle>
        <CardDescription>
          Manage your students and view their performance.
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <div className="">
          <MinimalDataTable
            columns={MiniStudentColumnsUser}
            data={StudentsList}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardStudentLink() {
  const [school_id, setSchool_id] = useState("");
  const { user } = useKindeBrowserClient();
  useEffect(() => {
    user ? setSchool_id(user?.id) : console.log("No user");
  }, [user]);
  useEffect(() => {
    GetStudents(school_id);
  }, [school_id]);

  const [StudentsList, setStudentsList] = useState<STUDENTS[]>([]);

  const GetStudents = async (id: string) => {
    try {
      const result = await db
        .select()
        .from(Students)
        .where(eq(Students.school_id, id));
      setStudentsList(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <Card className=" w-full border-none shadow-none">
      <CardHeader className=" border-none bg-muted rounded-md flex items-center justify-center">
        <CardTitle className=" text-4xl lg:text-4xl">
          {StudentsList.length ? `${StudentsList.length}` : "0"}
        </CardTitle>
        <CardDescription>
          <span>STUDENTS</span>
        </CardDescription>
      </CardHeader>

      <CardFooter className=" p-0 pt-4 ">
        <Link
          href="/dashboard/students"
          className="flex items-center gap-1 w-full"
        >
          <Button variant="outline" className="w-full">
            View Students
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
