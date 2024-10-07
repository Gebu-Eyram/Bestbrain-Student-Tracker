import {
  BookOpenCheck,
  CheckCircle,
  GraduationCap,
  HomeIcon,
  LineChart,
  Settings2,
} from "lucide-react";

export const navLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: HomeIcon,
  },
  {
    href: "/dashboard/students",
    label: "Students",
    icon: GraduationCap,
  },
  {
    href: "/dashboard/examinations",
    label: "Examinations",
    icon: BookOpenCheck,
  },
  {
    href: "/dashboard/analytics",
    label: "Analytics",
    icon: LineChart,
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
