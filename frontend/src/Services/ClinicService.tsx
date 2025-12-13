import axios from "axios"
import { ClinicDetailed, ClinicSimple } from "../types/normalTypes";
import { apiRequest } from "./GeneralServiceCall";
import { updateClinicDto } from "../types/updateTypes";
const api = "http://localhost:5159/api";


export const getClinicsDetailed = () => {
  return axios.get<ClinicDetailed[]>(`${api}/clinics`);
};



export const getClinicById = (id: number) =>{

return axios.get<ClinicSimple>(`${api}/clinics/${id}`);

}


export const createClinic = (name: string,  location: string) =>{

  return apiRequest(
    axios.post(api+`/clinics`, {name: name,location: location}));


};


export const getAllClinics = () =>{

return apiRequest(axios.get(api+"/clinics/simple"));

}



export const updateClinicById = (clinicId: number, clinicDto: updateClinicDto) =>
{
 return apiRequest(
    axios.put(`${api}/clinics/${clinicId}`, clinicDto));


}


export const deleteClinicById = (clinicId: number) =>{

return apiRequest(axios.delete(`${api}/clinics/${clinicId}`));

}