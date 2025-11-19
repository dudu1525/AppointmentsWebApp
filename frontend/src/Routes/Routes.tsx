import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import HomePage from "../Pages/HomePage/HomePage";
import PatientDashboard from "../Pages/PatientDashboard/PatientDashboard";


export const router = createBrowserRouter([
{
    path:"/",
    element: <App/>,
    children: [
        {path: "", element: <HomePage/>},
        {path: "login", element: <LoginPage/>},
        {path: "register", element: <RegisterPage/>},
        {   path: "patient/:idPatient", element: <PatientDashboard/>,
            children: [{path: "appointmentInfo", element: <></>},
                        {index: true, element: <PatientDashboard/>},

                            //insert another path
            ]
        },


    ]
}


]);