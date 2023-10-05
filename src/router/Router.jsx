import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import DestinationDetails from "../pages/DestinationDetails";
import Authentication from "../pages/Authentication";
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";
import ForgotPassword from "../components/Authentication/ForgotPassword";
import Hotels from "../pages/Hotels";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                loader: () => fetch('/travel.json'),
                element: <Home></Home>
                
            },
            {
                path: '/destination-details/:id',
                loader: () => fetch('/travel.json'),
                element: <DestinationDetails></DestinationDetails>
            },
            {
                path: '/authentication',
                element: <Authentication></Authentication>,
                children: [
                    {
                        path: '/authentication/login',
                        element: <Login></Login>
                    },
                    {
                        path: '/authentication/register',
                        element: <Register></Register>
                    },
                    {
                        path: '/authentication/forgot-password',
                        element: <ForgotPassword></ForgotPassword>
                    }
                ]
            },
            {
                path: '/hotels/:id',
                loader: () => fetch('/travel.json'),
                element: <PrivateRoute><Hotels></Hotels></PrivateRoute>
            }
        ]
    }
])

export default router;