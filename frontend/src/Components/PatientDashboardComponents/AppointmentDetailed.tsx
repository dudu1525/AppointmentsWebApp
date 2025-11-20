import React from 'react'

type Props = {
    componentVisible: boolean;
    onClose:() => void;

}

const AppointmentDetailed = (props: Props) => {

    

    if (props.componentVisible==false)
        return null;

  return (
   <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-10 w-full max-w-2xl min-h-[700px] min-w-[900px] relative">

        <button  onClick={props.onClose}  className="btn btn-sm btn-circle absolute right-2 top-2">✕ </button>

      
      <h2>
            Detailed View of Appointment X
      </h2>

      <br></br>

            <div className="border-2 border-black p-4">
            <h3> Status: </h3>
            <br></br>
         <h3> Clinic: +clinic name </h3>
        <br></br>
        <h3> Doctor: +doctorname</h3>
          </div>

          <br></br>

         <div className="border-2 border-black p-4 min-h-[400px]">
        <h3> Diagnosis and Reccomendations</h3>
            <br></br>
          <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type
         specimen book. It has survived not only five centuries, but also the leap into 
         electronic typesetting, remaining essentially unchanged. It was popularised in
     the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
     and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.


          </p>
        </div> 





      </div>
    </div>
  )
}

export default AppointmentDetailed