"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { use, useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { navLinks } from "@/app/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
// import { Button } from "../ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { Users } from "@/utils/schema";
import { PostNewUser } from "@/app/(page routes)/admin/schools/add/page";
import { ModeToggle } from "../sections/SchoolComps";
import { SearchCommand } from "@/components/shadcn/SearchCommand";

// import { Input } from "../ui/input";
// import GlobalApi from "@/app/_services/GlobalApi";

const Header = () => {
  const pathname = usePathname();
  useEffect(() => {
    GetResultsUsers();
  }, []);

  const [breadcrumbItems, setBreadcrumbItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const breadcrumbItems = pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const link = navLinks.find((link) => link.href === path);
      return (
        <BreadcrumbItem key={index} className="capitalize">
          {link ? (
            <BreadcrumbLink>
              <Link href={path}>{link.label}</Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage>{segment}</BreadcrumbPage>
          )}
        </BreadcrumbItem>
      );
    });

    setBreadcrumbItems(breadcrumbItems);
  }, [pathname, navLinks]);
  const { user } = useKindeBrowserClient();
  const [userList, setUserList] = useState<any[]>([]);

  const GetResultsUsers = async () => {
    try {
      const result: any = await db.select().from(Users);

      setUserList(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const [userExists, setUserExists] = useState<boolean>(false);
  const [NotuserExistsFinal, setNotUserExistsFinal] = useState<boolean>(false);
  const [notUserExists, setNotUserExists] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        const preExistingUser = userList.find(
          (dbUser) => dbUser.id === user.id
        );
        if (preExistingUser) {
          console.log("User exists");
          setNotUserExists(false);
        } else {
          console.log("User does not exist");
          setNotUserExists(true);
        }
      }
    }, 4000);
  }, [user]);

  useEffect(() => {
    notUserExists &&
      setTimeout(() => {
        if (user) {
          const preExistingUser = userList.find(
            (dbUser) => dbUser.id === user.id
          );
          if (preExistingUser) {
            console.log("User exists");
            setNotUserExistsFinal(false);
          } else {
            console.log("User does not exist");
            setNotUserExistsFinal(true);
          }
        }
      }, 4000);
  }, [notUserExists]);
  useEffect(() => {
    NotuserExistsFinal &&
      setTimeout(() => {
        if (user) {
          PostNewUser(user.email!, user.id!, user.picture!);
          console.log("User posted successfully");
        }
      }, 4000);
  }, [NotuserExistsFinal]);

  return (
    <header className=" flex h-16 items-center gap-4  bg-background px-4 ">
      {navLinks.find((navLink) => navLink.href === pathname) && (
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <BreadcrumbItem key={index} className="capitalize ">
                {item}
                {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <ModeToggle />
      <SearchCommand />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="overflow-hidden rounded-full bg-transparent p-0 "
          >
            <Image
              src={user?.picture || "placeholder-user.svg"}
              priority
              width={36}
              height={36}
              alt="Avatar"
              className={`overflow-hidden  object-scale-down rounded-full ${
                !user?.picture && "p-2"
              }`}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {user && (
            <DropdownMenuItem>
              <div className="flex flex-col w-full">
                <p className="font-semibold text-sm">
                  {user?.given_name} {user?.family_name}
                </p>
                <p className="text-xs">{user?.email}</p>
              </div>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <Link href="/api/auth/logout" className="">
            <DropdownMenuItem className="cursor-pointer">
              Logout
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
