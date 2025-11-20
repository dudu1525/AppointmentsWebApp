import React, { useEffect, useState } from 'react'; // <-- Make sure to import useState

interface Props {
    visible: boolean;
    onClose: () => void;    
}

const InputsModalBox = (props: Props) => {

  const [step, setStep] = useState(1);

   useEffect(() => {
    if (props.visible === false) {
      setStep(1);
    }
  }, [props.visible]);

  const handleNext = () => {
    
    setStep(step+1); 
  };

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
                    <select
                        className="select select-bordered w-full py-2 border-4"defaultValue=""><option value="" disabled>Select a clinic</option>
                            <option value="reason1">Reason 1</option>
                             <option value="reason2">Reason 2</option>
                              <option value="reason3">Reason 3</option></select>
                   <hr></hr>
                   <br></br> 
                       <select
                        className="select select-bordered w-full py-2 border-4"defaultValue=""><option value="" disabled>Select a doctor</option>
                            <option value="reason1">Reason 1</option>
                             <option value="reason2">Reason 2</option>
                              <option value="reason3">Reason 3</option></select>           


                <div className="modal-action mt-6">
              <button className="btn" onClick={handleNext}>Next</button>
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
                 min={new Date().toISOString().split("T")[0]}/>

                        <br></br>     
                    <br></br> 
                    <select
                        className="select select-bordered w-full py-2 border-4"defaultValue=""><option value="" disabled>Select an hour</option>
                            <option value="reason1">Reason 1</option>
                             <option value="reason2">Reason 2</option>
                              <option value="reason3">Reason 3</option></select>  
                        <br></br> 


                    <br></br> 
                <div className="modal-action mt-6" >
              <button className="btn  border-2 border-black p-2" onClick={props.onClose}>Book Appointment!</button>
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