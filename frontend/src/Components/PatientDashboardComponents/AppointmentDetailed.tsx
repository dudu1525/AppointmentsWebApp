import React from 'react'
import { Appointment } from '../../types/appointment';

type Props = {
    componentVisible: boolean;
    onClose:() => void;
    appointment: Appointment;
    doctor: string | undefined;
    clinic: string | undefined;

}

const AppointmentDetailed = (props: Props) => {

    

    if (props.componentVisible==false)
        return null;

  return (
   <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-10 w-full max-w-2xl min-h-[700px] min-w-[900px] relative">

        <button  onClick={props.onClose}  className="btn btn-sm btn-circle absolute right-2 top-2">✕ </button>

      
      <h2>
            Detailed View of Appointment - {props.appointment.id}
      </h2>

      <br></br>

            <div className="border-2 border-black p-4">
            <h3> Status: {props.appointment.status} </h3>
            <br></br>
         <h3> Clinic:  {props.clinic} </h3>
        <br></br>
        <h3> Doctor: {props.doctor} </h3>
          </div>

          <br></br>

         <div className="border-2 border-black p-4 min-h-[400px]">
        <h3> Diagnosis and Reccomendations</h3>
            <br></br>
              <div>
            { props.appointment.status==="Status Given" ? (

              <p> {props.appointment.message}</p>

            ) : (
                <p>
                    Patient cannot see yet the review of the doctor.
                  </p>

            )}
            </div>
     
        </div> 





      </div>
    </div>
  )
}

export default AppointmentDetailed