import {
  BookOpenCheck,
  CheckCircle,
  GraduationCap,
  HomeIcon,
  LineChart,
  Settings2,
} from "lucide-react";
import { MdAdminPanelSettings, MdAnalytics, MdDashboard } from "react-icons/md";
import { PiExamFill, PiStudent } from "react-icons/pi";
import { RiAdminFill } from "react-icons/ri";

export const navLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: MdDashboard,
  },
  {
    href: "/dashboard/students",
    label: "Students",
    icon: PiStudent,
  },
  {
    href: "/dashboard/examinations",
    label: "Examinations",
    icon: PiExamFill,
  },
  {
    href: "/dashboard/analytics",
    label: "Analytics",
    icon: MdAnalytics,
  },
];

export const adminLinks = [
  {
    href: "/admin/schools",
    label: "Schools",
    icon: RiAdminFill,
  },
  {
    href: "/admin/schools/add",
    label: "Add School",
    icon: RiAdminFill,
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: MdAdminPanelSettings,
  },
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
