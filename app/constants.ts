import {
  BookOpenCheck,
  CheckCircle,
  GraduationCap,
  HomeIcon,
  LineChart,
  Settings2,
} from "lucide-react";
import { MdDashboard } from "react-icons/md";
import { PiExamFill } from "react-icons/pi";

export const navLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: MdDashboard,
  },
  {
    href: "/dashboard/students",
    label: "Students",
    icon: GraduationCap,
  },
  {
    href: "/dashboard/examinations",
    label: "Examinations",
    icon: PiExamFill,
  },
  // {
  //   href: "/dashboard/analytics",
  //   label: "Analytics",
  //   icon: LineChart,
  // },
];

export const allRoutes = [
  "/dashboard",
  "/dashboard/students",
  "/dashboard/examinations",
  "/dashboard/analytics",
  "/settings",
  "admin/schools",
  "admin/schools/add",
];
