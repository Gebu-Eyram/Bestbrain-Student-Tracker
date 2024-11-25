"use client";
import { db } from "@/utils/db";
import { Schools, Students } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import React, { use, useContext, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { SCHOOLS } from "../SchoolComps";
import {
  Calendar,
  Mail,
  Map,
  MoreHorizontal,
  PhoneCall,
  Search,
  Trash2,
  Trash2Icon,
  X,
} from "lucide-react";
import { STUDENTS } from "./pageComp/StudentComponents";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// interface Props {
//   school_id: string;
// }
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
import { AddExamsToStudent, DeleteSchool } from "@/app/_services/methods";
interface AlertProps {
  school_id: string;
}

export const DeleteAlert = ({ school_id }: AlertProps) => {
  const { toast } = useToast();
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger className="absolute top-4  right-4" asChild>
        <Button variant="destructive" size={"icon"}>
          <Trash2Icon className="h-4 w-4 " />
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
              DeleteSchool(school_id);
              router.push("/admin/schools");
              toast({
                title: "Record deleted ",
                description: "The record has been permanently deleted.",
                action: (
                  <ToastAction altText="Done">
                    <Button variant={"destructive"}>Done</Button>
                  </ToastAction>
                ),
              });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const SchoolDetailsComps = ({ school_id }: AlertProps) => {
  const [SelectedSchool, setSelectedSchool] = useState<SCHOOLS[]>();
  const [UpdatedStudents, setUpdatedStudents] = useState<boolean>(false);
  const { UpdateContent, setUpdateContent } = useContext(UpdateContentContext);

  const [StudentsList, setStudentsList] = useState<STUDENTS[]>();

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

  const GetSchool = async (id: string) => {
    try {
      const result = await db.select().from(Schools).where(eq(Schools.id, id));
      setSelectedSchool(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    GetSchool(school_id);
    GetStudents(school_id);
  }, [school_id]);
  useEffect(() => {
    GetSchool(school_id);
    GetStudents(school_id);
  }, [UpdatedStudents]);
  useEffect(() => {
    GetSchool(school_id);
    GetStudents(school_id);
  }, [UpdateContent]);

  return (
    <div className="flex flex-col gap-4 sm:gap-8 w-full">
      <div>
        <div className="mx-auto rounded-3xl ring-1 ring-border  lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 slg:flex-auto w-full">
            <div className="flex justify-between">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground/80 ">
                  {SelectedSchool && SelectedSchool[0].name}
                </h3>
                <p className="mt-6 text-base leading-7  text-foreground/60">
                  {SelectedSchool && SelectedSchool[0].desc}
                </p>
              </div>
              <div>
                <Image
                  src={
                    (SelectedSchool && SelectedSchool[0].picture) ||
                    "/school.svg"
                  }
                  alt="image"
                  height={50}
                  width={50}
                  className="rounded-full max-sm:w-25 max-sm:h-25"
                />
              </div>
            </div>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold font leading-6 text-primary">
                School Details
              </h4>
              <div className="h-px flex-auto bg-border" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              <li className="flex gap-x-3">
                <PhoneCall
                  aria-hidden="true"
                  className="h-6 w-5 flex-none text-primary"
                />
                <span className="flex-auto w-full line-clamp-1 text-foreground/80">
                  <span> {SelectedSchool && SelectedSchool[0].contact}</span>
                </span>
              </li>
              <li className="flex gap-x-3">
                <Mail
                  aria-hidden="true"
                  className="h-6 w-5 flex-none text-primary"
                />
                <span className="flex-auto  w-full line-clamp-1 text-foreground/80">
                  <span className=" w-full">
                    {SelectedSchool && SelectedSchool[0].email}
                  </span>
                </span>
              </li>
              <li className="flex gap-x-3">
                <Map
                  aria-hidden="true"
                  className="h-6 w-5 flex-none text-primary"
                />
                <span className="flex-auto w-full line-clamp-1 text-foreground/80">
                  {SelectedSchool && SelectedSchool[0].address},{" "}
                  <span className="font-medium">
                    {SelectedSchool && SelectedSchool[0].region} Region
                  </span>
                </span>
              </li>
              <li className="flex gap-x-3">
                <Calendar
                  aria-hidden="true"
                  className="h-6 w-5 flex-none text-primary"
                />
                <span className="flex-auto w-full line-clamp-1 text-foreground/80">
                  {SelectedSchool && SelectedSchool[0].createdAt}
                </span>
              </li>
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0 ">
            <div className="rounded-2xl bg-muted/30 py-10 text-center ring-1 ring-inset relative ring-border lg:flex lg:flex-col lg:justify-center lg:py-16">
              <DeleteAlert school_id={school_id} />
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base hidden sm:flex font-semibold font text-foreground/80">
                  Add a student to this school
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-foreground/80">
                    {StudentsList?.length}
                  </span>
                  <span className="text-sm font-semibold font leading-6 tracking-wide text-foreground/80">
                    STUDENTS
                  </span>
                </p>
                {SelectedSchool && (
                  <AddStudentDialogDemo
                    school_id={school_id}
                    schoolName={SelectedSchool[0].name}
                  />
                )}

                <p className="mt-6 text-xs leading-5 text-foreground/40">
                  A school must be added before you can add students and student
                  data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StudentTableAdmin school_id={school_id} />
    </div>
  );
};

export default SchoolDetailsComps;

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Image from "next/image";

interface Props {
  school_id: string;
  schoolName: string;
}

export function AddStudentDialogDemo({ school_id, schoolName }: Props) {
  const [open, setOpen] = useState(false);
  const [STUDENTS, setSTUDENTS] = useState<STUDENTS[]>();
  const [SCHOOL, setSCHOOL] = useState<any[]>();
  const { UpdateContent, setUpdateContent } = useContext(UpdateContentContext);
  const GetSchoolStudents = async (school_id: string) => {
    try {
      const result = await db
        .select()
        .from(Students)
        .where(eq(Students.school_id, school_id));

      setSTUDENTS(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const PostNewStudent = async (
    name: string,
    school_id: string,
    school: string,
    id: string
  ) => {
    const date = new Date().toISOString().split("T")[0];
    try {
      const result = await db.insert(Students).values({
        name: name,
        school_id: school_id,
        id: id,
        school: school,
        createdAt: date,
      });
      return result;
    } catch (error: any) {
      console.error(error);
    }
  };

  const GetSchool = async (school_id: string) => {
    try {
      const result = await db
        .select()
        .from(Schools)
        .where(eq(Schools.id, school_id));

      setSCHOOL(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    GetSchoolStudents(school_id);
    GetSchool(school_id);
  }, [UpdateContent, school_id]);
  const { toast } = useToast();
  const onSubmit = (values: any) => {
    var uniqid = require("uniqid");
    const student_id = uniqid();
    const studentExists = STUDENTS?.find(
      (student) => student.name === values.student
    );

    try {
      studentExists
        ? ""
        : schoolName &&
          setTimeout(() => {
            PostNewStudent(values.student, school_id, schoolName, student_id);
            AddExamsToStudent(
              values.student,
              student_id,
              school_id,
              schoolName
            );
            setUpdateContent(uniqid());
            setOpen(false);
          }, 2000);
    } catch (error) {
      console.log("Error");
    }

    if (studentExists) {
    } else {
      setTimeout(() => {}, 500);
    }
    studentExists
      ? toast({
          title: "Student already exists.",
          description: values.student + " is already in the system.",
          action: <ToastAction altText="Done">Done</ToastAction>,
        })
      : toast({
          title: "Data submitted successfully.",
          description: values.student + " has been added to the system.",
          action: <ToastAction altText="Done">Done</ToastAction>,
        });
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="mt-10 block w-full rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold font text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] pt-16 w-full  ">
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => setOpen(false)}
          className="right-4 top-2 absolute"
        >
          <X className="w-4 h-4" />
        </Button>
        <DialogHeader>
          <DialogTitle>Add student</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="student" className="text-right">
              Student
            </Label>
            <Input
              id="student"
              placeholder="Ex. Kofi Mensah"
              className="col-span-3"
              {...register("student", { required: true })}
            />
          </div>

          <DialogFooter className="flex gap-2">
            <Button onClick={() => setOpen(false)} variant={"outline"}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const options = {
  selectableRows: false,
  elevation: 0,
  rowsPerPage: 10,
  roesPerPageOptions: [10, 25, 50, 100],
};

import { UpdateContentContext } from "@/app/(context)/UpdateContext";
import { useRouter } from "next/navigation";
import {
  StudentColumns,
  StudentColumnsUser,
} from "@/app/dataTable/definitions";
import { DataTable } from "@/app/dataTable/data-table";

interface tableProps {
  school_id: string;
}

export function StudentTableAdmin({ school_id }: tableProps) {
  useEffect(() => {
    GetStudents(school_id);
    GetSchool(school_id);
  }, [school_id]);
  const { UpdateContent, setUpdateContent } = useContext(UpdateContentContext);
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

  const [SelectedSchool, setSelectedSchool] = useState<SCHOOLS[]>();

  const GetSchool = async (id: string) => {
    try {
      const result = await db.select().from(Schools).where(eq(Schools.id, id));
      setSelectedSchool(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const [searhInput, setSearchInput] = useState("");
  const [colDefs, setColDef] = useState([
    {
      headerName: "Name",
      editable: true,
      field: "name",
      sortable: true,
      filter: true,
    },
    // {
    //   headerName: "School",
    //   field: "school",
    //   sortable: true,
    //   filter: true,
    // },

    {
      headerName: "Date",
      field: "createdAt",
      sortable: true,
      filter: true,
    },
  ]);
  const [rowData, setRowData] = useState<any>([]);
  useEffect(() => {
    setRowData(StudentsList);
  }, [StudentsList]);

  useEffect(() => {
    GetStudents(school_id);
    GetSchool(school_id);
  }, [UpdateContent]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className=" text-2xl lg:text-4xl">Students</CardTitle>
        <CardDescription>
          Manage students and view their performance.
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-col w-full">
          <DataTable columns={StudentColumns} data={StudentsList} />
        </div>
      </CardContent>
    </Card>
  );
}

export function StudentTableUser({ school_id }: tableProps) {
  useEffect(() => {
    GetStudents(school_id);
  }, [school_id]);
  const { UpdateContent, setUpdateContent } = useContext(UpdateContentContext);
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

  useEffect(() => {
    GetStudents(school_id);
  }, [UpdateContent]);

  return (
    <Card className="h-full w-full border-none">
      <CardHeader>
        <CardTitle className=" text-2xl lg:text-4xl">Your students</CardTitle>
        <CardDescription>
          Manage your students and view their performance.
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-col w-full">
          <DataTable columns={StudentColumnsUser} data={StudentsList} />
        </div>
      </CardContent>
    </Card>
  );
}
