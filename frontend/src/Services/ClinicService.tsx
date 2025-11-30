import axios from "axios"
import { ClinicDetailed, ClinicSimple } from "../types/appointment";
const api = "http://localhost:5159/api";


export const getClinicsDetailed = () => {
  return axios.get<ClinicDetailed[]>(`${api}/clinics`);
};



export const getClinicById = (id: number) =>{

return axios.get<ClinicSimple[]>(`${api}/clinics/${id}`);

}