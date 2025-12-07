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

export const registerAPI = async (
  email: string,
  username: string,
  password: string,
  name: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "/auth/register-patient", {
      email: email,
      username: username,
      password: password,
      name: name,
    });
    return data;
  } catch (error) {
    console.log("Error creating account!");
  }
};


export const createAdmin = async (email: string,
  username: string,
  password: string,
  name: string) => {

    try {
      const data = await axios.post(api+ "/auth/create-admin", {email: email,
      username: username,
      password: password,
      name: name, })

    } catch (error)
    {
      console.log ("Error while creatign admin");
    }


}