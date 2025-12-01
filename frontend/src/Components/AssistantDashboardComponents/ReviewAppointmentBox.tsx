import React from 'react'

type Props = {}

const ReviewAppointmentBox = (props: Props) => {
  return (
  <div className="w-full border-2 border-black bg-gray-200 px-6 py-6 rounded-xl">
    

      <div className="flex flex-col gap-2 min-h-[200px] h-80 overflow-y-auto">

       <div>
        <p>No Appointment Selected!</p>
       </div>


     
      </div>
    </div>
  )
}

export default ReviewAppointmentBox