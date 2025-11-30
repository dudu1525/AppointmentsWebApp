import axios from "axios"
import { Appointment, UserProfileToken } from "../types/appointment";



const api = "http://localhost:5159/api";


export const createAppointment = async (doctorId: number, date: Date) =>{

    try {
        const dataToSend = await axios.post<Appointment>(api + "/appointments",{
            doctorId: doctorId,
            appointmentDateTime: date.toISOString(),
        })

      console.log("Appointment created:", dataToSend.data);
    return dataToSend.data; 
    }catch (error)
    {
        console.log("Something went wrong while creatign appointment!");
    }

}


export const getHoursPerDayAvailable = async (doctorId:number, date: Date) =>{

        try {
               const response = await axios.get<string[]>(`${api}/appointments/doctor/${doctorId}/day`, {
                params: {
                      selectedDate: date.toISOString().split('T')[0]
                         }})

            console.log("Appointments at hours:", response.data);
                     return response.data; 
        }catch (error)
        {
             console.log("Something went wrong while fetching hours for appointments in a day!");
        }



}

export const getAppointmentsForPatient = async (patientId: number) =>{

    try {
        const response = await axios.get<Appointment[]>(`${api}/appointments/patient/${patientId}`)


            console.log("Appointments for patient: ", response.data);
                     return response.data; 

   }catch (error)
        {
             console.log("Wrong when fetching patient appointments!");
        }

}