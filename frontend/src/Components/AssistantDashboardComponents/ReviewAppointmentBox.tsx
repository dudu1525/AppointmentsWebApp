import React, { useEffect, useState } from 'react'
import { AppointmentFull } from '../../types/normalTypes';

interface Props  {
state: number | "";
 onUpdate: (appointmentId: number, message: string) =>void;
 stateChanged: (nextState: number) =>void;
 appointment: AppointmentFull | undefined;
}

const ReviewAppointmentBox = (props: Props) => {


const [message, setMessage] = useState(props.appointment?.message ?? "");


  useEffect(() => {
  if (props.appointment) {
    setMessage(props.appointment.message ?? "");
  }
}, [props.appointment]);

if (props.appointment==undefined)
    return null;


  
const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault(); 
      if (props.appointment==undefined)
    return null;
  await props.onUpdate(props.appointment.id, message);  
  props.stateChanged(1); 
};

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
  
  const renderWindow = () =>  {
      if (props.appointment !==undefined)
      { 
        switch(props.state)
       {
          case 0:
            return (
                 <div><p>No appointment selected!</p></div>

            );

            case 1: //one appointment selected
            return (
    <div className="space-y-4">

      <div className="bg-white p-4 rounded-lg shadow">
        <p className="font-semibold text-gray-700">
          Patient: <span className="font-normal">{props.appointment.patientName}</span>
        </p>
        <p className="font-semibold text-gray-700">
          Doctor: <span className="font-normal">{props.appointment.doctorName}</span>
        </p>
        <p className="font-semibold text-gray-700">
          Date: <span className="font-normal">
            {formatDate(new Date(props.appointment.appointmentDateTime))}
          </span>
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg shadow">
        <p className="font-semibold text-gray-700 mb-2">Prescription:</p>
        <p className="text-gray-800 whitespace-pre-line">
          {props.appointment.message}
        </p>
      </div>

      <button
        onClick={() => props.stateChanged(2)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Review
      </button>
    </div>
  );

            case 2: //modify selected
            return (
    <div className="space-y-4">

      <div className="bg-white p-4 rounded-lg shadow">
        <p className="font-semibold text-gray-700">
          Patient: <span className="font-normal">{props.appointment.patientName}</span>
        </p>
        <p className="font-semibold text-gray-700">
          Doctor: <span className="font-normal">{props.appointment.doctorName}</span>
        </p>
        <p className="font-semibold text-gray-700">
          Date: <span className="font-normal">
            {formatDate(new Date(props.appointment.appointmentDateTime))}
          </span>
        </p>
      </div>

      <form className="space-y-3">
        <label className="block font-semibold text-gray-700">
          Edit Prescription:
        </label>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-40 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Submit change
        </button>
      </form>
    </div>
  );

          case "":
            return (
               <div><p>No appointment selected!</p></div>


            );
          default:
            return (<div><p>No appointment selected!</p></div>);
       };  }

    else
      return null;
      };


  return(
      <div className="w-full border-2 border-black bg-gray-200 px-6 py-6 rounded-xl">
      <div className="flex flex-col gap-2 min-h-[200px] h-80 overflow-y-auto">
        {renderWindow()}
      </div>
    </div>
  );
}

export default ReviewAppointmentBox