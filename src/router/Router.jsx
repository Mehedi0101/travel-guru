import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import DestinationDetails from "../pages/DestinationDetails";

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
            }
        ]
    }
])

export default router;