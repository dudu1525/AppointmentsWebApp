import React, { useRef, useState } from 'react'
import { createAdmin, getAllUsers } from '../Services/AuthService';
import { createPatient, deletePatientById, getAllPatients, updatePatientById } from '../Services/PatientService';
import { AssistantDetailsDto, ClinicDtoList, DoctorDetailsDto, PatientDetailsDto, UserTypeDto } from '../types/gettingListsTypes';
import { updateAssistantDto, updateClinicDto, updateDoctorDto, updatePatientDto } from '../types/updateTypes';
import { createDoctor, deleteDoctorById, getAllDoctors, updateDoctorById } from '../Services/DoctorService';
import { createAssistant, deleteAssistantById, getAllAssistant, updateAssistantById } from '../Services/AssistantService';
import { createClinic, deleteClinicById, getAllClinics, updateClinicById } from '../Services/ClinicService';
import { ClinicDetailed } from '../types/normalTypes';

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
//get all users:

const [users, setUsers] = useState<UserTypeDto[]>([]);
const handleGetAllUsers= async () => {
  const result = await getAllUsers(); 

  if (result.success) {
    setUsers(result.data as UserTypeDto[]);
   setOperationFeedback("getUsers", "Users loaded successfully");
  } else {
    setUsers([]);
     setOperationFeedback("getUsers", "Failed to load users: " + result.message, true);

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
///////////////////////////////////////////////////////////////////////////////////////////////Manage Doctors
//create doctors
const doctorClinicIdRef = useRef<HTMLInputElement>(null);
const doctorusernameRef = useRef<HTMLInputElement>(null);
const doctornameRef     = useRef<HTMLInputElement>(null);
const doctorpasswordRef = useRef<HTMLInputElement>(null);
const doctoremailRef    = useRef<HTMLInputElement>(null);
const doctorTypeRef    = useRef<HTMLInputElement>(null);

const handleCreateDoctor = async (e: React.FormEvent) =>{
   e.preventDefault();
const result = await createDoctor(Number(doctorClinicIdRef.current?.value) ?? 0,doctorusernameRef.current?.value ?? "",doctornameRef.current?.value ?? "",
            doctoremailRef.current?.value ?? "",doctorpasswordRef.current?.value ?? "",doctorTypeRef.current?.value ?? "" );

 if (result.success) {
      if (doctorClinicIdRef.current) doctorClinicIdRef.current.value = "";
    if (doctorusernameRef.current) doctorusernameRef.current.value = "";
    if (doctornameRef.current) doctornameRef.current.value = "";
    if (doctorpasswordRef.current) doctorpasswordRef.current.value = "";
    if (doctoremailRef.current) doctoremailRef.current.value = "";
    if (doctorTypeRef.current) doctorTypeRef.current.value = "";
   setOperationFeedback("createDoctor", "Doctor created successfully");
  } else {
   setOperationFeedback("createDoctor", "Failed to create doctor: " + result.message, true);

  }

};

//get doctors
const [doctors, setDoctors] = useState<DoctorDetailsDto[]>([]);
const handleGetAllDoctors = async () => {
  const result = await getAllDoctors(); 

  if (result.success) {
    setDoctors(result.data as DoctorDetailsDto[]);
   setOperationFeedback("getDoctors", "Doctors loaded successfully");
  } else {
    setDoctors([]);
     setOperationFeedback("getDoctors", "Failed to load doctors: " + result.message, true);

  }
 
};
//modify doctor by id
const updateDoctorIdRef = useRef<HTMLInputElement>(null);
const updatedoctorUsernameRef     = useRef<HTMLInputElement>(null);
const updatedoctorNameRef = useRef<HTMLInputElement>(null);
const updatedoctorEmailRef    = useRef<HTMLInputElement>(null);
const updatedoctorTypeRef    = useRef<HTMLInputElement>(null);
const updatedoctorClinicIdRef    = useRef<HTMLInputElement>(null);

const handleUpdateDoctor = async (e: React.FormEvent) => {
  e.preventDefault();

  const doctorId = Number(updateDoctorIdRef.current?.value);
  if (!doctorId) {
    setOperationFeedback("updateDoctor", "Failed to update doctor " , true);
    return;
  }

  const dto: updateDoctorDto = {
    userName: updatedoctorUsernameRef.current?.value ?? "",
    name: updatedoctorNameRef.current?.value ?? "",
    email: updatedoctorEmailRef.current?.value ?? "",
    type: updatedoctorTypeRef.current?.value ?? ""   ,
    clinicId: Number(updatedoctorClinicIdRef.current?.value) ?? 0,

  };

  const result = await updateDoctorById(doctorId, dto);

  if (result.success) {
    setOperationFeedback("updateDoctor", "Doctor updated successfully");
  } else {
    setOperationFeedback("updateDoctor", "Failed to update doctor  " + result.message, true);
  }
};

//delete doctor by id
const deleteDoctorIdref = useRef<HTMLInputElement>(null);

const handleDeleteDoctor = async (e:React.FormEvent) =>{
e.preventDefault();

 const doctorId = Number(deleteDoctorIdref.current?.value);
if (!doctorId) {
    setOperationFeedback("deleteDoctor", "Failed to delete doctor because of Id non existant" , true);
    return;
  }
const result = await deleteDoctorById(doctorId);

if (result.success) {
    setOperationFeedback("deleteDoctor", "Doctor deleted successfully");
  } else {
    setOperationFeedback("deleteDoctor", "Failed to delete doctor  " + result.message, true);
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////assistant CRUD
const assistantClinicIdRef = useRef<HTMLInputElement>(null);
const assistantusernameRef = useRef<HTMLInputElement>(null);
const assistantnameRef     = useRef<HTMLInputElement>(null);
const assistantpasswordRef = useRef<HTMLInputElement>(null);
const assistantemailRef    = useRef<HTMLInputElement>(null);


const handleCreateAssistant= async (e: React.FormEvent) =>{
   e.preventDefault();
const result = await createAssistant(Number(assistantClinicIdRef.current?.value) ?? 0,assistantusernameRef.current?.value ?? "",assistantnameRef.current?.value ?? "",
            assistantpasswordRef.current?.value ?? "",assistantemailRef.current?.value ?? "" );

 if (result.success) {
      if (assistantClinicIdRef.current) assistantClinicIdRef.current.value = "";
    if (assistantusernameRef.current) assistantusernameRef.current.value = "";
    if (assistantnameRef.current) assistantnameRef.current.value = "";
    if (assistantpasswordRef.current) assistantpasswordRef.current.value = "";
    if (assistantemailRef.current) assistantemailRef.current.value = "";

   setOperationFeedback("createAssistant", "Assistant created successfully");
  } else {
   setOperationFeedback("createAssistant", "Failed to create assistant: " + result.message, true);

  }

};

//get assistants
const [assistants, setAssistants] = useState<AssistantDetailsDto[]>([]);
const handleGetAllAssistants = async () => {
  const result = await getAllAssistant(); 

  if (result.success) {
    setAssistants(result.data as AssistantDetailsDto[]);
   setOperationFeedback("getAssistants", "Assistants loaded successfully");
  } else {
    setAssistants([]);
     setOperationFeedback("getAssistants", "Failed to load assistants: " + result.message, true);

  }
 
};
//update assistant by id
const updateAssistantIdRef = useRef<HTMLInputElement>(null);
const updateAssistantUsernameRef     = useRef<HTMLInputElement>(null);
const updateAssistantNameRef = useRef<HTMLInputElement>(null);
const updateAssistantEmailRef    = useRef<HTMLInputElement>(null);
const updateAssistantClinicIdRef    = useRef<HTMLInputElement>(null);

const handleUpdateAssistant = async (e: React.FormEvent) => {
  e.preventDefault();

  const assistantId = Number(updateAssistantIdRef.current?.value);
  if (!assistantId) {
    setOperationFeedback("updateAssistant", "Failed to update assistant " , true);
    return;
  }

  const dto: updateAssistantDto = {
    userName: updateAssistantUsernameRef.current?.value ?? "",
    name: updateAssistantNameRef.current?.value ?? "",
    email: updateAssistantEmailRef.current?.value ?? "",
    clinicId: Number(updateAssistantClinicIdRef.current?.value) ?? 0,

  };

  const result = await updateAssistantById(assistantId, dto);

  if (result.success) {
    setOperationFeedback("updateAssistant", "Assistant updated successfully");
  } else {
    setOperationFeedback("updateAssistant", "Failed to update assistant  " + result.message, true);
  }
};

//delete assistant by id
const deleteAssistantIdref = useRef<HTMLInputElement>(null);

const handleDeleteAssistant = async (e:React.FormEvent) =>{
e.preventDefault();

 const assistantId = Number(deleteAssistantIdref.current?.value);
if (!assistantId) {
    setOperationFeedback("deleteAssistant", "Failed to delete assistant because of Id non existant" , true);
    return;
  }
const result = await deleteAssistantById(assistantId);

if (result.success) {
    setOperationFeedback("deleteAssistant", "Assistant deleted successfully");
  } else {
    setOperationFeedback("deleteAssistant", "Failed to delete assistant  " + result.message, true);
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////Manage Clinics
const clinicNameRef = useRef<HTMLInputElement>(null);
const clinicLocationRef     = useRef<HTMLInputElement>(null);

const handleCreateClinic= async (e: React.FormEvent) =>{
   e.preventDefault();
const result = await createClinic(clinicNameRef.current?.value ?? "",clinicLocationRef.current?.value ?? "");

 if (result.success) {
      if (clinicNameRef.current) clinicNameRef.current.value = "";
    if (clinicLocationRef.current) clinicLocationRef.current.value = "";


   setOperationFeedback("createClinic", "Clinic created successfully");
  } else {
   setOperationFeedback("createClinic", "Failed to create clinic: " + result.message, true);

  }

};

//get clinics
const [clinics, setClinics] = useState<ClinicDtoList[]>([]);
const handleGetAllClinics = async () => {
  const result = await getAllClinics(); 

  if (result.success) {
    setClinics(result.data as ClinicDtoList[]);
   setOperationFeedback("getClinics", "Clinics loaded successfully");
  } else {
    setClinics([]);
     setOperationFeedback("getClinics", "Failed to load clinics: " + result.message, true);

  }
};
//update clinics
const updateClinicIdRef = useRef<HTMLInputElement>(null);
const updateClinicNameRef     = useRef<HTMLInputElement>(null);
const updateClinicLocationRef = useRef<HTMLInputElement>(null);

const handleUpdateClinic = async (e: React.FormEvent) => {
  e.preventDefault();

  const clinicId = Number(updateClinicIdRef.current?.value);
  if (!clinicId) {
    setOperationFeedback("updateClinic", "Failed to update Clinic " , true);
    return;
  }

  const dto: updateClinicDto = {
    name: updateClinicNameRef.current?.value ?? "",
    location: updateClinicLocationRef.current?.value ?? "",
  };

  const result = await updateClinicById(clinicId, dto);

  if (result.success) {
    setOperationFeedback("updateClinic", "Clinic updated successfully");
  } else {
    setOperationFeedback("updateClinic", "Failed to update Clinic  " + result.message, true);
  }
};
//delete clinic by id
const deleteClinicIdref = useRef<HTMLInputElement>(null);

const handleDeleteClinic = async (e:React.FormEvent) =>{
e.preventDefault();

 const clinicId = Number(deleteClinicIdref.current?.value);
if (!clinicId) {
    setOperationFeedback("deleteClinic", "Failed to delete clinic because of Id non existant" , true);
    return;
  }
const result = await deleteClinicById(clinicId);

if (result.success) {
    setOperationFeedback("deleteClinic", "clinic deleted successfully");
  } else {
    setOperationFeedback("deleteClinic", "Failed to delete clinic  " + result.message, true);
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////Manage Appointments





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
                           {/* Get All Users */}
    <h3 className="text-lg font-semibold">Get all Users</h3>

    <div id="getUsers">
      <div className="w-full border border-gray-300 bg-gray-100 px-4 py-4 rounded-lg shadow-sm">

        <button
          onClick={handleGetAllUsers}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
        >
          Load All Users
        </button>

        <div className="mt-4 text-sm">
          {users.length === 0 ? (
            <div>No users loaded.</div>
          ) : (
            <ul className="space-y-1">
              {users.map((p) => (
                <li key={p.userId} className="bg-white border p-2 rounded">
                  user id: {p.userId} – username: {p.userName} ({p.email}) - role: {p.role}
                </li>
              ))}
            </ul>
          )}
        </div>

        {feedback.getUsers && (
          <div
            className={`mt-4 p-2 rounded text-sm ${
              feedback.getUsers.isError
                ? "bg-red-200 text-red-900"
                : "bg-green-200 text-green-900"
            }`}
          >
            {feedback.getUsers.message}
          </div>
        )}
      </div>
    </div>

                            </div>

                    );
                
                case 1://patient manager
                   return (
  <div className="space-y-10">

    {/* Create Patient */}
    <h3 className="text-lg font-semibold">Create Patient Account</h3>

    <div id="createPatient">
      <div className="w-full border border-gray-300 bg-gray-100 px-4 py-4 rounded-lg shadow-sm">

        <form onSubmit={handleCreatePatient} className="space-y-4">

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800">Username:</label>
            <input
              id="inputUsername"
              ref={patientusernameRef}
              placeholder="Create Username"
              className="border border-gray-300 rounded p-2 text-sm focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800">Name:</label>
            <input
              id="inputName"
              ref={patientnameRef}
              placeholder="Create Name"
              className="border border-gray-300 rounded p-2 text-sm focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800">Password:</label>
            <input
              type="password"
              id="inputPassword"
              ref={patientpasswordRef}
              placeholder="Create Password"
              className="border border-gray-300 rounded p-2 text-sm focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800">Email:</label>
            <input
              id="inputMail"
              ref={patientemailRef}
              placeholder="Create Email"
              className="border border-gray-300 rounded p-2 text-sm focus:ring focus:ring-indigo-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded font-medium text-sm hover:bg-indigo-700 transition"
          >
            Create Patient
          </button>
        </form>

        {feedback.createPatient && (
          <div
            className={`mt-4 p-2 rounded text-sm ${
              feedback.createPatient.isError
                ? "bg-red-200 text-red-900"
                : "bg-green-200 text-green-900"
            }`}
          >
            {feedback.createPatient.message}
          </div>
        )}
      </div>
    </div>

    {/* Get All Patients */}
    <h3 className="text-lg font-semibold">Get all Patients</h3>

    <div id="getPatients">
      <div className="w-full border border-gray-300 bg-gray-100 px-4 py-4 rounded-lg shadow-sm">

        <button
          onClick={handleGetAllPatients}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
        >
          Load All Patients
        </button>

        <div className="mt-4 text-sm">
          {patients.length === 0 ? (
            <div>No patients loaded.</div>
          ) : (
            <ul className="space-y-1">
              {patients.map((p) => (
                <li key={p.patientId} className="bg-white border p-2 rounded">
                  user id: {p.userId} – patient id: {p.patientId} : {p.name} ({p.userName}) {p.email}
                </li>
              ))}
            </ul>
          )}
        </div>

        {feedback.getPatients && (
          <div
            className={`mt-4 p-2 rounded text-sm ${
              feedback.getPatients.isError
                ? "bg-red-200 text-red-900"
                : "bg-green-200 text-green-900"
            }`}
          >
            {feedback.getPatients.message}
          </div>
        )}
      </div>
    </div>

    {/* Modify Patient */}
    <h3 className="text-lg font-semibold">Modify a Patient with ID</h3>

    <div id="modifyPatient">
      <div className="w-full border border-gray-300 bg-gray-100 px-4 py-4 rounded-lg shadow-sm">

        <form onSubmit={handleUpdatePatient} className="space-y-3 text-sm">
          <input ref={updatepatientIdRef} placeholder="Patient ID" type="number" className="w-full border p-2 rounded" />
          <input ref={updatepatientUsernameRef} placeholder="Username" className="w-full border p-2 rounded" />
          <input ref={updatepatientNameRef} placeholder="Name" className="w-full border p-2 rounded" />
          <input ref={updatepatientEmailRef} placeholder="Email" className="w-full border p-2 rounded" />
          <input ref={updatepatientMedicalRef} placeholder="Medical Record" className="w-full border p-2 rounded" />

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded font-medium hover:bg-yellow-600 transition"
          >
            Update Patient
          </button>
        </form>

        {feedback.updatePatient && (
          <div
            className={`mt-4 p-2 rounded text-sm ${
              feedback.updatePatient.isError
                ? "bg-red-200 text-red-900"
                : "bg-green-200 text-green-900"
            }`}
          >
            {feedback.updatePatient.message}
          </div>
        )}
      </div>
    </div>

    {/* Delete Patient */}
    <h3 className="text-lg font-semibold">Delete a Patient by ID</h3>

    <div id="deletePatient">
      <div className="w-full border border-gray-300 bg-gray-100 px-4 py-4 rounded-lg shadow-sm">

        <form onSubmit={handleDeletePatient} className="space-y-3 text-sm">
          <input ref={deletePatientIdref} placeholder="Patient ID" type="number" className="w-full border p-2 rounded" />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded font-medium hover:bg-red-700 transition"
          >
            Delete Patient
          </button>
        </form>

        {feedback.deletePatient && (
          <div
            className={`mt-4 p-2 rounded text-sm ${
              feedback.deletePatient.isError
                ? "bg-red-200 text-red-900"
                : "bg-green-200 text-green-900"
            }`}
          >
            {feedback.deletePatient.message}
          </div>
        )}
      </div>
    </div>



  </div>
);


                     case 2:
                    return (//manage doctors
                            <div className="space-y-10">

                           {/* Create Doctor */}
    <h3 className="text-lg font-semibold">Create Doctor Account</h3>

    <div id="createDoctor">
      <div className="w-full border border-gray-300 bg-gray-100 px-4 py-4 rounded-lg shadow-sm">

        <form onSubmit={handleCreateDoctor} className="space-y-4">

          <input ref={doctorClinicIdRef} placeholder="Clinic ID (existing!) " type="number" className="w-full border p-2 rounded" />                

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800">Username:</label>
            <input
              id="inputUsername"
              ref={doctorusernameRef}
              placeholder="Create Username"
              className="border border-gray-300 rounded p-2 text-sm focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800">Name:</label>
            <input
              id="inputName"
              ref={doctornameRef}
              placeholder="Create Name"
              className="border border-gray-300 rounded p-2 text-sm focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800">Password:</label>
            <input
              type="password"
              id="inputPassword"
              ref={doctorpasswordRef}
              placeholder="Create Password"
              className="border border-gray-300 rounded p-2 text-sm focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800">Email:</label>
            <input
              id="inputMail"
              ref={doctoremailRef}
              placeholder="Create Email"
              className="border border-gray-300 rounded p-2 text-sm focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800">Type of Doctor:</label>
            <input
              id="inputTypeOfDoctor"
              ref={doctorTypeRef}
              placeholder="Input type of doctor"
              className="border border-gray-300 rounded p-2 text-sm focus:ring focus:ring-indigo-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded font-medium text-sm hover:bg-indigo-700 transition"
          >
            Create Doctor
          </button>
        </form>

        {feedback.createDoctor && (
          <div
            className={`mt-4 p-2 rounded text-sm ${
              feedback.createDoctor.isError
                ? "bg-red-200 text-red-900"
                : "bg-green-200 text-green-900"
            }`}
          >
            {feedback.createDoctor.message}
          </div>
        )}
      </div>
      </div>

               {/* Get all Doctors */}
               <h3 className="text-lg font-semibold">Get all Doctors</h3>

    <div id="getDoctors">
      <div className="w-full border border-gray-300 bg-gray-100 px-4 py-4 rounded-lg shadow-sm">

        <button
          onClick={handleGetAllDoctors}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
        >
          Load All Doctors
        </button>

        <div className="mt-4 text-sm">
          {doctors.length === 0 ? (
            <div>No doctors loaded.</div>
          ) : (
            <ul className="space-y-1">
              {doctors.map((p) => (
                <li key={p.doctorId} className="bg-white border p-2 rounded">
                  doctor Id: {p.doctorId} - {p.doctorUserName} : {p.doctorName} ({p.type}) {p.email} clinic Id: {p.clinicId}
                </li>
              ))}
            </ul>
          )}
        </div>

        {feedback.getDoctors && (
          <div
            className={`mt-4 p-2 rounded text-sm ${
              feedback.getDoctors.isError
                ? "bg-red-200 text-red-900"
                : "bg-green-200 text-green-900"
            }`}
          >
            {feedback.getDoctors.message}
          </div>
        )}
      </div>
    </div>

        {/*Update Doctor*/}
           <h3 className="text-lg font-semibold">Modify a Doctor with ID</h3>

    <div id="modifyDoctor">
      <div className="w-full border border-gray-300 bg-gray-100 px-4 py-4 rounded-lg shadow-sm">

        <form onSubmit={handleUpdateDoctor} className="space-y-3 text-sm">
          <input ref={updateDoctorIdRef} placeholder="Doctor ID" type="number" className="w-full border p-2 rounded" />
          <input ref={updatedoctorUsernameRef} placeholder="Username" className="w-full border p-2 rounded" />
          <input ref={updatedoctorNameRef} placeholder="Name" className="w-full border p-2 rounded" />
          <input ref={updatedoctorEmailRef} placeholder="Email" className="w-full border p-2 rounded" />
          <input ref={updatedoctorTypeRef} placeholder="Type of doctor" className="w-full border p-2 rounded" />
          <input ref={updatedoctorClinicIdRef} placeholder="New Clinic Id (existing!)" className="w-full border p-2 rounded" />

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded font-medium hover:bg-yellow-600 transition"
          >
            Update Doctor
          </button>
        </form>

        {feedback.updateDoctor && (
          <div
            className={`mt-4 p-2 rounded text-sm ${
              feedback.updateDoctor.isError
                ? "bg-red-200 text-red-900"
                : "bg-green-200 text-green-900"
            }`}
          >
            {feedback.updateDoctor.message}
          </div>
        )}
      </div>
    </div>

        {/* Delete Doctor */}
    <h3 className="text-lg font-semibold">Delete a Doctor by ID</h3>

    <div id="deleteDoctor">
      <div className="w-full border border-gray-300 bg-gray-100 px-4 py-4 rounded-lg shadow-sm">

        <form onSubmit={handleDeleteDoctor} className="space-y-3 text-sm">
          <input ref={deleteDoctorIdref} placeholder="Doctor ID" type="number" className="w-full border p-2 rounded" />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded font-medium hover:bg-red-700 transition"
          >
            Delete Doctor
          </button>
        </form>

        {feedback.deleteDoctor && (
          <div
            className={`mt-4 p-2 rounded text-sm ${
              feedback.deleteDoctor.isError
                ? "bg-red-200 text-red-900"
                : "bg-green-200 text-green-900"
            }`}
          >
            {feedback.deleteDoctor.message}
          </div>
        )}
      </div>
    </div>

   
                            </div>
                    );
                //Manage Assistants
                case 3:
                    return (
                         <div className="space-y-10">


                         {/* Create Assistant */}
    <h3 className="text-lg font-semibold">Create Assistant Account</h3>

    <div id="createAssistant">
      <div className="w-full border border-gray-300 bg-gray-100 px-4 py-4 rounded-lg shadow-sm">

        <form onSubmit={handleCreateAssistant} className="space-y-4">

        <input ref={assistantClinicIdRef} placeholder="Clinic ID (existing!) " type="number" className="w-full border p-2 rounded" />  
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800">Username:</label>
            <input
              id="inputUsername"
              ref={assistantusernameRef}
              placeholder="Create Username"
              className="border border-gray-300 rounded p-2 text-sm focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800">Name:</label>
            <input
              id="inputName"
              ref={assistantnameRef}
              placeholder="Create Name"
              className="border border-gray-300 rounded p-2 text-sm focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800">Password:</label>
            <input
              type="password"
              id="inputPassword"
              ref={assistantpasswordRef}
              placeholder="Create Password"
              className="border border-gray-300 rounded p-2 text-sm focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800">Email:</label>
            <input
              id="inputMail"
              ref={assistantemailRef}
              placeholder="Create Email"
              className="border border-gray-300 rounded p-2 text-sm focus:ring focus:ring-indigo-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded font-medium text-sm hover:bg-indigo-700 transition"
          >
            Create Assistant
          </button>
        </form>

        {feedback.createAssistant && (
          <div
            className={`mt-4 p-2 rounded text-sm ${
              feedback.createAssistant.isError
                ? "bg-red-200 text-red-900"
                : "bg-green-200 text-green-900"
            }`}
          >
            {feedback.createAssistant.message}
          </div>
        )}
      </div>
    </div>

    {/* Get All Assistants */}
    <h3 className="text-lg font-semibold">Get all Assistants</h3>

    <div id="getAssistants">
      <div className="w-full border border-gray-300 bg-gray-100 px-4 py-4 rounded-lg shadow-sm">

        <button
          onClick={handleGetAllAssistants}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
        >
          Load All Assistants
        </button>

        <div className="mt-4 text-sm">
          {assistants.length === 0 ? (
            <div>No Assistants loaded.</div>
          ) : (
            <ul className="space-y-1">
              {assistants.map((p) => (
                <li key={p.assistantId} className="bg-white border p-2 rounded">
                  Id: {p.assistantId} –  {p.assistantUserName} : {p.assistantName} ({p.assistantEmail}) Clinic id: {p.clinicId}
                </li>
              ))}
            </ul>
          )}
        </div>

        {feedback.getAssistants && (
          <div
            className={`mt-4 p-2 rounded text-sm ${
              feedback.getAssistants.isError
                ? "bg-red-200 text-red-900"
                : "bg-green-200 text-green-900"
            }`}
          >
            {feedback.getAssistants.message}
          </div>
        )}
      </div>
    </div>

             {/*Update Assistant*/}
           <h3 className="text-lg font-semibold">Modify an Assistant with ID</h3>

    <div id="modifyAssistant">
      <div className="w-full border border-gray-300 bg-gray-100 px-4 py-4 rounded-lg shadow-sm">

        <form onSubmit={handleUpdateAssistant} className="space-y-3 text-sm">
          <input ref={updateAssistantIdRef} placeholder="Assistant ID" type="number" className="w-full border p-2 rounded" />
          <input ref={updateAssistantUsernameRef} placeholder="Username" className="w-full border p-2 rounded" />
          <input ref={updateAssistantNameRef} placeholder="Name" className="w-full border p-2 rounded" />
          <input ref={updateAssistantEmailRef} placeholder="Email" className="w-full border p-2 rounded" />
          <input ref={updateAssistantClinicIdRef} placeholder="New Clinic Id (existing!)" className="w-full border p-2 rounded" />

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded font-medium hover:bg-yellow-600 transition"
          >
            Update Assistant
          </button>
        </form>

        {feedback.updateAssistant && (
          <div
            className={`mt-4 p-2 rounded text-sm ${
              feedback.updateAssistant.isError
                ? "bg-red-200 text-red-900"
                : "bg-green-200 text-green-900"
            }`}
          >
            {feedback.updateAssistant.message}
          </div>
        )}
      </div>
    </div>

        {/* Delete Assistant */}
    <h3 className="text-lg font-semibold">Delete an Assistant by ID</h3>

    <div id="deleteAssistant">
      <div className="w-full border border-gray-300 bg-gray-100 px-4 py-4 rounded-lg shadow-sm">

        <form onSubmit={handleDeleteAssistant} className="space-y-3 text-sm">
          <input ref={deleteAssistantIdref} placeholder="Assistant ID" type="number" className="w-full border p-2 rounded" />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded font-medium hover:bg-red-700 transition"
          >
            Delete Assistant
          </button>
        </form>

        {feedback.deleteAssistant && (
          <div
            className={`mt-4 p-2 rounded text-sm ${
              feedback.deleteAssistant.isError
                ? "bg-red-200 text-red-900"
                : "bg-green-200 text-green-900"
            }`}
          >
            {feedback.deleteAssistant.message}
          </div>
        )}
      </div>
    </div>





                         </div>
                    );

                     case 4:
                    return (
                            <div className="space-y-10">
                              
                               <h3 className="text-lg font-semibold">Create a Clinic</h3>

    <div id="createClinic">
      <div className="w-full border border-gray-300 bg-gray-100 px-4 py-4 rounded-lg shadow-sm">

        <form onSubmit={handleCreateClinic} className="space-y-4">
 
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800">Name of Clinic:</label>
            <input
              id="inputName"
              ref={clinicNameRef}
              placeholder="Input a name for the clinic"
              className="border border-gray-300 rounded p-2 text-sm focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800">Location of the clinic city:</label>
            <input
              id="inputLocation"
              ref={clinicLocationRef}
              placeholder="Input location of clinic"
              className="border border-gray-300 rounded p-2 text-sm focus:ring focus:ring-indigo-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded font-medium text-sm hover:bg-indigo-700 transition"
          >
            Create Clinic
          </button>
        </form>

        {feedback.createClinic && (
          <div
            className={`mt-4 p-2 rounded text-sm ${
              feedback.createClinic.isError
                ? "bg-red-200 text-red-900"
                : "bg-green-200 text-green-900"
            }`}
          >
            {feedback.createClinic.message}
          </div>
        )}
      </div>
    </div>

    {/* Get All Clinics */}
    <h3 className="text-lg font-semibold">Get all Clinics</h3>

    <div id="getClinics">
      <div className="w-full border border-gray-300 bg-gray-100 px-4 py-4 rounded-lg shadow-sm">

        <button
          onClick={handleGetAllClinics}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
        >
          Load All Clinics 
        </button>

        <div className="mt-4 text-sm">
          {clinics.length === 0 ? (
            <div>No Clinics loaded.</div>
          ) : (
            <ul className="space-y-1">
              {clinics.map((p) => (
                <li key={p.id} className="bg-white border p-2 rounded">
                  Id: {p.id} –  {p.name} : {p.location} 
                </li>
              ))}
            </ul>
          )}
        </div>

        {feedback.getClinics && (
          <div
            className={`mt-4 p-2 rounded text-sm ${
              feedback.getClinics.isError
                ? "bg-red-200 text-red-900"
                : "bg-green-200 text-green-900"
            }`}
          >
            {feedback.getClinics.message}
          </div>
        )}
      </div>
    </div>

             {/*Update Clinic*/}
           <h3 className="text-lg font-semibold">Modify a Clinic with ID</h3>

    <div id="modifyClinic">
      <div className="w-full border border-gray-300 bg-gray-100 px-4 py-4 rounded-lg shadow-sm">

        <form onSubmit={handleUpdateClinic} className="space-y-3 text-sm">
          <input ref={updateClinicIdRef} placeholder="Clinic ID" type="number" className="w-full border p-2 rounded" />
          <input ref={updateClinicNameRef} placeholder="Name" className="w-full border p-2 rounded" />
          <input ref={updateClinicLocationRef} placeholder="Location" className="w-full border p-2 rounded" />

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded font-medium hover:bg-yellow-600 transition"
          >
            Update Clinic
          </button>
        </form>

        {feedback.updateClinic && (
          <div
            className={`mt-4 p-2 rounded text-sm ${
              feedback.updateClinic.isError
                ? "bg-red-200 text-red-900"
                : "bg-green-200 text-green-900"
            }`}
          >
            {feedback.updateClinic.message}
          </div>
        )}
      </div>
    </div>

        {/* Delete Clinic */}
    <h3 className="text-lg font-semibold">Delete a Clinic by ID</h3>

    <div id="deleteClinic">
      <div className="w-full border border-gray-300 bg-gray-100 px-4 py-4 rounded-lg shadow-sm">

        <form onSubmit={handleDeleteClinic} className="space-y-3 text-sm">
          <input ref={deleteClinicIdref} placeholder="Clinic ID" type="number" className="w-full border p-2 rounded" />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded font-medium hover:bg-red-700 transition"
          >
            Delete Clinic
          </button>
        </form>

        {feedback.deleteClinic && (
          <div
            className={`mt-4 p-2 rounded text-sm ${
              feedback.deleteClinic.isError
                ? "bg-red-200 text-red-900"
                : "bg-green-200 text-green-900"
            }`}
          >
            {feedback.deleteClinic.message}
          </div>
        )}
      </div>
    </div>
                        
                        </div>

                    );
                
                case 5:
                    return (
                         <div>
                          
                          
                          manage appointments</div>
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