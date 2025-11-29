import axios from "axios"
import { ClinicDetailed } from "../types/appointment";
const api = "http://localhost:5159/api";


export const getClinicsDetailed = () => {
  return axios.get<ClinicDetailed[]>(`${api}/clinics`);
};