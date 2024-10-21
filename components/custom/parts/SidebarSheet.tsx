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
import { navLinks } from "@/app/constants";
import { Link2Icon } from "lucide-react";
import Link from "next/link";
import { FiHome } from "react-icons/fi";

const SidebarSheet = () => {
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarSheet;
