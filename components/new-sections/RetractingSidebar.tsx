"use client";
import React, {
  Dispatch,
  SetStateAction,
  use,
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";
import {
  BarChart2,
  BookOpenCheckIcon,
  ChevronDown,
  ChevronsRight,
  DollarSignIcon,
  GraduationCap,
  Home,
  LineChart,
  LucideSchool,
  Monitor,
  ShoppingCartIcon,
  Tag,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { db } from "@/utils/db";
import { Users } from "@/utils/schema";
import { useToast } from "@/hooks/use-toast";
import { eq } from "drizzle-orm";
import { SiAdminer } from "react-icons/si";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { HiMiniHome } from "react-icons/hi2";
import { PiStudentFill, PiExamFill } from "react-icons/pi";
import { IoMdAnalytics } from "react-icons/io";

export const RetractibleSidebar = () => {
  const [open, setOpen] = useState(true);

  const router = useRouter();

  const { user } = useKindeBrowserClient();
  const { toast } = useToast();
  const pathname = usePathname();
  const [selected, setSelected] = useState("Dashboard");
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
    <motion.nav
      layout
      className="max-sm:hidden sticky top-0 h-screen shrink-0 border-r z-50   bg-background p-2"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        <Option
          Icon={HiMiniHome}
          title="Dashboard"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/dashboard"
        />
        <Option
          Icon={PiStudentFill}
          title="Students"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/dashboard/students"
        />
        <Option
          Icon={IoMdAnalytics}
          title="Analytics"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/dashboard/analytics"
        />
        <Option
          Icon={PiExamFill}
          title="Examinations"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/dashboard/examinations"
        />
        {userList.length > 0 && userList[0].role === "admin" && (
          <>
            <Option
              Icon={MdAdminPanelSettings}
              title="Schools"
              selected={selected}
              setSelected={setSelected}
              open={open}
              href="/admin/schools"
            />
            <Option
              Icon={RiAdminFill}
              title="Users"
              selected={selected}
              setSelected={setSelected}
              open={open}
              href="/admin/users"
            />
          </>
        )}
        {/* <Option
          Icon={Tag}
          title="Tags"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={BarChart2}
          title="Analytics"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={Users}
          title="Members"
          selected={selected}
          setSelected={setSelected}
          open={open}
        /> */}
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  notifs,
  href,
}: {
  Icon: any;
  title: string;
  href: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  open: boolean;
  notifs?: number;
}) => {
  const pathName = usePathname();
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        pathName === href
          ? "bg-indigo-100 text-indigo-800 shadow-sm"
          : " hover:bg-muted"
      }`}
    >
      <Link
        href={href}
        className="flex h-10 w-full items-center rounded-md transition-colors"
      >
        <motion.div
          layout
          className="grid h-full w-10 place-content-center text-lg"
        >
          <Icon />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            {title}
          </motion.span>
        )}

        {notifs && open && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            style={{ y: "-50%" }}
            transition={{ delay: 0.5 }}
            className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
          >
            {notifs}
          </motion.span>
        )}
      </Link>
    </motion.button>
  );
};

const TitleSection = ({ open }: { open: boolean }) => {
  return (
    <div className="mb-3 border-b  pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors ">
        <div className="flex items-center gap-2">
          <Link href={"/"}>
            <Image src={"/bb-logo.svg"} height={40} width={40} alt="logo" />
          </Link>
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold">
                Bestbrain Tracker
              </span>
              <span className="block text-xs text-slate-500">
                Beyond excellence!
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const ToggleClose = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t  transition-colors "
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <ChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

const ExampleContent = () => <div className="h-[200vh] w-full"></div>;
