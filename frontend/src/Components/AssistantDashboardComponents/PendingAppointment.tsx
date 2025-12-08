import React from 'react'
import { AppointmentFull } from '../../types/normalTypes'

interface Props  {
  appointmentNumber: number;
  appointment: AppointmentFull | null;

  onUpdate: (appointmentId: number, status: string) =>void;
}

const PendingAppointment = (props: Props) => {

  if (!props.appointment)
    return null;
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


  return (
   <div className="grid grid-cols-4 p-2 items-center bg-gray-50 rounded-lg shadow-sm m-4">
  <div>
    <p className="font-medium">
      Patient: <span className="font-normal">{props.appointment.patientName}</span>
    </p>
  </div>

  <div>
    <p className="font-medium">
      Doctor: <span className="font-normal">{props.appointment.doctorName}</span>
    </p>
  </div>

  <div>
    <p className="font-medium">
      Date:{" "}
      <span className="font-normal">
        {  formatDate(new Date (props.appointment.appointmentDateTime))}
      </span>
    </p>
  </div>

  <div className="flex justify-end space-x-3">
    <button className="px-2 py-2 border border-green-500 text-green-600 rounded-md hover:bg-green-50 transition"
       onClick={() => props.onUpdate(props.appointment!.id, "Confirmed")}
       >
      Accept
    </button>

    <button className="px-2 py-2 border border-red-500 text-red-600 rounded-md hover:bg-red-50 transition"
           onClick={() => props.onUpdate(props.appointment!.id, "Declined")}
           >
      Decline
    </button>
  </div>
</div>
  )
}

export default PendingAppointment