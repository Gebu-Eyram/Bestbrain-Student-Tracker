"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AnimatedHamburgerButton from "../Hamburger";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { adminLinks, navLinks } from "@/app/constants";
import { Link2Icon } from "lucide-react";
import Link from "next/link";
import { FiHome } from "react-icons/fi";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { Users } from "@/utils/schema";
import { db } from "@/utils/db";

const SidebarSheet = () => {
  const { user } = useKindeBrowserClient();

  const pathname = usePathname();
  const [userList, setUserList] = useState<any[]>([]);
  const [authUser, setAuthUser] = useState<any>(null);

  useEffect(() => {
    user && setAuthUser(user);
  }, [user]);

  const GetCurrentUser = async () => {
    try {
      const result: any = await db
        .select()
        .from(Users)
        .where(eq(Users.id, authUser?.id));
      setUserList(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    authUser && GetCurrentUser();
  }, [authUser]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="p-2 lg:hidden">
          <HamburgerMenuIcon className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Bestbrain Student Tracker</SheetTitle>
          <SheetDescription>Beyond excellence.</SheetDescription>
        </SheetHeader>
        <div className="flex my-8 flex-col gap-2 w-full">
          <Link
            href={"/"}
            className=" hover:bg-indigo-100 hover:text-indigo-800 shadow-sm items-center justify-start w-full p-3 rounded-xl border flex gap-2"
          >
            <FiHome className="w-6 h-6" />
            Home
          </Link>

          {navLinks.map((navLink, index) => (
            <Link
              href={navLink.href}
              key={index}
              className=" hover:bg-indigo-100 hover:text-indigo-800 shadow-sm items-center justify-start w-full p-3 rounded-xl border flex gap-2"
            >
              <navLink.icon className="w-6 h-6" />

              {navLink.label}
            </Link>
          ))}
          {userList[0]?.role === "admin" &&
            adminLinks.map((navLink, index) => (
              <Link
                href={navLink.href}
                key={index}
                className=" hover:bg-indigo-100 hover:text-indigo-800 shadow-sm items-center justify-start w-full p-3 rounded-xl border flex gap-2"
              >
                <navLink.icon className="w-6 h-6" />

                {navLink.label}
              </Link>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarSheet;
