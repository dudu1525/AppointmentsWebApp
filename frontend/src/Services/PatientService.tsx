import axios from "axios"
import { Patient } from "../types/appointment";
const api = "http://localhost:5159/api";



export const getPatientByUserId = (userId: number) => {
  return axios.get<Patient>(`${api}/patients/${userId}`);
};