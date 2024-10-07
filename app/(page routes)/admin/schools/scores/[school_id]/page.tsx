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
  Search,
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

export const description =
  "A settings page. The settings page has a sidebar navigation and a main content area. The main content area has a form to update the store name and a form to update the plugins directory. The sidebar navigation has links to general, security, integrations, support, organizations, and advanced settings.";
interface Props {
  params: {
    school_id: string;
  };
}

const page = ({ params }: Props) => {
  return (
    <div>
      <Dashboard school_id={params.school_id} />
    </div>
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
import { MathsTable, ScienceTable } from "@/components/InputTables/Subjects";

interface SchoolProps {
  school_id: string;
}

const Dashboard = ({ school_id }: SchoolProps) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4  p-4 md:gap-8 md:p-10">
        <h1 className="text-2xl sm:text-3xl font-semibold">Subjects</h1>

        <Tabs
          defaultValue="mathematics"
          className="mx-auto grid w-full  items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
        >
          <div>
            <TabsList className="sm:flex flex-col gap-4 items-start justify-start text-sm text-muted-foreground bg-transparent">
              <TabsTrigger
                className="!shadow-none !justify-start p-0 data-[state=active]:text-primary data-[state=active]:bg-background data-[state=active]:shadow"
                value="mathematics"
              >
                Mathematics
              </TabsTrigger>
              <TabsTrigger
                className="!shadow-none !justify-start p-0 data-[state=active]:text-primary data-[state=active]:bg-background data-[state=active]:shadow"
                value="english"
              >
                English
              </TabsTrigger>
              <TabsTrigger
                className="!shadow-none !justify-start p-0 data-[state=active]:text-primary data-[state=active]:bg-background data-[state=active]:shadow"
                value="science"
              >
                Science
              </TabsTrigger>
              <TabsTrigger
                className="!shadow-none !justify-start p-0 data-[state=active]:text-primary data-[state=active]:bg-background data-[state=active]:shadow"
                value="social"
              >
                Social Studies
              </TabsTrigger>
            </TabsList>
          </div>
          <div className=" gap-6">
            <TabsContent value="mathematics">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Mathematics</CardTitle>
                </CardHeader>

                <CardContent>
                  <ScrollArea className="h-[80vh] w-full">
                    <MathsTable school_id={school_id} />
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
                    <ScienceTable school_id={school_id} />
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
