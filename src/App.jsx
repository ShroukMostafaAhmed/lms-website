import './App.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import AppLayout from "./AppLayout.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";

function App() {

    // Preparing Routing Version 6
    const routes = createBrowserRouter([
        {
            path: "/",
            element: <AppLayout/>,
            children: [
                { index: true, element: <Home/>},
                {path: '/login', element: <Login />},
                {path: '/register', element: <Register />},
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
