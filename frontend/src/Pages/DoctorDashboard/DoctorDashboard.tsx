import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/UserAuth';
import { DoctorSimple } from '../../types/appointment';
import { getDoctorByUserId } from '../../Services/DoctorService';
import UserInfo from '../../Components/UserInfoComponent/UserInfo';

interface Props  {


}

const DoctorDashboard = (props: Props) => {

const {user} = useAuth();
 const [doctor, setDoctor] = useState<DoctorSimple | undefined>();

   useEffect(() => {
   const fetchDoctor = async () => {
     if (user?.userId) {  
       try {
         console.log("user id:"+user.userId);
             const response = await getDoctorByUserId(user.userId);
         setDoctor(response.data); 
         console.log(response.data);
       } catch (error) {
         console.error("Error fetching assistant:", error);
       }
     }
   };  
   fetchDoctor();
 
 }, [user?.userId])




 if (!user) return null; 


  return (
     <section className="h-full bg-darkBlue flex flex-col overflow-hidden">
      <div className="flex-1 flex justify-center">
        <div className="bg-gray-100 w-7/12 flex flex-col p-4"> 
        
          <br></br>
          <UserInfo userRole="doctor" userName={user.name} />
   <br></br>
      <h5 className="mb-4 font-semibold text-lg text-center text-darkBlue"> Provide Patients with appointment prescriptions and follow-ups:</h5>


            </div>
      </div>
    </section>
  )
}

export default DoctorDashboard