import axios from "axios"
import { Appointment, AssistantSimple, UserProfileToken } from "../types/normalTypes";
import { apiRequest } from "./GeneralServiceCall";
import { updateAssistantDto } from "../types/updateTypes";



const api = "http://localhost:5159/api";


export const getAssistantByUserId = (userId: number) => {
  return axios.get<AssistantSimple>(`${api}/assistants/usr/${userId}`);
};



export const createAssistant = (clinicId: number,  assistantUserName : string,  assistantName: string,password: string, assistantEmail: string) =>{

  return apiRequest(
    axios.post(api+`/assistants/${clinicId}`, {assistantUserName: assistantUserName,assistantName: assistantName,password: password, assistantEmail: assistantEmail}));


};


export const getAllAssistant = () =>{

return apiRequest(axios.get(api+"/assistants"));

}

export const updateAssistantById = (assistantId: number, assistantDto: updateAssistantDto) =>
{
 return apiRequest(
    axios.put(`${api}/assistants/${assistantId}`, assistantDto));


}


export const deleteAssistantById = (assistantId: number) =>{

return apiRequest(axios.delete(`${api}/assistants/${assistantId}`));

}