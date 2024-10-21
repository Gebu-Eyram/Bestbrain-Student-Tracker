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
import { Badge } from "@/components/ui/badge";
import AnimatedHamburgerButton from "../Hamburger";
import SidebarSheet from "./SidebarSheet";

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
  const [currentUser, setCurrentUser] = useState<any>(null);

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
          setCurrentUser(preExistingUser);

          setNotUserExists(false);
        } else {
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
      <SidebarSheet />
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

      <SearchCommand />
      <ModeToggle />
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
        <DropdownMenuContent className="max-w-[200px]" align="end">
          {user && (
            <DropdownMenuItem>
              <div className="flex flex-col w-full ">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm w-full line-clamp-1 max-w-[60%]">
                    {user?.given_name} {user?.family_name}
                  </p>
                  {
                    <Badge
                      variant={
                        currentUser?.role === "admin" ? "outline" : "secondary"
                      }
                      className={`capitalize text-xs ${
                        currentUser?.role === "admin"
                          ? "bg-green-700 hover:bg-green-800"
                          : "bg-pink-700 hover:bg-pink-800"
                      } `}
                    >
                      {currentUser?.role || "user"}
                    </Badge>
                  }
                </div>
                <p className="text-xs w-full line-clamp-1">{user?.email}</p>
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
