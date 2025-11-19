import React from 'react'

interface Props {
    userRole: string // patient, doctor, assistant, admin
  userName: string 
}

const UserInfo = (props: Props) => {

    const getLeftText = () => {
    switch(props.userRole) {
      case 'patient':
        return 'My Appointments'
      case 'doctor':
        return 'Patient Schedule'
      case 'admin':
        return 'Admin Dashboard'
      case 'assistant':
        return "Manage Appointments"
      default:
        return 'Dashboard'
    }
  }

  return (

     <div className="w-full flex items-center justify-between border-2 border-black bg-gray-200 px-6 py-6">
      <span className="text-black font-medium">{getLeftText()}</span>
      <span className="text-black font-medium">{props.userName}</span>
    </div>
  )
}

export default UserInfo