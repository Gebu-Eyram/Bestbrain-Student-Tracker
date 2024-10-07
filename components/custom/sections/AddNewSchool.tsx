"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckboxIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { ChevronDownIcon, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { PostNewSchool } from "@/app/(page routes)/admin/schools/add/page";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { db } from "@/utils/db";
import { Schools, Users } from "@/utils/schema";
import { SCHOOLS } from "./SchoolComps";

interface USERINT {
  id: string;
  email: string;
  picture: string;
}
const AddNewSchool = () => {
  const [USERS, setUSERS] = useState<USERINT[]>();
  const [SCHOOLS, setSCHOOLS] = useState<SCHOOLS[]>();
  const [USERID, setUSERID] = useState<String>();

  useEffect(() => {
    GetResultsUsers();
    GetResultsSchools();
  }, []);

  const CheckSchoolId = (schoolid: String) => {
    const schoolsMatch = SCHOOLS?.find((school) => school.id === schoolid);
    const foundOne = schoolsMatch || undefined;
    if (foundOne) {
      console.log("School found");
      return false;
    } else {
      console.log("No school found");
      return true;
    }
  };

  const GetResultsUsers = async () => {
    try {
      const result: any = await db.select().from(Users);

      setUSERS(result); // Update the schools state
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const GetResultsSchools = async () => {
    try {
      const result: any = await db.select().from(Schools);

      setSCHOOLS(result); // Update the schools state
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    console.log("Updated schools state:", USERS); // Log the updated USERS state
  }, [USERS]); // Dependency on schools state

  const { user } = useKindeBrowserClient();
  const { toast } = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (values: any) => {
    try {
      const foundUser = USERS?.find((user) => user.email === values.email);
      setUSERID(foundUser?.id);
      foundUser &&
        CheckSchoolId(foundUser?.id) &&
        PostNewSchool(
          values.school,
          values.email,
          values.address,
          foundUser.id,
          values.contact,
          values.region,
          values.desc,
          foundUser.picture
        );
      foundUser && CheckSchoolId(foundUser?.id)
        ? toast({
            title: "Data submitted successfully.",
            description: values.school + " has been added to the system.",
            action: <ToastAction altText="Done">Done</ToastAction>,
          })
        : toast({
            title: "School email already exists",
            description: "Resubmit with another email.",
            action: <ToastAction altText="Done">Cancel</ToastAction>,
          });
    } catch (error) {
      console.log("Error");
    }
  };
  return (
    <form
      className="w-full flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card x-chunk="dashboard-04-chunk-1 ">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="text-lg">School information</CardTitle>
            <CardDescription>
              Add a new school to the system to manage it. This can only be
              performed by an admin.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="school-name">School Name</Label>
            <Input
              id="school-name"
              placeholder="Ex. Bestbrain Mont."
              {...register("school", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="desc">Description</Label>
            <Input
              id="desc"
              placeholder="A school that provides quality education."
              {...register("desc", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="contact">Contact</Label>
            <Input
              id="contact"
              type="number"
              placeholder="Ex. 0242222222"
              {...register("contact", { required: true })}
            />
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Ex. abc@gmail.com"
                {...register("email", { required: true })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-04-chunk-2">
        <CardHeader>
          <CardTitle>Location Details</CardTitle>
          <CardDescription>
            The location of the school that will be displayed to users.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="adress">Address</Label>
            <Input
              id="address"
              placeholder="Ex. Tema Comm. 26"
              {...register("address", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="school-name">Region</Label>
            <div className="relative">
              <select
                className="p-3 'mt-3 block w-full appearance-none shadow-sm bg-white/5 border py-1.5 px-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25' ring-ring !ring-0 data-[focus]:!ring-0  rounded-sm"
                {...register("region", { required: true })}
              >
                <option value="Ahafo">Ahafo</option>
                <option value="Ashanti">Ashanti</option>
                <option value="Bono East">Bono East</option>
                <option value="Brong Ahafo">Brong Ahafo</option>
                <option value="Central">Central</option>
                <option value="Eastern">Eastern</option>
                <option value="Greater Accra">Greater Accra</option>
                <option value="North East">North East</option>
                <option value="Northern">Northern</option>
                <option value="Oti">Oti</option>
                <option value="Savannah">Savannah</option>
                <option value="Upper East">Upper East</option>
                <option value="Upper West">Upper West</option>
                <option value="Western">Western</option>
                <option value="Western North">Western North</option>
                <option value="Volta">Volta</option>
              </select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button className="ml-auto">Save</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export const AddNewSchoolHeader = () => {
  return (
    <div className="flex items-center gap-4 self-start">
      <Link href={"/admin/schools"}>
        <Button variant="outline" size="icon" className="h-7 w-7">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
      </Link>
      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Add School
      </h1>
      <Badge variant="outline" className="ml-auto sm:ml-0">
        new
      </Badge>
    </div>
  );
};

export default AddNewSchool;
