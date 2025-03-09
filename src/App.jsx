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
