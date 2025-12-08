import React, { useEffect, useState } from 'react'; // <-- Make sure to import useState
import { ClinicDetailed } from '../../types/normalTypes';
import { createAppointment, getHoursPerDayAvailable } from '../../Services/AppointmentService';

interface Props {
    visible: boolean;
    onClose: () => void;    
    clinics: ClinicDetailed[];
}
const token = localStorage.getItem("token");
const InputsModalBox = (props: Props) => {
//for stepping the input box
  const [step, setStep] = useState(1);
    ///for doctor and clinic
   const [selectedClinicId, setSelectedClinicId] = useState<number | "">("");
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | "">("");

  const selectedClinic = props.clinics.find(c => c.id === selectedClinicId);
  const doctors = selectedClinic?.doctors ?? [];
  //for date
const [selectedDate, setSelectedDate] = useState<string>("");

const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
const [availableSlots, setAvailableSlots] = useState<string[]>([]);
const timeSlots = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00",];

///const dateTimeForApi = selectedDate ? `${selectedDate}` : null;

   useEffect(() => {
    if (props.visible === false) {
      setStep(1);
    }




  }, [props.visible]);

  useEffect(() => {
  const fetchAvailableSlots = async () => {
    if (!selectedDate || !selectedDoctorId) return; 

    try {

       const dateObj = new Date(selectedDate);
            const bookedHours = await getHoursPerDayAvailable(
                selectedDoctorId as number, 
                dateObj
            );
            
            setAvailableSlots(bookedHours ?? []);
             setSelectedTimeSlot("");


    } catch (err) {
      console.error("Error fetching time slots", err);
      setAvailableSlots([]);
    }
  };

  fetchAvailableSlots();
}, [selectedDate, selectedDoctorId]);  //<<signals?


    const createAppointmentUI = async ()=>{
      if (!selectedDate || !selectedClinic || !selectedTimeSlot || !selectedDoctorId ) return;

      try{

        const appointmentDateTime = `${selectedDate}T${selectedTimeSlot}:00`;
         
          const response = await createAppointment(selectedDoctorId,appointmentDateTime,token! );

          console.log("Created appointment:"+ response);

      } catch (error){
        console.log ("Could not create Appointment!");
         throw error;
      }

    }


  const handleNext = () => {
    
    setStep(step+1); 
  };

  const createDate = () =>{


  }

  if (props.visible==false)
  {
    return null;
  }


  const renderWindow = () => { //mocks
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="font-bold text-lg">Step 1: Reason for Visit</h3>
            <p className="py-4">Please enter the reason you are booking an appointment.</p>
           <textarea
             placeholder="Input Reasons"
             className="textarea textarea-bordered w-full min-h-24 py-4 border-4"
            />
            <div className="modal-action mt-6">
              <button className="btn" onClick={handleNext}>Next</button>
            </div>
          </div>
        );
      
      case 2:
        return (
            <div>
                <h3 className="font-bold text-lg">Step 2: Select desired clinic and doctor</h3>
                          <br></br> 
                    <select  onChange={e => setSelectedClinicId(e.target.value === "" ? "" : Number(e.target.value)) }
                        className="select select-bordered w-full py-2 border-4"defaultValue=""><option value="" disabled>Select a clinic</option>
                          {props.clinics.map(clinic => (
                     <option key={clinic.id} value={clinic.id}>
                      {clinic.name} ({clinic.location})
                         </option>
            ))}
                              </select>
                   <hr></hr>
                   <br></br> 
                       <select onChange={e => setSelectedDoctorId(e.target.value === "" ? "" : Number(e.target.value))}
                        className="select select-bordered w-full py-2 border-4"defaultValue=""><option value="" disabled>Select a doctor</option>
                             {doctors.map(doctor => (
                     <option key={doctor.doctorId} value={doctor.doctorId}>
                       {doctor.user.name}{' - '} {doctor.type}
                       </option>
                                  ))}
                              
                              </select>           


                <div className="modal-action mt-6">
              <button className="btn" onClick={handleNext} disabled={!selectedClinicId || !selectedDoctorId}>Next</button>
                </div>
            </div>
        );
        case 3:
        return (
            <div>
                <h3 className="font-bold text-lg">Step 3: Choose a day and hour</h3>
                <br></br> 
                <input
             type="date"
                    className="input input-bordered w-full border-4 border-black"
                     value={selectedDate}
                 onChange={(e) =>{ setSelectedDate(e.target.value);
                  console.log(e.target.value);}}
                 min={new Date().toISOString().split("T")[0]}/>

                        <br></br>     
                    <br></br> 
                    <select
                       className="select select-bordered w-full py-2 border-4"
                        value={selectedTimeSlot}
                             onChange={(e) =>{ setSelectedTimeSlot(e.target.value);
                                                console.log("time:"+e.target.value);}}
                                          >
                            <option value="" disabled>
                                        Select an hour
                                            </option>

                                    {timeSlots.map((slot) => (
                                        <option
                                          key={slot}
                                            value={slot}
                                        disabled={availableSlots.includes(slot)} >
                                          {slot} {availableSlots.includes(slot) ? "(Booked)" : ""}
                                            </option>))}
                                           
                              </select>  
                        <br></br> 


                    <br></br> 
                <div className="modal-action mt-6" >
              <button className="btn  border-2 border-black p-2" onClick={() => {
                                                                       createAppointmentUI();
                                                                          props.onClose();
                                                                                             }}
                disabled={!selectedDate || !selectedTimeSlot}>Book Appointment!</button>
                </div>
            </div>
        );

      default:
        return null;
    }
  };


return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative">
        <button  onClick={props.onClose}  className="btn btn-sm btn-circle absolute right-2 top-2">✕ </button>
         {renderWindow()}
      </div>
    </div>
  );
};


export default InputsModalBox;