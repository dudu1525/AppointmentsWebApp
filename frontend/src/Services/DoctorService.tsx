import axios from "axios"
import { DoctorAndClinic, DoctorSimple, UserProfileToken } from "../types/normalTypes";



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


export const getDoctorByUserId = (userId: number) => {
  return axios.get<DoctorSimple>(`${api}/doctors/usr/${userId}`);
  
};
