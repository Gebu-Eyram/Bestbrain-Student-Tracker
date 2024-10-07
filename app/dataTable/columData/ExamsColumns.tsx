"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../columns";
import { EXAMINATIONS, EXAMSCORES } from "@/app/_services/types";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { UpdateContentContext } from "@/app/(context)/UpdateContext";
import { useContext, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2Icon } from "lucide-react";
import {
  CreateNewStudentInstances,
  DeleteExam,
  SetExamsActive,
} from "@/app/_services/methods";
import { ToastAction } from "@/components/ui/toast";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface DeleteExamProps {
  exam_id: number;
}

export const ExamsScoreTable: ColumnDef<EXAMSCORES>[] = [
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
    accessorKey: "school_name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="max-md:hidden"
          column={column}
          title="School"
        />
      );
    },
    cell: ({ row }) => {
      const examscore = row.original;

      return (
        <p className=" line-clamp-1 max-sm:hidden w-full lg:max-w-[200px] xl:max-w-[300px] ">
          {examscore.school_name}
        </p>
      );
    },
  },
  {
    accessorKey: "overall",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="w-full"
          column={column}
          title="Overall"
        />
      );
    },
    cell: ({ row }) => {
      const examscore = row.original;

      return <p className=" w-full flex pl-4 ">{examscore.overall}</p>;
    },
  },
];

export const DeleteExamButton = ({ exam_id }: DeleteExamProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const { UpdateContent, setUpdateContent } = useContext(UpdateContentContext);
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full" asChild>
        <Button className="hover:bg-red-800 gap-2 pl-3 bg-red-700 w-full flex items-center justify-between !important mt-1 cursor-pointer rounded-sm font-medium text-white/90 ">
          Delete
          <Trash2Icon className="h-4 w-4 p-0" />
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
              DeleteExam(exam_id);

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

export const ExamsColumns: ColumnDef<EXAMINATIONS>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader className="" column={column} title="Name" />
      );
    },
    cell: ({ row }) => {
      const exam = row.original;

      return (
        <p className=" line-clamp-1 w-full lg:max-w-[200px] xl:max-w-[300px] ">
          {exam.name}
        </p>
      );
    },
  },

  {
    id: "Status",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          title="Status"
          className="`max-sm:hidden lg:hidden "
          column={column}
        />
      );
    },
    cell: ({ row }) => {
      const today = new Date();
      const exam = row.original;
      const currentMonth = today.getMonth();
      const schoolDate = new Date(exam.createdAt);
      const schoolMonth = schoolDate.getMonth();

      return (
        <Badge
          variant={"outline"}
          className={`max-sm:hidden sm:flex lg:hidden xl:flex w-fit capitalize cursor-pointer ${
            schoolMonth === currentMonth
              ? "text-green-500  pointer-events-none"
              : "hidden text-white pointer-events-none"
          }`}
        >
          {schoolMonth === currentMonth ? "New" : "Old"}
        </Badge>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const exam = row.original;
      const [open, setOpen] = useState(false);
      const router = useRouter();

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
                navigator.clipboard.writeText(exam.name);
                setOpen(false);
              }}
            >
              Copy name
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <Link className="h-full" href={`/admin/exams/${exam.id}`}>
              <DropdownMenuItem
                className=" cursor-pointer rounded-sm font-medium  "
                onClick={() => setOpen(false)}
              >
                View
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className={` cursor-pointer rounded-sm font-medium ${
                exam.status === "active" && "hidden"
              } `}
              onClick={() => {
                CreateNewStudentInstances(exam.id.toString());
                SetExamsActive(exam.id);
                router.push(`/admin/exams/${exam.id}`);
              }}
            >
              Add Students
            </DropdownMenuItem>
            <div onClick={() => setOpen(false)}>
              <DeleteExamButton exam_id={exam.id} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
