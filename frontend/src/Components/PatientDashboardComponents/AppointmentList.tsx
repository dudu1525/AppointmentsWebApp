import React from 'react'
import AppointmentSimple from './AppointmentSimple'

type Props = {}

const AppointmentList = (props: Props) => {
  return (
    <div className="w-full border-2 border-black bg-gray-200 px-6 py-6 rounded-xl">
      <h4 className="mb-4 font-semibold text-lg">Appointments History</h4>

      <div className="flex flex-col gap-2 min-h-[350px]">

        <AppointmentSimple />
        <AppointmentSimple />
        <AppointmentSimple />
     
     
      </div>
    </div>
  );
};

export default AppointmentList