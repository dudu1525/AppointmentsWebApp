import axios from "axios"
import { DoctorAndClinic, DoctorSimple, UserProfileToken } from "../types/normalTypes";
import { apiRequest } from "./GeneralServiceCall";
import { updateDoctorDto } from "../types/updateTypes";



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


export const createDoctor = (clinicId: number,  doctorUserName: string,  doctorName: string, doctorEmail: string, password: string, type: string) =>{

  return apiRequest(
    axios.post(api+`/doctors/${clinicId}`, {doctorUserName: doctorUserName,doctorName: doctorName,doctorEmail: doctorEmail, password: password,type: type}));


};


export const getAllDoctors = () =>{

return apiRequest(axios.get(api+"/doctors"));

}

export const updateDoctorById = (doctorId: number, doctorDto: updateDoctorDto) =>
{
 return apiRequest(
    axios.put(`${api}/doctors/${doctorId}`, doctorDto));


}


export const deleteDoctorById = (doctorId: number) =>{

return apiRequest(axios.delete(`${api}/doctors/${doctorId}`));

}
