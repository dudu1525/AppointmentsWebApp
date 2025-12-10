import { createContext, useEffect, useState } from "react";
import { User } from "../types/normalTypes";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/AuthService";
import React from "react";
import axios from "axios"

type UserContextType = {
    user: User | null;
    token: string | null;
    registerUser: (email: string, username: string, password:string, name: string) => void;
    loginUser:(username: string, password: string) => void;
    logout:() => void;
    isLoggedIn: () => boolean;

}


type Props = { children: React.ReactNode};


const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider =  ({children}: Props) => {

    const navigate = useNavigate();
    const [token, setToken]  = useState<string | null>(null);
    const [user, setUser] = useState<User | null> (null);

    const [isReady, setIsReady] = useState(false);

    useEffect(() =>{
        const storeduser = localStorage.getItem("user");
        const storedtoken = localStorage.getItem("token");

        if (storeduser && storedtoken)
        {       const userObject=JSON.parse(storeduser);
            setUser(JSON.parse(storeduser));
          //  setToken(JSON.parse(token));
          setToken(storedtoken);
            axios.defaults.headers.common["Authorization"] = "Bearer " + storedtoken;
            console.log( userObject.userId+"  "+userObject.role);
        }
        
        setIsReady(true);

    }, [] );

    const registerUser = async (email: string, username: string, password: string, name:string) =>{
              await registerAPI(email, username, password, name)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
            role: res?.data.role,
             userId: res.data.userId,
             name: res.data.name,

          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          axios.defaults.headers.common["Authorization"] = "Bearer " + res?.data.token;
          console.log("succesfully created user!"+ userObj.userId+"  "+userObj.role);
          navigate("/");
        }
      })
      .catch((e) => console.log("Server error occured when creating account"));


    }



    const loginUser = async(username: string, password: string)=>{
        await loginAPI(username, password)//login then make token into local storage
            .then((res) => {
                    if (res)
                    {
                        localStorage.setItem("token", res?.data.token);
                        const userObj = {
                            userName: res?.data.userName,
                            email: res?.data.email,
                            role: res?.data.role,
                            userId: res.data.userId,
                            name: res.data.name,

                        }
                    localStorage.setItem("user", JSON.stringify(userObj));
                    setToken(res?.data.token!);
                    setUser(userObj!);
                    //toast.success(login success);

                    //////navigate based on role!
                  
                    switch (userObj?.role)
                    {
                        case "Patient" :
                            navigate(`/patient/${userObj.userId}`); 
                            break;
                        case "Doctor" :
                            navigate(`/doctor/${userObj.userId}`); 
                            break;
                        case "Assistant":
                            navigate(`/assistant/${userObj.userId}`); 
                            break;
                        case "Admin":
                            navigate(`/admin/${userObj.userId}`); 
                            break;
                    }                 
                    console.log( userObj.userId+"  "+userObj.role);
                    }

            })
            .catch((e) => console.log("ERROR LOGGING IN!"));

    };
    
    const isLoggedIn = () => {
        return !!user;

    };
    const logout = () =>{

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        navigate("/");
    }

    return (
        <UserContext.Provider value = {{loginUser, user, token, logout, isLoggedIn,registerUser }}>
            {isReady ? children : null}
        </UserContext.Provider>

    );


};

export const useAuth = () => React.useContext(UserContext);