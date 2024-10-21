"use client";

import { Settings, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

import { db } from "@/utils/db";
import { Examinations, Schools, ScoreTable, Students } from "@/utils/schema";

import { EXAMINATIONS, EXAMSCORES } from "@/app/_services/types";
// import { UpdateMathScore } from "@/app/_services/methods";

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
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import MathSchoolTable from "./MathSchoolTable";
import ScienceSchoolTable from "./ScienceSchoolTable";
import EnglishSchoolTable from "./EnglishSchoolTable";
import SocialSchoolTable from "./SocialTable";
import CArtsSchoolTable from "./CArtsSchoolTable";
import CareerSchoolTable from "./CareerSchoolTable";
import CompSchoolTable from "./CompSchoolTable";
import RMESchoolTable from "./RMESchoolTable";
import FrenchSchoolTable from "./FrenchSchoolTable";
import GHLangSchoolTable from "./GHLangSchoolTable";

interface SchoolProps {
  school_id: string;
}

const ExaminationsDashboard = () => {
  const { user } = useKindeBrowserClient();
  const [school_id, setschool_id] = useState<string>("");

  useEffect(() => {
    user && setschool_id(user.id);
  }, [user]);

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
        <div className="flex gap-4 w-fit">
          <h1 className="text-2xl sm:text-3xl font-semibold">Subjects</h1>
          <Button onClick={() => setOpen(true)}>
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        <Tabs
          defaultValue="maths"
          className="mx-auto  w-full  items-start gap-6"
        >
          <TabsList className="flex h-fit flex-wrap gap-2 sm:gap-6 justify-start">
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
          </TabsList>
          <div className=" gap-6">
            <TabsContent value="maths">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Mathematics</CardTitle>
                </CardHeader>

                <CardContent>
                  <MathSchoolTable
                    exams_id={selectedExamId}
                    school_id={school_id}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="science">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Mathematics</CardTitle>
                </CardHeader>

                <CardContent>
                  <ScienceSchoolTable
                    exams_id={selectedExamId}
                    school_id={school_id}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="english">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">English</CardTitle>
                </CardHeader>

                <CardContent>
                  <EnglishSchoolTable
                    exams_id={selectedExamId}
                    school_id={school_id}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="social">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Social Studies</CardTitle>
                </CardHeader>

                <CardContent>
                  <SocialSchoolTable
                    exams_id={selectedExamId}
                    school_id={school_id}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="c_arts">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Creative Arts</CardTitle>
                </CardHeader>

                <CardContent>
                  <CArtsSchoolTable
                    exams_id={selectedExamId}
                    school_id={school_id}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="career">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Career Tech.</CardTitle>
                </CardHeader>

                <CardContent>
                  <CareerSchoolTable
                    exams_id={selectedExamId}
                    school_id={school_id}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="rme">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">R.M.E.</CardTitle>
                </CardHeader>

                <CardContent>
                  <RMESchoolTable
                    exams_id={selectedExamId}
                    school_id={school_id}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="french">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">French</CardTitle>
                </CardHeader>

                <CardContent>
                  <FrenchSchoolTable
                    exams_id={selectedExamId}
                    school_id={school_id}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="comp">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Computing</CardTitle>
                </CardHeader>

                <CardContent>
                  <CompSchoolTable
                    exams_id={selectedExamId}
                    school_id={school_id}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="gh_lang">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Ghanaian Lang.</CardTitle>
                </CardHeader>

                <CardContent>
                  <GHLangSchoolTable
                    exams_id={selectedExamId}
                    school_id={school_id}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default ExaminationsDashboard;
