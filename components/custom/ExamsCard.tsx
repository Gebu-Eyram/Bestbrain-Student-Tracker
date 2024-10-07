"use client";

import { UpdateContentContext } from "@/app/(context)/UpdateContext";
import { PostNewExmaination } from "@/app/_services/methods";
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

import { useToast } from "@/hooks/use-toast";
import { use, useContext, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { ToastAction } from "../ui/toast";
import { Examinations } from "@/utils/schema";
import { db } from "@/utils/db";
import { EXAMINATIONS } from "@/app/_services/types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/app/dataTable/data-table";

import { ScrollArea } from "../ui/scroll-area";
import { ExamsColumns } from "@/app/dataTable/columData/ExamsColumns";
import { MinimalDataTable } from "@/app/dataTable/minimal-data-table";

const ExamsCard = () => {
  const [Exams, setExams] = useState<EXAMINATIONS[]>();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const GetExaminations = async () => {
    try {
      const result = await db.select().from(Examinations);
      setExams(result);
    } catch (error) {
      console.log(error);
    }
  };

  const { UpdateContent, setUpdateContent } = useContext(UpdateContentContext);
  const { toast } = useToast();
  const onSubmit = (values: any) => {
    try {
      PostNewExmaination(values.exam_name, values.exam_type);

      var uniqid = require("uniqid");
      setUpdateContent(uniqid());
      toast({
        title: "Data submitted successfully.",
        description: values.exam_name + " has been added to the system.",
        action: <ToastAction altText="Done">Done</ToastAction>,
      });
      console.log("Done");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetExaminations();
  }, []);
  useEffect(() => {
    GetExaminations();
  }, [UpdateContent]);
  return (
    <div className="pb-4 sm:pb-8 max-sm:hidden">
      <Tabs defaultValue="list" className="w-full h-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="h-full">
          <ScrollArea className="h-full w-full overflow-x-auto">
            {Exams && <MinimalDataTable columns={ExamsColumns} data={Exams} />}
            {!Exams && <div>Loading...</div>}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="register">
          <Card className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Create a new exmaination</CardTitle>
                <CardDescription>
                  Deploy your new exam in one-click.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="examination_name">Exam name</Label>
                    <Input
                      id="name"
                      placeholder="Ex. Power Mock"
                      {...register("exam_name", { required: true })}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="examination_name">Exam type</Label>
                    <Input
                      id="name"
                      defaultValue={"Mock"}
                      {...register("exam_type", { required: true })}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button className="ml-auto" type="submit">
                  Create
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamsCard;
