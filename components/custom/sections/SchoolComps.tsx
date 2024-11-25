"use client";
import {
  Activity,
  CheckIcon,
  CreditCard,
  DollarSign,
  PencilIcon,
  PencilRuler,
  School2Icon,
  Search,
  Trash2Icon,
  UserCheck,
  Users2,
  Users2Icon,
} from "lucide-react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
const includedFeatures = [
  "Real-time data",
  "School records",
  "Student records",
  "Examination records",
];

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Charts } from "./Charts";

import { db } from "@/utils/db";
import { Examinations, Schools, Students, Users } from "@/utils/schema";
import { useRouter } from "next/navigation";
import { STUDENTS } from "./admin/pageComp/StudentComponents";
import { set } from "react-hook-form";

export interface SCHOOLS {
  id: string;
  name: string;
  email: string;
  contact: string;
  address: string;
  region: string;
  createdAt: string;
  picture: string;
  desc: string;
}

interface Props {
  schoolData: SCHOOLS;
}

const SchoolsHead = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    GetResults();
  }, []); // No dependency on schools state here

  const GetResults = async () => {
    try {
      const result: any = await db
        .select()
        .from(Schools)
        .orderBy(Schools.createdAt);
      setSchools(result); // Update the schools state
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <div className="mx-auto   rounded-3xl ring-1 ring-border  lg:mx-0 lg:flex lg:max-w-none">
        <div className="p-8 sm:p-10 slg:flex-auto">
          <h3 className="text-2xl sm:text-4xl text-foreground/80 font-semibold tracking-tight">
            Welcome Admin,
          </h3>
          <p className="mt-6 text-base leading-7 text-foreground/60">
            {/* Schools are at the heart of what we do. This is a platform for
            schools to access themselves, their strengths and weaknesses to
            prepare their wards for a bright future. */}
            Here you can manage schools, students, and examinations. You can
            also view statistics and charts to get a better understanding of the
            data.
          </p>
          <div className="mt-10 flex items-center gap-x-4">
            <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
              What’s included
            </h4>
            <div className="h-px flex-auto bg-border" />
          </div>
          <ul
            role="list"
            className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-foreground/80 sm:grid-cols-2 sm:gap-6"
          >
            {includedFeatures.map((feature) => (
              <li key={feature} className="flex gap-x-3">
                <CheckIcon
                  aria-hidden="true"
                  className="h-6 w-5 flex-none text-indigo-600"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
          <div className="rounded-2xl bg-muted/30 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
            <div className="mx-auto max-w-xs px-8">
              <p className="text-base font-semibold text-foreground/80">
                Schools from all-over the country
              </p>
              <p className="mt-6 flex items-baseline justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-primary">
                  {schools ? schools.length : 0}
                </span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-foreground/80">
                  SCHOOLS
                </span>
              </p>
              <Link
                href="/admin/schools/add"
                className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add school
              </Link>
              <p className="mt-6 text-xs leading-5 text-foreground/80">
                A school must be added before you can add students and student
                data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function SchoolStats() {
  const [Exams, setExams] = useState([]);
  const [UsersList, setUserList] = useState([]);
  const [schools, setSchools] = useState<SCHOOLS[]>([]);
  const [schoolsByMonth, setSchoolsByMonth] = useState<{
    [month: string]: number;
  }>({});

  useEffect(() => {
    const schoolsByMonth: { [month: string]: number } = {};
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

      if (!schoolsByMonth[month]) {
        schoolsByMonth[month] = 0;
      }

      schoolsByMonth[month]++;
    });

    months.forEach((month) => {
      if (!schoolsByMonth[month]) {
        schoolsByMonth[month] = 0;
      }
    });

    setSchoolsByMonth(schoolsByMonth);
  }, [schools]);

  useEffect(() => {
    console.log(schoolsByMonth);
  }, [schoolsByMonth]);

  const [schoolsThisMonth, setSchoolsThisMonth] = useState(0);
  const [StudentsThisMonth, setStudentsThisMonth] = useState(0);

  const GetResults = async () => {
    try {
      const result: any = await db
        .select()
        .from(Schools)
        .orderBy(Schools.createdAt);
      setSchools(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const GetUsers = async () => {
    try {
      const result: any = await db.select().from(Users);
      setUserList(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const GetExams = async () => {
    try {
      const result: any = await db.select().from(Examinations);
      setExams(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const [StudentsList, setStudentsList] = useState<STUDENTS[]>([]);

  const GetStudents = async () => {
    try {
      const result = await db.select().from(Students);
      setStudentsList(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const { UpdateContent, setUpdateContent } = useContext(UpdateContentContext);

  useEffect(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const filteredData = schools.filter((school: SCHOOLS) => {
      const schoolDate = new Date(school.createdAt);
      return schoolDate.getMonth() === currentMonth;
    });
    setSchoolsThisMonth(filteredData.length);
    const filteredDataStudents = StudentsList.filter((students: STUDENTS) => {
      const studentDate = new Date(students.createdAt);
      return studentDate.getMonth() === currentMonth;
    });
    setStudentsThisMonth(filteredDataStudents.length);
  }, [StudentsList, schools]);
  useEffect(() => {
    GetResults();
    GetExams();
    GetUsers();
    GetStudents();
    GetResults();
  }, []);
  useEffect(() => {
    GetResults();
    GetExams();
    GetUsers();
    GetStudents();
    GetResults();
  }, [UpdateContent]);

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Schools</CardTitle>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="hover:bg-inherit bg-red-100 hover:bg-red-100"
          >
            <School2Icon className="h-4 w-4 text-red-800" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+ {schoolsThisMonth}</div>
          <p className="text-xs text-muted-foreground">
            Schools created this month
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="hover:bg-blue-100 bg-blue-100 "
          >
            <Users2Icon className="h-4 w-4 text-blue-700" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{StudentsList?.length || 0}</div>
          <p className="text-xs text-muted-foreground">
            <span
              className={` font-bold ${
                StudentsThisMonth > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {StudentsThisMonth}
            </span>{" "}
            students from this month
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Examinations</CardTitle>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="hover:bg-green-100 bg-green-100 text-green-800"
          >
            <PencilRuler className="h-4 w-4 " />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Exams.length}</div>
          <p className="text-xs text-muted-foreground">
            Examinations conduted this year.
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Users</CardTitle>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="hover:bg-yellow-100 bg-yellow-100 text-yellow-800"
          >
            <UserCheck className="h-4 w-4 " />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{UsersList.length}</div>
          <p className="text-xs text-muted-foreground">
            Each user has their assigned school
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
export default SchoolsHead;
// table elements
// table elements
// table elements
// table elements

import { Input } from "@/components/ui/input";

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [10, 25, 50, 100];

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DeleteSchool } from "@/app/_services/methods";

import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export function SchoolsTable({ refreshData }: any) {
  const { updateContent, setUpdateContent } = useContext(UpdateContentContext);
  const [schools, setSchools] = useState<SCHOOLS[]>([]);
  const { toast } = useToast();
  const LinkComp = (p: any) => {
    return <Link href={`/admin/schools/details/${p.data.id}`}>{p.value}</Link>;
  };
  const customButton = (params: any) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size={"icon"}>
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                DeleteSchool(params.data.id);
                toast({
                  title: "Record deleted ",
                  description: "The record has been permanently deleted.",
                  action: (
                    <ToastAction altText="Goto schedule to undo">
                      Undo
                    </ToastAction>
                  ),
                });
                refreshData(GetResults);
                router.refresh();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  useEffect(() => {
    GetResults();
  }, []); // No dependency on schools state here

  const GetResults = async () => {
    try {
      const result: any = await db.select().from(Schools).orderBy(Schools.name);
      const reversedResult = result.reverse();
      setSchools(result); // Update the schools state
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const router = useRouter();

  return (
    <div className=" lg:col-span-2">
      <Card className="max-sm:pb-0 w-full o">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-4xl">Schools</CardTitle>
          <CardDescription>A list of all schools in the system</CardDescription>
        </CardHeader>{" "}
        <ScrollArea className="flex flex-col w-full overflow-auto">
          <CardContent className="max-sm:p-0 ">
            <DataTable columns={SchoolColumns} data={schools} />
          </CardContent>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
    </div>
  );
}

import { Computer, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/app/dataTable/data-table";
import { SchoolColumns } from "@/app/dataTable/definitions";
import { UpdateContentContext } from "@/app/(context)/UpdateContext";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="max-[374px]:hidden" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="flex gap-2"
          onClick={() => {
            setTheme("light");
          }}
        >
          <Sun className="w-4 h-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-2"
          onClick={() => {
            setTheme("dark");
          }}
        >
          <Moon className="w-4 h-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-2"
          onClick={() => {
            setTheme("system");
          }}
        >
          <Computer className="w-4 h-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
