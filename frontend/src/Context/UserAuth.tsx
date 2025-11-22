import { createContext, useEffect, useState } from "react";
import { User } from "../types/appointment";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/AuthService";
import React from "react";
import axios from "axios"

type UserContextType = {
    user: User | null;
    token: string | null;
    registerUser: (email: string, username: string, password:string) => void;
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

    const registerUser = async (email: string, username: string, password: string) =>{
              await registerAPI(email, username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
            role: res?.data.role,
             userId: res.data.userId,

          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
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

                        }
                    localStorage.setItem("user", JSON.stringify(userObj));
                    setToken(res?.data.token!);
                    setUser(userObj!);
                    //toast.success(login success);
                    navigate("/patient/2");                          //change this to specifc, but ill see 
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