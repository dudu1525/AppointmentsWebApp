import React from 'react'
import AppointmentSimple from './AppointmentSimple'
import { Appointment } from '../../types/appointment';

type Props = {

  appointments: Appointment[] | [];
}

const AppointmentList = (props: Props) => {

  
  return (
    <div className="w-full border-2 border-black bg-gray-200 px-6 py-6 rounded-xl">
      <h4 className="mb-4 font-semibold text-lg">Appointments History</h4>

      <div className="flex flex-col gap-2 min-h-[350px] h-80 overflow-y-auto">

         {props.appointments.length > 0 ? (
        props.appointments.map((result) => {
          return (
            <AppointmentSimple
              appointment={result}
            />
          );
        }) ) : 

      (<p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
          No results!
        </p>
      )}
     
      </div>
    </div>
  );
};

export default AppointmentList