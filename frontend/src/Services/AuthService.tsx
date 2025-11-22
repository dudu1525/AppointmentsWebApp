import axios from "axios"
import { UserProfileToken } from "../types/appointment";



const api = "http://localhost:5159/api";

export const loginAPI = async(username: string, password: string) =>{

        try{
                const data = await axios.post<UserProfileToken>(api+"/auth/login", {
                    username: username,
                    password: password,

                });
                return data;

        }catch (error)
        {
            console.log("INVALID LOGIN, ERROR!!");

        }



}