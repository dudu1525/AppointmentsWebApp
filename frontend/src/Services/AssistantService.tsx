import axios from "axios"
import { Appointment, AssistantSimple, UserProfileToken } from "../types/normalTypes";



const api = "http://localhost:5159/api";


export const getAssistantByUserId = (userId: number) => {
  return axios.get<AssistantSimple>(`${api}/assistants/usr/${userId}`);
};



//one function to deny and one to accpet a certian appointment