import React, { useEffect, useState } from 'react'
import UserInfo from '../Components/UserInfoComponent/UserInfo';
import { useAuth } from '../Context/UserAuth';
import { AppointmentFull, AssistantSimple, ClinicSimple } from '../types/appointment';
import { getAssistantByUserId } from '../Services/AssistantService';
import PendingAppointmentsList from '../Components/AssistantDashboardComponents/PendingAppointmentsList';
import ReviewAppointmentBox from '../Components/AssistantDashboardComponents/ReviewAppointmentBox';

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


  useEffect(() => {
  const fetchAssistant = async () => {
    if (user?.userId) {  
      try {
        console.log("user id:"+user.userId);
        const response = await getAssistantByUserId(user.userId);
        setAssistant(response.data); 
        console.log(response.data.assistantId + " " + response.data.clinicId);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    }
  };
    //get clinic name include it in header of dashboard
    
  //fetch appointments

  
  fetchAssistant();
}, [user?.userId])


  if (!user) return null; 


  return (
    <section className="h-full bg-darkBlue flex flex-col overflow-hidden">
      <div className="flex-1 flex justify-center">
        <div className="bg-gray-100 w-7/12 flex flex-col p-4"> 
          <br></br>
          <UserInfo userRole="assistant" userName={user.name} />
 <br></br> <br></br>
    
      <PendingAppointmentsList/>

        
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