import React from 'react'
import { AppointmentFull } from '../../types/appointment'
import PendingAppointment from './PendingAppointment';

interface Props  {

  appointmentsList: AppointmentFull[] | undefined;
  updatePendingAppointments: (appointmentId: number, status: string) =>void;
}

const PendingAppointmentsList = (props: Props) => {


  if (!props.appointmentsList)
    return null;

  return (
  <div className="w-full border-2 border-black bg-gray-200 px-6 py-6 rounded-xl">
      <h4 className="mb-4 font-semibold text-lg">Pending Appointments:</h4>

      <div className="flex flex-col gap-2 min-h-[350px] h-80 overflow-y-auto">

       <div >
          {props.appointmentsList.length > 0 ? (
        props.appointmentsList.map((result) => {
          return (
            <PendingAppointment appointmentNumber={result.id}  key={result.id}
              appointment={result} onUpdate={props.updatePendingAppointments}
            />
          );
        }) ) : 

      (<p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
          No pending appointments!
        </p>
      )}

       </div>
     
      </div>
    </div>
  )
}

export default PendingAppointmentsList