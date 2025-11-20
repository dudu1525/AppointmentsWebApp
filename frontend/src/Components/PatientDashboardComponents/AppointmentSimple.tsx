import React, { useState } from 'react'
import AppointmentDetailed from './AppointmentDetailed';

interface Props {


};

const AppointmentSimple = (props: Props) => {

      const [isDetailedOpen, setDetailedListOpen] = useState(false);
      
  return (
    <>
   
      <div className="flex w-full items-center justify-between rounded-lg bg-slate-100 px-4 py-3 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-32">
          <p className="font-medium text-slate-900">Doctor:</p>
          <p className="text-sm text-slate-600">Clinic:</p>
          <p className="text-sm text-slate-700">Date:</p>
        </div>

        <button
          className="btn btn-sm btn-outline"
          onClick={() => setDetailedListOpen(true)} 
        >
          Details
        </button>
      </div>


      <AppointmentDetailed
        componentVisible={isDetailedOpen}
        onClose={() => setDetailedListOpen(false)}   
      />
    </>
  );
}

export default AppointmentSimple