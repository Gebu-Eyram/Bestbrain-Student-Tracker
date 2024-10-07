"use client";

import { DataTable } from "@/app/dataTable/data-table";
import { SchoolColumns } from "@/app/dataTable/definitions";

import { db } from "@/utils/db";
import { Schools, Students } from "@/utils/schema";

import React, { useEffect, useState } from "react";

interface PageProps {
  params: {
    student_id: string;
  };
}

const page = (props: PageProps) => {
  return (
    <div className="flex flex-col max-w-screen-lg mx-auto gap-4">
      <StudentPageHeader student_id={props.params.student_id} />

      <StudentForm />
    </div>
  );
};

export default page;

import {
  Loader2Icon,
  LucidePencilRuler,
  PenSquareIcon,
  PlusCircle,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const StudentForm = () => {
  return (
    <Card>
      <form action="">
        <CardHeader>
          <CardTitle className=" text-2xl md:text-3xl">
            Subject Scores
          </CardTitle>
          <CardDescription>Input the scores for both sections</CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className=" font-semibold text-primary/80 my-4">Core Subjects</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Subject</TableHead>

                <TableHead className=" max-w-60">Section A</TableHead>
                <TableHead className="max-w-60">Section B</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold line-clamp-1">
                  <span className="line-clamp-1">MATHEMATICS</span>
                </TableCell>
                <TableCell>
                  <Label htmlFor="mathematics-a" className="sr-only">
                    MATHEMATICS
                  </Label>
                  <Input id="mathematics-a" type="number" defaultValue="0" />
                </TableCell>
                <TableCell>
                  <Label htmlFor="mathematics-b" className="sr-only">
                    MATHEMATICS
                  </Label>
                  <Input id="mathematics-b" type="number" defaultValue="0" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold line-clamp-1">
                  <span className="line-clamp-1">INT. SCIENCE</span>
                </TableCell>
                <TableCell>
                  <Label htmlFor="science-a" className="sr-only">
                    INT. SCIENCE
                  </Label>
                  <Input id="science-a" type="number" defaultValue="0" />
                </TableCell>
                <TableCell>
                  <Label htmlFor="science-b" className="sr-only">
                    INT. SCIENCE
                  </Label>
                  <Input id="science-b" type="number" defaultValue="0" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold line-clamp-1">
                  <span className="line-clamp-1">ENGLISH LANGUAGE</span>
                </TableCell>
                <TableCell>
                  <Label htmlFor="eng-a" className="sr-only">
                    ENGLISH LANGUAGE
                  </Label>
                  <Input id="eng-a" type="number" defaultValue="0" />
                </TableCell>
                <TableCell>
                  <Label htmlFor="eng-b" className="sr-only">
                    ENGLISH LANGUAGE
                  </Label>
                  <Input id="eng-b" type="number" defaultValue="0" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold line-clamp-1">
                  <span className="line-clamp-1">SOCIAL STUDIES</span>
                </TableCell>
                <TableCell>
                  <Label htmlFor="soc-a" className="sr-only">
                    SOCIAL STUDIES
                  </Label>
                  <Input id="soc-a" type="number" defaultValue="0" />
                </TableCell>
                <TableCell>
                  <Label htmlFor="soc-b" className="sr-only">
                    SOCIAL STUDIES
                  </Label>
                  <Input id="soc-b" type="number" defaultValue="0" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <h1 className=" font-semibold text-primary/80 my-4">
            Other Subjects
          </h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Subject</TableHead>

                <TableHead className=" max-w-60">Section A</TableHead>
                <TableHead className="max-w-60">Section B</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold line-clamp-1">
                  <span className="line-clamp-1">COMPUTING</span>
                </TableCell>
                <TableCell>
                  <Label htmlFor="comp-a" className="sr-only">
                    COMPUTING
                  </Label>
                  <Input id="comp-a" type="number" defaultValue="0" />
                </TableCell>
                <TableCell>
                  <Label htmlFor="comp-b" className="sr-only">
                    COMPUTING
                  </Label>
                  <Input id="comp-b" type="number" defaultValue="0" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold line-clamp-1">
                  <span className="line-clamp-1">C.ARTS</span>
                </TableCell>
                <TableCell>
                  <Label htmlFor="carts-a" className="sr-only">
                    C.ARTS
                  </Label>
                  <Input id="carts-a" type="number" defaultValue="0" />
                </TableCell>
                <TableCell>
                  <Label htmlFor="carts-b" className="sr-only">
                    C.ARTS
                  </Label>
                  <Input id="carts-b" type="number" defaultValue="0" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">R.M.E.</TableCell>
                <TableCell>
                  <Label htmlFor="rme-a" className="sr-only">
                    R.M.E.
                  </Label>
                  <Input id="rme-a" type="number" defaultValue="0" />
                </TableCell>
                <TableCell>
                  <Label htmlFor="rme-b" className="sr-only">
                    R.M.E.
                  </Label>
                  <Input id="rme-b" type="number" defaultValue="0" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold line-clamp-1 w-full">
                  <span className="line-clamp-1">CAREER TECH</span>
                </TableCell>
                <TableCell>
                  <Label htmlFor="ctech-a" className="sr-only">
                    C. TECH
                  </Label>
                  <Input id="ctech-a" type="number" defaultValue="0" />
                </TableCell>
                <TableCell>
                  <Label htmlFor="ctech-b" className="sr-only">
                    C. TECH
                  </Label>
                  <Input id="ctech-b" type="number" defaultValue="0" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold line-clamp-1">
                  <span className="line-clamp-1">FRENCH</span>
                </TableCell>
                <TableCell>
                  <Label htmlFor="fre-a" className="sr-only">
                    FRENCH
                  </Label>
                  <Input id="fre-a" type="number" defaultValue="0" />
                </TableCell>
                <TableCell>
                  <Label htmlFor="fre-b" className="sr-only">
                    FRENCH
                  </Label>
                  <Input id="fre-b" type="number" defaultValue="0" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">GHANAIAN LANG</TableCell>
                <TableCell>
                  <Label htmlFor="ghl-a" className="sr-only">
                    GHANAIAN LANG
                  </Label>
                  <Input id="ghl-a" type="number" defaultValue="0" />
                </TableCell>
                <TableCell>
                  <Label htmlFor="ghl-b" className="sr-only">
                    GHANAIAN LANG.
                  </Label>
                  <Input id="ghl-b" type="number" defaultValue="0" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="justify-center border-t p-4">
          <Button size="sm" className="gap-1 ml-auto">
            <PlusCircle className="h-3.5 w-3.5" />
            Add scores
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

interface StudentIdProps {
  student_id: string;
}

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eq } from "drizzle-orm";
import { STUDENTS } from "@/components/custom/sections/admin/pageComp/StudentComponents";

const StudentPageHeader = ({ student_id }: StudentIdProps) => {
  const [studentData, setStudentData] = useState<STUDENTS[]>([]);
  const GetStudentData = async (student_id: string) => {
    try {
      const result = await db
        .select()
        .from(Students)
        .where(eq(Students.id, student_id));
      setStudentData(result);
    } catch (error) {}
  };

  useEffect(() => {
    GetStudentData(student_id);
  }, [student_id]);

  if (studentData && studentData.length > 0) {
    return (
      <div>
        <Card className="flex flex-col md:flex-row justify-between p-2">
          <div>
            <CardHeader>
              <CardTitle className="text-2xl md:text-4xl">
                {studentData[0].name}
              </CardTitle>
              <CardDescription className="text-lg">
                {studentData[0].school}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <div className="grid gap-6 sm:grid-cols-3">
                <div className="grid gap-3">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category" aria-label="Select category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="subcategory">Subcategory (optional)</Label>
                  <Select>
                    <SelectTrigger
                      id="subcategory"
                      aria-label="Select subcategory"
                    >
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="t-shirts">T-Shirts</SelectItem>
                      <SelectItem value="hoodies">Hoodies</SelectItem>
                      <SelectItem value="sweatshirts">Sweatshirts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div> */}
            </CardContent>
          </div>
          <Card className=" w-full sm:max-w-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Examinations
              </CardTitle>
              <LucidePencilRuler className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl p-2 font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Examinations registered for student.
              </p>
            </CardContent>
          </Card>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center">
        <div>
          <Loader2Icon className="w-10 h-10 text-muted-foreground animate-spin" />
        </div>
      </div>
    );
  }
};
