import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/UserAuth';
import { AppointmentFull, DoctorSimple } from '../../types/appointment';
import { getDoctorByUserId } from '../../Services/DoctorService';
import UserInfo from '../../Components/UserInfoComponent/UserInfo';
import { getAppointmentsByDoctorId, updateAppointmentMessage, updateAppointmentStatus } from '../../Services/AppointmentService';
import GivePresciptionBox from '../../Components/DoctorDashboardComponents/GivePresciptionBox';

interface Props  {


}

const DoctorDashboard = (props: Props) => {

const {user} = useAuth();
 const [doctor, setDoctor] = useState<DoctorSimple | undefined>();

  const [confirmedAppointments, setConfirmedAppointments] = useState <AppointmentFull[]>([]); //get confirmed appointments of a doctor

  const [selectedAppointment, setSelectedAppointment] = useState<number>(0); //state of review box
    const [selApp, setSelApp] = useState<number>(0); //marks the selected appointment
  
 var selectedAppObj = confirmedAppointments.find(app => app.id === selApp);
   useEffect(() => {
   const fetchDoctor = async () => {
     if (user?.userId) {  
       try {
         console.log("user id:"+user.userId);
             const response = await getDoctorByUserId(user.userId); //also need TO FILTER TO GET CONFIRMED ONES!!!!!!!
         setDoctor(response.data); 
         console.log(response.data);
       } catch (error) {
         console.error("Error fetching assistant:", error);
       }
     }
   };  
   fetchDoctor();
 
 }, [user?.userId])

      const formatDate = (date: Date) => {
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Bucharest'
  }).replace(',', ''); 
};

   const updateAppointmentMessageHere = async(appointmentId: number, message: string) =>{

    const response = await updateAppointmentMessage(appointmentId, message);
    const response2 = await updateAppointmentStatus(appointmentId, "Status Written");
      
       if (doctor?.doctorId) {
    const apps = await getAppointmentsByDoctorId(doctor.doctorId);
        if (apps!=undefined)
   { const confirmed = apps.filter(a => a.status === "Confirmed");
    setConfirmedAppointments(confirmed);}
  }

  setSelectedAppointment(0);
  setSelApp(0);

   }


 useEffect(() =>{
    const fetchAppointments = async () => {
      
       try {
              if (!doctor)
                return null;
 
             const writtenapps = await getAppointmentsByDoctorId(doctor?.doctorId);
              console.log(writtenapps);
             if (writtenapps)
               {
                const confirmed = writtenapps.filter(a => a.status === "Confirmed");
                  setConfirmedAppointments(confirmed);
               }
 
              
           
       }catch (error)
         {
           console.log("couldnt fetch pending appointments!");
         }
 
   };
   fetchAppointments(); //need to recall pending appointments after declining or accepting one!
 }, [doctor?.doctorId]);




 if (!user) return null; 


  return (
     <section className="h-full bg-darkBlue flex flex-col overflow-hidden">
      <div className="flex-1 flex justify-center">
        <div className="bg-gray-100 w-7/12 flex flex-col p-4"> 
        
          <br></br>
          <UserInfo userRole="doctor" userName={user.name} />
   <br></br>
      <h5 className="mb-4 font-semibold text-lg text-center text-darkBlue"> Provide Patients with appointment prescriptions and follow-ups:</h5>



        
      <div className="flex justify-center">
       <select
  value={selApp === 0 ? "" : selApp}
  onChange={e => {
    setSelectedAppointment(1);
    setSelApp(Number(e.target.value));
  }} className="select select-bordered w-full py-2 border-4 text-center max-w-[500px] justify-center"defaultValue=""><option value="" disabled>Select a written appointment</option>
                              {
                                confirmedAppointments.map(app =>
                                    <option key={app.id} value = {app.id} >
                                      {app.patientName} {' ('}
                                             {  formatDate(new Date (app.appointmentDateTime))}      {' )'}

                                    </option>
                                )

                              }
                              </select>

      </div>

                              <br/>
            <GivePresciptionBox state={selectedAppointment} onUpdate={updateAppointmentMessageHere}
       stateChanged={setSelectedAppointment}  appointment={selectedAppObj}  />















            </div>
      </div>
    </section>
  )
}

export default DoctorDashboard