import React from "react";
import {Settings, Grid2x2, DownloadIcon, Calendar} from "lucide-react";
import { GiTeacher} from "react-icons/gi";
import {GoPerson} from "react-icons/go";

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
        title: "التقويم",
        path: "/calendar",
        icon: <Calendar />,
        subcategories: [],
        key: "calendar"
    },
    {
        title: "الاعدادات",
        path: "/settings",
        icon: <Settings />,
        subcategories: [],
        key: "settings"
    },
    {
        title: "الملف الشخصى",
        path: "/profile",
        icon: <GoPerson/>,
        subcategories: [],
        key: "exams"
    },
];
