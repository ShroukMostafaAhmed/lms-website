import React from "react";
import {Command, Folder, Package, Settings, Grid2x2, DownloadIcon} from "lucide-react";
import {PiExamThin, PiStudentFill} from "react-icons/pi";
import {GiTeacher} from "react-icons/gi";

export const sidebarConfig = [
    {
        title: "الرئيسية",
        icon: <Grid2x2 />,
        path: "/",
        subcategories: [],
        key: "home"
    },
    {
        title: "التنزيلات",
        path: "/downloads",
        icon: <DownloadIcon />,
        subcategories: [],
        key: "students"
    },
    {
        title: "المدرسين",
        path: "/teachers",
        icon: <GiTeacher />,
        subcategories: [],
        key: "teachers"
    },
    {
        title: "الاختبارات",
        path: "/exams",
        icon: <PiExamThin/>,
        subcategories: [],
        key: "exams" // <-- Fixed duplicate key issue
    },
    {
        title: "المهارات",
        path: "/skills",
        icon: <Command />,
        subcategories: [],
        key: "skills"
    },
    {
        title: "الباقات",
        path: "/packages",
        icon: <Package />,
        subcategories: [],
        key: "packages" // <-- Changed from "extensions" to "packages" for better clarity
    },
    {
        title: "الإعدادات",
        path: "/settings",
        icon: <Settings />,
        subcategories: [],
        key: "settings"
    }
];
