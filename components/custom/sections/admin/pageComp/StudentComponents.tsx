"use client";
import { Button } from "@/components/ui/button";
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
interface Props {
  school_id: string;
}

import { MoreHorizontal } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SCHOOLS } from "../../SchoolComps";
import { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { Schools, Students } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

export interface STUDENTS {
  id: string;
  name: string;
  school_id: string;
  createdAt: string;
  school: string;
}
