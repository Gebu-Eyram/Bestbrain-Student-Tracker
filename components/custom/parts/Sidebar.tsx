"use client";
import React, { use, useEffect, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Link from "next/link";

import {
  LifeBuoy,
  LogOut,
  LucideUserCheck,
  PackageX,
  School,
  Settings2Icon,
  Triangle,
} from "lucide-react";
import { usePathname } from "next/navigation";

import Image from "next/image";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { navLinks } from "@/app/constants";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { Users } from "@/utils/schema";
import { eq } from "drizzle-orm";

const Sidebar = () => {
  const router = useRouter();

  const { user } = useKindeBrowserClient();
  const pathname = usePathname();
  const [userList, setUserList] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authUser, setAuthUser] = useState<any>(null);

  useEffect(() => {
    user && setAuthUser(user);
  }, [user]);
  const GetResultsUsers = async () => {
    try {
      const result: any = await db.select().from(Users);
      console.log(result);
      setUserList(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    userList &&
      setTimeout(() => {
        const currentUser = userList.find(
          (userListUser) => userListUser.id === authUser?.id
        );
        console.log(currentUser);
        console.log("changed");
        setCurrentUser(currentUser);
      }, 1000);
  }, [userList]);

  useEffect(() => {
    GetResultsUsers();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        pathname === "/admin/schools" &&
        user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL
      ) {
        router.push("/dashboard");
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [pathname, user]);

  return (
    <aside className="inset-y hidden fixed  left-0 z-20 sm:flex h-full flex-col border-r">
      <div className="border-b h-16  flex justify-center items-center">
        <Button variant="outline" size="icon" aria-label="Home">
          <Image
            width={20}
            height={20}
            src="/bb-logo.svg"
            alt="logo"
            className=" h-5 w-5 object-contain"
          />
        </Button>
      </div>
      <nav className="grid gap-1 p-2 my-auto">
        {navLinks.map((link, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={link.href}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`mt-auto rounded-lg ${
                      pathname === link.href && "bg-accent"
                    }`}
                  >
                    <link.icon className="size-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className=" capitalize"
                sideOffset={5}
              >
                {link.label}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>
      <nav className="mt-auto grid gap-1 p-2 ">
        {currentUser?.role === "admin" && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={"/admin/users"}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-lg
                      `}
                  >
                    <LucideUserCheck className="size-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className=" capitalize"
                sideOffset={5}
              >
                Users
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={"/admin/schools"}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`mt-auto rounded-lg
                     `}
                  >
                    <School className="size-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className=" capitalize"
                sideOffset={5}
              >
                Schools
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={"/dashboard/settings"}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`mt-auto rounded-lg
                      
                    `}
                >
                  <Settings2Icon className="size-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className=" capitalize" sideOffset={5}>
              Settings
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default Sidebar;
