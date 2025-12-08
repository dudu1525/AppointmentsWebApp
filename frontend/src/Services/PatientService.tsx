import axios from "axios"
import { Patient } from "../types/normalTypes";
import { apiRequest } from "./GeneralServiceCall";
import { updatePatientDto } from "../types/updateTypes";
const api = "http://localhost:5159/api";



export const getPatientByUserId = (userId: number) => {
  return axios.get<Patient>(`${api}/patients/${userId}`);
};


export const createPatient = (  email: string, username: string,password: string, name: string) =>{

  return apiRequest(
    axios.post(api+"/auth/register-patient", {email: email,username: username,password: password,name: name}));


};


export const getAllPatients = () =>{

return apiRequest(axios.get(api+"/patients"));

}

export const updatePatientById = (patientId: number, patientDto: updatePatientDto) =>
{
 return apiRequest(
    axios.put(`${api}/patients/${patientId}`, patientDto));


}


export const deletePatientById = (patientId: number) =>{

return apiRequest(axios.delete(`${api}/patients/${patientId}`));

}