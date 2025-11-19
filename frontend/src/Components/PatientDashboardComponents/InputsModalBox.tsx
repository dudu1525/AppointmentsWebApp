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
            <input
              type="text"
              placeholder=" Annual Checkup"
              className="input input-bordered w-full"
            />
            <div className="modal-action mt-6">
              <button className="btn" onClick={handleNext}>Next</button>
            </div>
          </div>
        );
      
      case 2:
        return (
            <div>
                <h3 className="font-bold text-lg">Step 2: Coming Soon!</h3>
                <div className="modal-action mt-6">
              <button className="btn" onClick={handleNext}>Next</button>
                </div>
            </div>
        );
        case 3:
        return (
            <div>
                <h3 className="font-bold text-lg">Step 2: Coming Soon  2222!</h3>
                <div className="modal-action mt-6">
              <button className="btn" onClick={handleNext}>Next</button>
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