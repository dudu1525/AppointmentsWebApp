import React, { useRef, useState } from 'react'
import { createAdmin } from '../Services/AuthService';

interface Props  {
currentState: number;



}

const AdminMainContent = (props: Props) => {


//////////////////////////////////////////////////////////////////////////////////////Manage Users
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
const [isError, setIsError] = useState<boolean>(false);
const usernameRef = useRef<HTMLInputElement>(null);
const nameRef     = useRef<HTMLInputElement>(null);
const passwordRef = useRef<HTMLInputElement>(null);
const emailRef    = useRef<HTMLInputElement>(null);
  const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
         setStatusMessage(null);
        try {
          await createAdmin(emailRef.current?.value ?? "",usernameRef.current?.value ?? "",
            passwordRef.current?.value ?? "",nameRef.current?.value ?? ""); 
          setIsError(false);
    setStatusMessage("Admin created successfully!");
     if (usernameRef.current) usernameRef.current.value = "";
    if (nameRef.current) nameRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
  } 
            catch (e:any) {
              setIsError(true);
               if (e.response?.data) {
            setStatusMessage("Error: " + e.response.data);
            } else {
           setStatusMessage("Failed to create admin.");
            }
        }
      };

    const renderContent = () =>{
            switch (props.currentState)
            {
                case 0:
                    return (//user manager
                            <div>
                                  <h3>Create Admin Account</h3>
                                <div className="w-full border-2 border-black bg-gray-200 px-3 py-3 rounded-xl">
                                
                                  <form onSubmit={handleRegister}>
                                    <div>
                                <label  className="s-4 p-4 mb-2 text-sm font-medium text-gray-900 mt-4 ">UserName:</label>
                                <input id="inputUsername" ref={usernameRef}  placeholder="Create UserName" />
                                </div>
                                <div>
                                 <label  className="p-4 mb-2 text-sm font-medium text-gray-900 mt-4  ">Name:</label>
                                <input id="inputName" ref={nameRef}   placeholder="Create Name" />
                                </div>
                                <div>
                                 <label  className="p-4 mb-2 text-sm font-medium text-gray-900 mt-4 ">Password:</label>
                                <input type="password" id="inputPassword"  ref={passwordRef}  placeholder="Create Password" />
                                </div>
                                <div>
                                 <label  className="p-4 mb-2 text-sm font-medium text-gray-900 mt-4 ">Email:</label>
                                <input id="inputMail"  ref={emailRef}  placeholder="Create Email" />
                                    </div>
                                  <div className="border mt-4 ">
                                  <button type="submit" className="py-2 rounded border-2">Create Admin</button>
                                    </div>
                                  </form>
                                  {statusMessage && (
                          <div
                                   className={`mt-4 p-2 rounded ${
                             isError ? "bg-red-200 text-red-900" : "bg-green-200 text-green-900"
                                     }`}
                              >
                                       {statusMessage}
                                    </div>
                                          )}
                                    
                                </div>
                                          <br/>    
                           <h3>Get all Users</h3>
                           <div className="w-full border-2 border-black bg-gray-200 px-3 py-3 rounded-xl">


                           </div>


                               <br/>    
                           <h3>Delete a User by Id</h3>
                           <div className="w-full border-2 border-black bg-gray-200 px-3 py-3 rounded-xl">

                                            
                           </div>


                            </div>

                    );
                
                case 1:
                    return (//patient manager
                         <div>manage patients</div>
                    );

                     case 2:
                    return (//manage doctors
                            <div>manage doctors</div>

                    );
                
                case 3:
                    return (
                         <div>manage assistants</div>
                    );

                     case 4:
                    return (
                            <div>manage clinics</div>

                    );
                
                case 5:
                    return (
                         <div>manage appointments</div>
                    );



            }
    }

  return (
    <div className="w-full border-2 border-black bg-gray-200 px-6 py-6 rounded-xl">
      <div className="flex flex-col gap-2 min-h-[600px] h-400 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  )
}

export default AdminMainContent