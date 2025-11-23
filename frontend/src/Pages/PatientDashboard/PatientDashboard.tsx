import React, { useState } from 'react'
import UserInfo from '../../Components/UserInfoComponent/UserInfo'
import { Link } from 'react-router-dom'
import InputsModalBox from '../../Components/PatientDashboardComponents/InputsModalBox'
import AppointmentList from '../../Components/PatientDashboardComponents/AppointmentList'
import AppointmentDetailed from '../../Components/PatientDashboardComponents/AppointmentDetailed'
import { useAuth } from '../../Context/UserAuth'


interface Props  {}

const PatientDashboard = (props: Props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

 
  return (
      <section className="h-full bg-darkBlue flex flex-col overflow-hidden">
      <div className="flex-1 flex justify-center">
        <div className="bg-gray-100 w-7/12 flex flex-col p-4"> 
          <br></br>
          <UserInfo userRole="patient" userName="John" />
 <br></br> <br></br>


          <button className="self-start      /*no stretch */
              mt-4           /* FOR SPACE */
              inline-block  px-8 py-3 font-bold rounded text-white bg-darkBlue hover:opacity-90 ml-4"
              onClick={() => setIsModalOpen(true)}
          >
            Book an Appointment
          </button>




 <br></br>  <br></br> 
          <InputsModalBox visible={isModalOpen}  onClose={() => setIsModalOpen(false)}  />



       <div className="py-6">           
                  <AppointmentList/>
     </div>


            
       


        </div>
      </div>
    </section>

  )
}

export default PatientDashboard