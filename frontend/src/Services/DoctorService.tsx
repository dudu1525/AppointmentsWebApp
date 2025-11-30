import axios from "axios"
import { DoctorAndClinic, UserProfileToken } from "../types/appointment";



const api = "http://localhost:5159/api";

export const getDoctorAndClinic = async (doctorId:number) =>{

        try {
               const response = await axios.get<DoctorAndClinic>(`${api}/doctors/clinics/${doctorId}`);

            console.log("Doctor and clinic:", response.data);
                     return response.data; 
        }catch (error)
        {
             console.log("Something went wrong while fetching doctor and clinic simmultaniosuly!");
        }



}
