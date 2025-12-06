import React, { useEffect, useState } from 'react'
import UserInfo from '../Components/UserInfoComponent/UserInfo';
import { useAuth } from '../Context/UserAuth';
import { AppointmentFull, AssistantSimple, ClinicSimple } from '../types/appointment';
import { getAssistantByUserId } from '../Services/AssistantService';
import PendingAppointmentsList from '../Components/AssistantDashboardComponents/PendingAppointmentsList';
import ReviewAppointmentBox from '../Components/AssistantDashboardComponents/ReviewAppointmentBox';
import { getClinicById } from '../Services/ClinicService';
import { getAppointmentsByClinicAndStatus, updateAppointmentMessage, updateAppointmentStatus } from '../Services/AppointmentService';
import { stat } from 'fs';

interface Props  {

    
}

const AssistantDashboard = (props: Props) => {

  const {user} = useAuth();

  const [assistant, setAssistant] = useState<AssistantSimple | undefined>();
  const [clinic, setClinic] = useState<ClinicSimple | undefined>();

  const [pendingApps, setPendingApps] = useState<AppointmentFull[]>([]);
  const [finishedApps, setFinishedApps] = useState <AppointmentFull[]>([]);

  //get clinics

  //get appointments pending

  //get appointments feedback written

  //update appointments ^^ (accept, decline) + update Message
  const updateAppointmentStatusHere = async (appointmentId:number, status:string) =>{

    const response = await updateAppointmentStatus(appointmentId, status);
       setPendingApps(prevAppointments => 
      prevAppointments.filter(appointment => appointment.id !== appointmentId) );
      
   };

  useEffect(() => {
  const fetchAssistant = async () => {
    if (user?.userId) {  
      try {
        console.log("user id:"+user.userId);
        const response = await getAssistantByUserId(user.userId);
        setAssistant(response.data); 
        console.log(response.data.assistantId + " " + response.data.clinicId);
      } catch (error) {
        console.error("Error fetching assistant:", error);
      }
    }
  };  
  fetchAssistant();

}, [user?.userId])

useEffect(() => {
  const fetchClinic = async () => {
    if (!assistant?.clinicId) return;
    try {
      const response = await getClinicById(assistant.clinicId);
      setClinic(response.data);
    } catch (err) {
      console.log("Error fetching clinic");
    }
  };
  fetchClinic();
}, [assistant?.clinicId]);

useEffect(() =>{
   const fetchPendingApps = async () => {
      if (!assistant?.clinicId) return;
      try {
            const appointments = await getAppointmentsByClinicAndStatus(assistant.clinicId, "Pending");
              if (appointments)
            setPendingApps(appointments);
          //  console.log("pending apps: "+appointments?.at(0)?.appointmentDateTime);
      }catch (error)
        {
          console.log("couldnt fetch pending appointments!");
        }

  };
  fetchPendingApps(); //need to recall pending appointments after declining or accepting one!
}, [assistant?.clinicId]);




  if (!user) return null; 


  return (
    <section className="h-full bg-darkBlue flex flex-col overflow-hidden">
      <div className="flex-1 flex justify-center">
        <div className="bg-gray-100 w-7/12 flex flex-col p-4"> 
        
          <br></br>
          <UserInfo userRole="assistant" userName={user.name} />
             <br></br>
          <div className="px-4 py-2 bg-darkBlue flex justify-center text-white"><h3>Clinic:  {clinic?.name}</h3></div>

 <br></br> 
        <div>
      <PendingAppointmentsList appointmentsList={pendingApps} updatePendingAppointments={updateAppointmentStatusHere}/>
          </div>
        
 <br></br>  <br></br> 
     <h5 className="mb-4 font-semibold text-lg text-center">   Review Written Appointments:</h5>


      <div className="flex justify-center">
        <select  className="select select-bordered w-full py-2 border-4 text-center max-w-[500px] justify-center"defaultValue=""><option value="" disabled>Select a written appointment</option>
                          <option> Option 1</option>
                              <option> Option 2</option>

                              </select>

      </div>
  <br></br> 
    
    
    
      <ReviewAppointmentBox/>


              
        </div>
      </div>
    </section>
  )
}

export default AssistantDashboard;