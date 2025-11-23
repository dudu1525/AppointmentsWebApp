import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import HomePage from "../Pages/HomePage/HomePage";
import PatientDashboard from "../Pages/PatientDashboard/PatientDashboard";
import Unauthorized from "../Pages/UnauthorizedPage";
import ProtectedRoute from "./ProtectedRoute";
import DoctorDashboard from "../Pages/DoctorDashboard/DoctorDashboard";
import AssistantPage from "../Pages/AssistantPage";
import AdminDashboard from "../Pages/AdminDashboard";


export const router = createBrowserRouter([
{
    path:"/",
    element: <App/>,
    children: [
                
        {path:"unauthorized", element:<Unauthorized/>},
        {path: "", element: <HomePage/>},
        {path: "login", element: <LoginPage/>},
        {path: "register", element: <RegisterPage/>},
       
        {   path: "patient/:idPatient", element:<ProtectedRoute allowedRoles={['Patient', 'Admin']}> <PatientDashboard/> </ProtectedRoute>,
            children: [{path: "appointmentInfo", element: <></>},
                        {index: true, element: <PatientDashboard/>},

                            //insert another path
            ]
        },
        {   path: "doctor/:idDoctor", element:<ProtectedRoute allowedRoles={['Doctor', 'Admin']}> <DoctorDashboard/> </ProtectedRoute>},
        {   path: "assistant/:idDoctor", element:<ProtectedRoute allowedRoles={['Assistant', 'Admin']}> <AssistantPage/> </ProtectedRoute>},
        {   path: "admin/:idAdmin", element:<ProtectedRoute allowedRoles={['Admin']}> <AdminDashboard/> </ProtectedRoute>}

    ]
}


]);