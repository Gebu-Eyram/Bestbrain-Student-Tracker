"use client";
import { DataTableColumnHeader } from "@/app/dataTable/columns";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, School, Trash, Trash2Icon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SCHOOLS } from "@/components/custom/sections/SchoolComps";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  STUDENTS,
  USERS,
} from "@/components/custom/sections/admin/pageComp/StudentComponents";
import { DeleteAlert } from "@/components/custom/sections/admin/SchoolDetailsComps";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
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
import { ToastAction } from "@/components/ui/toast";
import {
  ChangeUserRole,
  CreateNewStudentInstances,
  DeleteExam,
  DeleteStudent,
  DeleteStudentExamDetails,
  DeleteUser,
} from "../_services/methods";
import { useContext, useEffect, useState } from "react";
import { UpdateContentContext } from "../(context)/UpdateContext";
import { EXAMINATIONS, EXAMSCORES } from "../_services/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SchoolColumns: ColumnDef<SCHOOLS>[] = [
  {
    // id: "status",
    id: "Picture",
    cell: ({ row }) => {
      const school = row.original;

      return (
        <div className="">
          <Avatar>
            <Image
              alt={school.name}
              height={40}
              width={40}
              src={school.picture || "/logo.svg"}
            />
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader className="" column={column} title="Name" />
      );
    },
    cell: ({ row }) => {
      const school = row.original;

      return (
        <Link
          className="w-full line-clamp-1 max-sm:text-sm"
          href={`/admin/schools/details/${school.id}`}
        >
          {school.name}
        </Link>
      );
    },
  },
  {
    // id: "status",
    accessorKey: "region",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="max-lg:hidden"
          column={column}
          title="Region"
        />
      );
    },
    cell: ({ row }) => {
      const school = row.original;

      return (
        <Badge className=" max-lg:hidden   capitalize cursor-pointer">
          {school.region}
        </Badge>
      );
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="max-md:hidden"
          column={column}
          title="Email"
        />
      );
    },
    cell: ({ row }) => {
      const school = row.original;

      return (
        <p className=" max-md:hidden max-sm:max-w-[100px] line-clamp-1">
          <span className="line-clamp-1 w-full"> {school.email}</span>
        </p>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const school = row.original;

      const [open, setOpen] = useState(false);
      const { UpdateContent, setUpdateContent } =
        useContext(UpdateContentContext);

      useEffect(() => {
        setOpen(false);
      }, [UpdateContent]);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className=""
              onClick={() => navigator.clipboard.writeText(school.name)}
            >
              Copy name
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(school.email)}
            >
              Copy mail
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <Link
              className="h-full cursor-pointer mb-2"
              href={`/admin/schools/scores/${school.id}`}
            >
              <DropdownMenuItem className="border  rounded-sm cursor-pointer font-medium mb-1 ">
                Scores
              </DropdownMenuItem>
            </Link>
            <Link
              className="h-full cursor-pointer"
              href={`/admin/schools/details/${school.id}`}
            >
              <DropdownMenuItem className="bg-primary rounded-sm cursor-pointer font-medium text-white/90 ">
                Details
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const StudentColumns: ColumnDef<STUDENTS>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader className="" column={column} title="Name" />
      );
    },
  },
  {
    // id: "status",
    accessorKey: "school",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="max-md:hidden"
          column={column}
          title="School"
        />
      );
    },
  },
  {
    id: "Status",

    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          title="Status"
          className="max-sm:hidden"
          column={column}
        />
      );
    },
    cell: ({ row }) => {
      const today = new Date();
      const student = row.original;
      const currentMonth = today.getMonth();
      const schoolDate = new Date(student.createdAt);
      const schoolMonth = schoolDate.getMonth();

      return (
        <Badge
          className={`max-sm:hidden  capitalize cursor-pointer ${
            schoolMonth === currentMonth
              ? "bg-green-800 text-white pointer-events-none"
              : "bg-red-600 text-white pointer-events-none"
          }`}
        >
          {schoolMonth === currentMonth ? "New" : "Old"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "Date",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="max-sm:hidden"
          column={column}
          title="Date"
        />
      );
    },
    cell: ({ row }) => {
      const school = row.original;

      return (
        <p className="w-full max-sm:hidden line-clamp-1">{school.createdAt}</p>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;
      const [open, setOpen] = useState(false);

      document.addEventListener("click", (e) => {
        if (e.target) {
          setOpen(false);
        }
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className=""
              onClick={() => {
                navigator.clipboard.writeText(student.name);
                setOpen(false);
              }}
            >
              Copy name
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <Link className="h-full" href={`/details/students/${student.id}`}>
              <DropdownMenuItem
                className=" cursor-pointer rounded-sm font-medium  "
                onClick={() => setOpen(false)}
              >
                Student
              </DropdownMenuItem>
            </Link>
            <Link className="h-full" href={`/results/${student.id}`}>
              <DropdownMenuItem
                className=" cursor-pointer rounded-sm font-medium  "
                onClick={() => setOpen(false)}
              >
                Results
              </DropdownMenuItem>
            </Link>
            <div onClick={() => setOpen(false)}>
              <DeleteStudentButton student_id={student.id} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const StudentColumnsUser: ColumnDef<STUDENTS>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader className="" column={column} title="Name" />
      );
    },
  },
  {
    // id: "status",
    accessorKey: "school",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="max-md:hidden"
          column={column}
          title="School"
        />
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className=""
              onClick={() => navigator.clipboard.writeText(student.name)}
            >
              Copy name
            </DropdownMenuItem>
            <Link className="h-full" href={`/results/${student.id}`}>
              <DropdownMenuItem className=" cursor-pointer rounded-sm font-medium  ">
                Results
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link className="h-full" href={`/details/students/${student.id}`}>
              <DropdownMenuItem className=" cursor-pointer rounded-sm font-medium  ">
                Details
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const MiniStudentColumnsUser: ColumnDef<STUDENTS>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader className="" column={column} title="Name" />
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className=""
              onClick={() => navigator.clipboard.writeText(student.name)}
            >
              Copy name
            </DropdownMenuItem>
            <Link className="h-full" href={`/results/${student.id}`}>
              <DropdownMenuItem className=" cursor-pointer rounded-sm font-medium  ">
                Results
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link className="h-full" href={`/details/students/${student.id}`}>
              <DropdownMenuItem className=" cursor-pointer rounded-sm font-medium  ">
                Details
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const UserColumns: ColumnDef<USERS>[] = [
  {
    // id: "status",
    id: "Picture",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="">
          <Avatar>
            <Image
              alt={user.name}
              height={40}
              width={40}
              src={user.picture || "/logo.svg"}
            />
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader className="" column={column} title="Email" />
      );
    },
    cell: ({ row }) => {
      const user = row.original;

      return (
        <p className="  max-sm:max-w-[100px] line-clamp-1">
          <span className="line-clamp-1 w-full"> {user.email}</span>
        </p>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="max-md:hidden"
          column={column}
          title="Role"
        />
      );
    },
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Badge className="max-md:hidden  capitalize cursor-pointer">
          {user.role}
        </Badge>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      const [open, setOpen] = useState(false);
      const [roleopen, setRoleOpen] = useState(false);

      const roles = [
        { value: "admin", label: "Admin" },
        { value: "user", label: "User" },
      ];
      const [selectedRole, setSelectedRole] = useState<string>("user");
      const { UpdateContent, setUpdateContent } =
        useContext(UpdateContentContext);

      useEffect(() => {
        setOpen(false);
      }, [UpdateContent]);

      return (
        <DropdownMenu>
          <AlertDialog open={roleopen}>
            <AlertDialogContent>
              <X
                className="absolute  w-6 h-6 border-2 rounded-md  p-1 top-3 right-3"
                onClick={() => setRoleOpen(false)}
              />
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Change the user's role to either an admin or user.
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Admins have full access to the system while users have limited
                  access.
                </AlertDialogDescription>
                <Select onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      {roles.map((role, index) => (
                        <SelectItem key={index} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </AlertDialogHeader>
              <AlertDialogFooter className="border-t py-4">
                <AlertDialogAction
                  className="ml-auto"
                  onClick={() => {
                    ChangeUserRole(user.id, selectedRole);
                    setRoleOpen(false);
                  }}
                >
                  Done
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.email)}
            >
              Copy mail
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />

            <DropdownMenuItem
              onClick={() => setRoleOpen(true)}
              className=" h-full mb-1  rounded-sm cursor-pointer font-medium "
            >
              Change Role
            </DropdownMenuItem>
            <DeleteUserButton user_id={user.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface DeleteStudentProps {
  student_id: string;
}

export const DeleteStudentButton = ({ student_id }: DeleteStudentProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const { UpdateContent, setUpdateContent } = useContext(UpdateContentContext);
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full" asChild>
        <Button className="hover:bg-red-800 gap-2 pl-3 bg-red-700 w-full flex items-center justify-between !important mt-1 cursor-pointer rounded-sm font-medium text-white/90 ">
          Delete
          <Trash className="h-4 w-4 p-0" />
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
              DeleteStudent(student_id);
              DeleteStudentExamDetails(student_id);
              var uniqid = require("uniqid");
              setUpdateContent(uniqid());
              toast({
                title: "Record deleted ",
                description: "The record has been permanently deleted.",
                action: <ToastAction altText="Done">Done</ToastAction>,
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

export const DeleteUserButton = ({ user_id }: { user_id: string }) => {
  const { toast } = useToast();
  const router = useRouter();
  const { UpdateContent, setUpdateContent } = useContext(UpdateContentContext);
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full" asChild>
        <Button
          variant={"destructive"}
          className=" gap-2 pl-3 bg-red-700 w-full flex items-center justify-between !important mt-1 cursor-pointer rounded-sm font-medium text-white/90 "
        >
          Delete
          <Trash className="h-4 w-4 p-0" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove every
            data the user has from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => {
              DeleteUser(user_id);

              var uniqid = require("uniqid");
              setUpdateContent(uniqid());
              toast({
                title: "User deleted ",
                description: "The user has been permanently deleted.",
                action: <ToastAction altText="Done">Done</ToastAction>,
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
