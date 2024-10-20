"use client";

import * as React from "react";
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "../ui/button";
import {
  BookOpenCheck,
  GraduationCap,
  Home,
  LayoutDashboardIcon,
  Search,
} from "lucide-react";
import Link from "next/link";

export function SearchCommand() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant={"outline"}
        className="ml-auto flex-1 group items-center duration-1000 ease-out flex gap-2 rounded-xl font-normal text-sm md:grow-0 pr-1 py-2 max-w-fit"
      >
        <span className=" flex gap-2 items-center max-sm:pr-4">
          <Search size={16} />
          Search anything...
        </span>
        <span className="flex max-sm:hidden   whitespace-nowrap rounded-lg  ease-in px-3 py-1  bg-muted  group-hover:bg-background shadow">
          ⌘ J
        </span>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem className="cursor-pointer">
              <Link
                href="/"
                className="flex gap-1 items-center justify-start w-full h-full"
              >
                <Home className="mr-2 h-4 w-4" />
                <span>Home</span>
              </Link>
            </CommandItem>
            <CommandItem className="cursor-pointer">
              <Link
                href="/dashboard"
                className="flex gap-1 items-center justify-start w-full h-full"
              >
                <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </CommandItem>
            <CommandItem className="cursor-pointer">
              <Link
                href="/dashboard/students"
                className="flex gap-1 items-center justify-start w-full h-full"
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                <span>Students</span>
              </Link>
            </CommandItem>
            <CommandItem className="cursor-pointer">
              <Link
                href="/dashboard/examinations"
                className="flex gap-1 items-center justify-start w-full h-full"
              >
                <BookOpenCheck className="mr-2 h-4 w-4" />
                <span>Examinations</span>
              </Link>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
}
