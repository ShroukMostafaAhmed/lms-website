import './App.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import AppLayout from "./AppLayout.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import SkillDetails from "./pages/SkillDetails/SkillDetails.jsx";
import Downloads from "./pages/Downloads/Downloads.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import StageDetails from "./pages/StageDetails/StageDetails.jsx";
import LevelDetails from "./pages/LevelDetails/LevelDetails.jsx";
import Lessons from "./pages/Lessons/Lessons.jsx";
import LessonDetails from "./pages/Lessons/LessonDetails.jsx";
import VideoDetails from "./pages/Lessons/VideoDetails.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Calendar from "./pages/Calendar/Calendar.jsx";

function App() {

    // Preparing Routing Version 6
    const routes = createBrowserRouter([
        {
            path: "/",
            element: <AppLayout/>,
            children: [
                { index: true, element: <Home/> },
                { path: '/login', element: <Login /> },
                { path: '/register', element: <Register /> },
                { path: '/skill_details', element: <SkillDetails /> },
                { path: '/downloads', element: <Downloads /> },
                { path: '/stage_details', element: <StageDetails /> },
                { path: '/level_details', element: <LevelDetails /> },
                { path: '/lessons', element: <Lessons /> },
                { path: '/lesson_details', element: <LessonDetails /> },
                { path: '/video_details', element: <VideoDetails /> },
                { path: '/settings', element: <Settings /> },
                { path: '/profile', element: <Profile /> },
                { path: '/calendar', element: <Calendar /> },
                { path: "*", element: <NotFound /> },
            ],
        },
    ])

    return (
        <>
            <RouterProvider router={routes}>
                <AppLayout/>
            </RouterProvider>
        </>
    )
}

export default App
