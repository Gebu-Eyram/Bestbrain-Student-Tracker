"use client";
import Link from "next/link";
import {
  Car,
  CircleUser,
  Loader2,
  Menu,
  Package2,
  PlusCircleIcon,
  Save,
  Scroll,
  Search,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface Props {
  params: {
    school_id: string;
  };
}

const page = ({ params }: Props) => {
  return (
    <main>
      <Dashboard school_id={params.school_id} />
    </main>
  );
};

import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default page;
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabList } from "@headlessui/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { STUDENTSCORES } from "@/app/dataTable/form-data-table";
import { db } from "@/utils/db";
import { Examinations, Schools, ScoreTable, Students } from "@/utils/schema";
import { STUDENTS } from "@/components/custom/sections/admin/pageComp/StudentComponents";
import { SCHOOLS } from "@/components/custom/sections/SchoolComps";
import { and, eq } from "drizzle-orm";
import { useForm } from "react-hook-form";
import { EXAMINATIONS, EXAMSCORES } from "@/app/_services/types";
// import { UpdateMathScore } from "@/app/_services/methods";
import { useToast } from "@/hooks/use-toast";
import { UpdateExamScore } from "@/app/_services/methods";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ScienceTable from "@/components/InputTables/ScienceTable";
import MathTable from "@/components/InputTables/MathTable";
import SocialTable from "@/components/InputTables/SocialTable";
import EnglishTable from "@/components/InputTables/EnglishTable";
import CArtsTable from "@/components/InputTables/CArtsTable";
import RMETable from "@/components/InputTables/RMETable";
import FrenchTable from "@/components/InputTables/FrenchTable";
import CompTable from "@/components/InputTables/CompTable";
import GHLangTable from "@/components/InputTables/GHLangTable";
import CareerTable from "@/components/InputTables/CareerTable";

interface SchoolProps {
  school_id: string;
}

const Dashboard = ({ school_id }: SchoolProps) => {
  const [open, setOpen] = useState(false);
  const [ExamsList, setExamsList] = useState<EXAMINATIONS[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<string>();

  const GetExaminations = async () => {
    try {
      const result = await db
        .select()
        .from(Examinations)
        .orderBy(Examinations.name);

      setExamsList(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    GetExaminations();
  }, []);

  useEffect(() => {
    ExamsList.length > 0 && setOpen(true);
  }, [ExamsList]);

  return (
    <div className="flex h-full w-full flex-col">
      <main className="flex flex-1 flex-col gap-4  p-2 sm:p-4 md:gap-8 ">
        <AlertDialog open={open}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogAction
                onClick={() => setOpen(false)}
                className="w-fit !bg-transparent border absolute right-3 top-3 p-2 px-3"
              >
                <X className="w-4 h-4" />
              </AlertDialogAction>
              <AlertDialogTitle>Choose your examination</AlertDialogTitle>
              <AlertDialogDescription>
                To change the examination please refresh the page.
              </AlertDialogDescription>
              <Select onValueChange={setSelectedExamId}>
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="Choose an exam" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Exams</SelectLabel>
                    {ExamsList.map((exam) => (
                      <SelectItem key={exam.id} value={exam.id.toString()}>
                        {exam.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </AlertDialogHeader>
            <AlertDialogFooter className="border-t py-4">
              <AlertDialogAction
                onClick={() => setOpen(false)}
                className="ml-auto"
              >
                Done
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <h1 className="text-2xl sm:text-3xl font-semibold">Subjects</h1>

        <Tabs
          defaultValue="maths"
          className="mx-auto  w-full  items-start gap-6"
        >
          <TabsList className="flex h-fit gap-6">
            <ScrollArea className="w-full">
              <TabsTrigger value="maths">Mathematics</TabsTrigger>
              <TabsTrigger value="science">Int. Science</TabsTrigger>
              <TabsTrigger value="english">English</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="c_arts">C. Arts</TabsTrigger>
              <TabsTrigger value="rme">RME</TabsTrigger>
              <TabsTrigger value="comp">Comp</TabsTrigger>
              <TabsTrigger value="french">French</TabsTrigger>
              <TabsTrigger value="gh_lang">GH. Lang</TabsTrigger>
              <TabsTrigger value="career">C. Tech</TabsTrigger>
            </ScrollArea>
          </TabsList>
          <div className=" gap-6">
            <TabsContent value="maths">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Mathematics</CardTitle>
                </CardHeader>

                <CardContent>
                  <ScrollArea className="h-[80vh] w-full">
                    <MathTable
                      exams_id={selectedExamId}
                      school_id={school_id}
                    />
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="science">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Int. Science</CardTitle>
                </CardHeader>

                <CardContent>
                  <ScrollArea className="h-[80vh] w-full">
                    <ScienceTable
                      exams_id={selectedExamId}
                      school_id={school_id}
                    />
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="english">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">English</CardTitle>
                </CardHeader>

                <CardContent>
                  <ScrollArea className="h-[80vh] w-full">
                    <EnglishTable
                      exams_id={selectedExamId}
                      school_id={school_id}
                    />
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="social">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Social Studies</CardTitle>
                </CardHeader>

                <CardContent>
                  <ScrollArea className="h-[80vh] w-full">
                    <SocialTable
                      exams_id={selectedExamId}
                      school_id={school_id}
                    />
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="c_arts">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Creative Arts</CardTitle>
                </CardHeader>

                <CardContent>
                  <ScrollArea className="h-[80vh] w-full">
                    <CArtsTable
                      exams_id={selectedExamId}
                      school_id={school_id}
                    />
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="rme">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">R.M.E</CardTitle>
                </CardHeader>

                <CardContent>
                  <ScrollArea className="h-[80vh] w-full">
                    <RMETable exams_id={selectedExamId} school_id={school_id} />
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="comp">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Computing</CardTitle>
                </CardHeader>

                <CardContent>
                  <ScrollArea className="h-[80vh] w-full">
                    <CompTable
                      exams_id={selectedExamId}
                      school_id={school_id}
                    />
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="french">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">French</CardTitle>
                </CardHeader>

                <CardContent>
                  <ScrollArea className="h-[80vh] w-full">
                    <FrenchTable
                      exams_id={selectedExamId}
                      school_id={school_id}
                    />
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="gh_lang">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Ghanaian Language</CardTitle>
                </CardHeader>

                <CardContent>
                  <ScrollArea className="h-[80vh] w-full">
                    <GHLangTable
                      exams_id={selectedExamId}
                      school_id={school_id}
                    />
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="career">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Career Tech.</CardTitle>
                </CardHeader>

                <CardContent>
                  <ScrollArea className="h-[80vh] w-full">
                    <CareerTable
                      exams_id={selectedExamId}
                      school_id={school_id}
                    />
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};
