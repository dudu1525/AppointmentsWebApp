import React, { useRef, useState } from 'react'
import { createAdmin } from '../Services/AuthService';
import { createPatient, deletePatientById, getAllPatients, updatePatientById } from '../Services/PatientService';
import { PatientDetailsDto } from '../types/gettingListsTypes';
import { updatePatientDto } from '../types/updateTypes';

interface Props  {
currentState: number;



}

const AdminMainContent = (props: Props) => {
interface Feedback {
  [key: string]: { message: string; isError: boolean };
}

const [feedback, setFeedback] = useState<Feedback>({});
const setOperationFeedback = (operation: string, message: string, isError = false) => {
  setFeedback(prev => ({ ...prev, [operation]: { message, isError } }));
};

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
  ////////////////////////////////////////////////////////////////////////////////////////Manage Patients
//const [feedback, setFeedback] = useState<string>("");
const patientusernameRef = useRef<HTMLInputElement>(null);
const patientnameRef     = useRef<HTMLInputElement>(null);
const patientpasswordRef = useRef<HTMLInputElement>(null);
const patientemailRef    = useRef<HTMLInputElement>(null);
const handleCreatePatient = async (e: React.FormEvent) =>{
   e.preventDefault();
const result = await createPatient(patientemailRef.current?.value ?? "",patientusernameRef.current?.value ?? "",
            patientpasswordRef.current?.value ?? "",patientnameRef.current?.value ?? "");



 if (result.success) {
      if (patientusernameRef.current) patientusernameRef.current.value = "";
    if (patientnameRef.current) patientnameRef.current.value = "";
    if (patientpasswordRef.current) patientpasswordRef.current.value = "";
    if (patientemailRef.current) patientemailRef.current.value = "";
   setOperationFeedback("createPatient", "Patient created successfully");
  } else {
   setOperationFeedback("createPatient", "Failed to create patient: " + result.message, true);

  }

};
const [patients, setPatients] = useState<PatientDetailsDto[]>([]);
const handleGetAllPatients = async () => {
  const result = await getAllPatients(); 

  if (result.success) {
    setPatients(result.data as PatientDetailsDto[]);
   setOperationFeedback("getPatients", "Patients loaded successfully");
  } else {
    setPatients([]);
     setOperationFeedback("getPatients", "Failed to load patients: " + result.message, true);

  }
 
};
const updatepatientIdRef = useRef<HTMLInputElement>(null);
const updatepatientUsernameRef     = useRef<HTMLInputElement>(null);
const updatepatientNameRef = useRef<HTMLInputElement>(null);
const updatepatientEmailRef    = useRef<HTMLInputElement>(null);
const updatepatientMedicalRef    = useRef<HTMLInputElement>(null);

const handleUpdatePatient = async (e: React.FormEvent) => {
  e.preventDefault();

  const patientId = Number(updatepatientIdRef.current?.value);
  if (!patientId) {
    setOperationFeedback("updatePatient", "Failed to update patient " , true);
    return;
  }

  const dto: updatePatientDto = {
    userName: updatepatientUsernameRef.current?.value ?? "",
    name: updatepatientNameRef.current?.value ?? "",
    email: updatepatientEmailRef.current?.value ?? "",
    medicalRecord: updatepatientMedicalRef.current?.value ?? "",
  };

  const result = await updatePatientById(patientId, dto);

  if (result.success) {
    setOperationFeedback("updatePatient", "Patient updated successfully");
  } else {
    setOperationFeedback("updatePatient", "Failed to update patient  " + result.message, true);
  }
};

const deletePatientIdref    = useRef<HTMLInputElement>(null);

const handleDeletePatient = async (e:React.FormEvent) =>{
e.preventDefault();

 const patientId = Number(deletePatientIdref.current?.value);
if (!patientId) {
    setOperationFeedback("deletePatient", "Failed to delete patient because of Id non existant" , true);
    return;
  }
const result = await deletePatientById(patientId);

if (result.success) {
    setOperationFeedback("deletePatient", "Patient deleted successfully");
  } else {
    setOperationFeedback("deletePatient", "Failed to delete patient  " + result.message, true);
  }
}








////////////////////////////////////////////////////////////////////////////////Visible component
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
                                <input id="patientUsername" ref={usernameRef}  placeholder="Create UserName" />
                                </div>
                                <div>
                                 <label  className="p-4 mb-2 text-sm font-medium text-gray-900 mt-4  ">Name:</label>
                                <input id="patientName" ref={nameRef}   placeholder="Create Name" />
                                </div>
                                <div>
                                 <label  className="p-4 mb-2 text-sm font-medium text-gray-900 mt-4 ">Password:</label>
                                <input type="patientpassword" id="inputPassword"  ref={passwordRef}  placeholder="Create Password" />
                                </div>
                                <div>
                                 <label  className="p-4 mb-2 text-sm font-medium text-gray-900 mt-4 ">Email:</label>
                                <input id="patientMail"  ref={emailRef}  placeholder="Create Email" />
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
                         <div>
                          <h3>Create Patient Account</h3>
                          <div id="createPatient">
                            <div className="w-full border-2 border-black bg-gray-200 px-3 py-3 rounded-xl">
                                
                                  <form onSubmit={handleCreatePatient}>
                                    <div>
                                <label  className="s-4 p-4 mb-2 text-sm font-medium text-gray-900 mt-4 ">UserName:</label>
                                <input id="inputUsername" ref={patientusernameRef}  placeholder="Create UserName" />
                                </div>
                                <div>
                                 <label  className="p-4 mb-2 text-sm font-medium text-gray-900 mt-4  ">Name:</label>
                                <input id="inputName" ref={patientnameRef}   placeholder="Create Name" />
                                </div>
                                <div>
                                 <label  className="p-4 mb-2 text-sm font-medium text-gray-900 mt-4 ">Password:</label>
                                <input type="password" id="inputPassword"  ref={patientpasswordRef}  placeholder="Create Password" />
                                </div>
                                <div>
                                 <label  className="p-4 mb-2 text-sm font-medium text-gray-900 mt-4 ">Email:</label>
                                <input id="inputMail"  ref={patientemailRef}  placeholder="Create Email" />
                                    </div>
                                  <div className="border mt-4 ">
                                  <button type="submit" className="py-2 rounded border-2">Create Patient</button>
                                    </div>
                                  </form>


                                     {feedback.createPatient && (
  <div className={`mt-3 p-2 rounded ${feedback.createPatient.isError ? "bg-red-200 text-red-900" : "bg-green-200 text-green-900"}`}>
                                {feedback.createPatient.message}
                                      </div>)}
                                    


                                </div>
                            

                          </div>
                           <br/>  
                          <h3>Get all Patients</h3>
                           <br/>  
                          <div id="getPatients">
                              <div className="w-full border-2 border-black bg-gray-200 px-3 py-3 rounded-xl">
                                    <button onClick={handleGetAllPatients}>  Load All Patients</button>
                                   
                                        {patients.length === 0 ? (
                                 <div>No patients loaded.</div>
                                       ) : (
                                         <ul>
                                     {patients.map(p => (
                                      <li key={p.patientId}>
                                    user id: {p.userId} - patient id:{p.patientId} : {p.name}   ({p.userName})    {p.email}
                                          </li>
                                            ))}
                                              </ul>
                                             )}

                                  
                                  {feedback.getPatients && (
  <div className={`mt-3 p-2 rounded ${feedback.getPatients.isError ? "bg-red-200 text-red-900" : "bg-green-200 text-green-900"}`}>
                                {feedback.getPatients.message}
                                      </div>)}              

                              </div>

                          </div>
                                 <br/>     

                          <h3>Modify a Patient with id</h3>
                           <br/>  
                          <div id="modifyPatient">
                                      <div className="w-full border-2 border-black bg-gray-200 px-3 py-3 rounded-xl">
                          <form onSubmit={handleUpdatePatient}>
                        <div><input ref={updatepatientIdRef} placeholder="Patient ID" type="number" /></div>
                       <div> <input ref={updatepatientUsernameRef} placeholder="Username" /></div>
                    <div> <input ref={updatepatientNameRef} placeholder="Name" /></div>
                     <div>      <input ref={updatepatientEmailRef} placeholder="Email" /></div>
                     <div> <input ref={updatepatientMedicalRef} placeholder="Medical Record" /></div>
                   <div><button type="submit">Update Patient</button></div>
                        </form>
                           
                                      {feedback.updatePatient && (
            <div className={`mt-2 p-2 rounded ${feedback.updatePatient.isError ? "bg-red-200 text-red-900" : "bg-green-200 text-green-900"}`}>
                             {feedback.updatePatient.message}
                            </div>
                                    )}

                                      </div>

                          </div>
                           <br/>  
                           <h3>Delete a Patient by id</h3>
                            <br/>  
                          <div id="deletePatient">
                                      <div className="w-full border-2 border-black bg-gray-200 px-3 py-3 rounded-xl">
                                       <form onSubmit={handleDeletePatient}>
                                      <div><input ref={deletePatientIdref} placeholder="Patient ID" type="number" /></div>
                                       <div><button type="submit">Delete Patient!</button></div>

                                       </form>

                                       {feedback.deletePatient && (
            <div className={`mt-2 p-2 rounded ${feedback.deletePatient.isError ? "bg-red-200 text-red-900" : "bg-green-200 text-green-900"}`}>
                             {feedback.deletePatient.message}
                            </div>
                                    )}

                                      </div>

                          </div>


                         </div>
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