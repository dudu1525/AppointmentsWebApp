import React, { useState } from 'react'
import UserInfo from '../Components/UserInfoComponent/UserInfo';
import { useAuth } from '../Context/UserAuth';
import AdminMainContent from '../Components/AdminMainContent';

interface Props {

    
}

const AdminDashboard = (props: Props) => {

  const [currentPage, setCurrentPage]=useState<number>(0);//0 through 5
  const {user} = useAuth();

  //manage users=0, manage patients, manage doctors, manage assistants, manage clinics, manage appointments

  if (user==null)
    return (<></>);
const getLabel = (i: number): string => {
  switch(i) {
    case 0: return "Manage Users";
    case 1: return "Manage Patients";
    case 2: return "Manage Doctors";
    case 3: return "Manage Assistants";
    case 4: return "Manage Clinics";
    case 5: return "Manage Appointments";
    default: return "";
  }
};
  return (
    <section className="h-full bg-darkBlue flex flex-col overflow-hidden">
      <div className="flex-1 flex justify-center">
        <div className="bg-gray-100 w-7/12 flex flex-col p-4"> 

   
          <UserInfo userRole="admin" userName={user.name} />
          <br></br>

      <div className="flex gap-3">
  {[0, 1, 2, 3, 4, 5].map((i) => (
    <button key={i} onClick={() => setCurrentPage(i)} className={"px-3 py-2 rounded-md border-2 " +
        (currentPage === i ? "bg-darkBlue text-white": "bg-white border-gray-400 text-gray-700 hover:bg-gray-200")}>
            {getLabel(i)}
    </button>
  ))}
    </div>
  <br></br>




        <AdminMainContent currentState={currentPage}/>








          </div>
      </div>
    </section>
  )
}

export default AdminDashboard