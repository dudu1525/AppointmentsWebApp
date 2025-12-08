import axios from "axios"
import { Appointment, AppointmentFull, UserProfileToken } from "../types/normalTypes";



const api = "http://localhost:5159/api";


export const createAppointment = async (doctorId: number, date: string, token:string) =>{

    try {
        const dataToSend = await axios.post<Appointment>(api + "/appointments",{
            doctorId: doctorId,
            appointmentDateTime: date,
        }, {headers:{
            Authorization: `Bearer ${token}`
        }})

      console.log("Appointment created:", dataToSend.data);
    return dataToSend.data; 
    }catch (error)
    {
         
        console.log("Something went wrong while creatign appointment!");
        console.log("Sending to server:", {
         doctorId,
             appointmentDateTime: date,
                });
        throw error;
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

export const getAppointmentsByClinicAndStatus = async (clinicId: number, status: string) =>{

    try {
        const response = await axios.get<AppointmentFull[]>(`${api}/appointments/clinic/status/${clinicId}?status=${status}`);


            console.log("Appointments for clinic: ", response.data);
                     return response.data; 

   }catch (error)
        {     
             console.log("Wrong when fetching clinic appointments!");
          
        }

}


export const updateAppointmentStatus = async (appointmentId: number, status: string) =>{

    try {
            const response = await axios.put<AppointmentFull>(
                `${api}/appointments/updateStatus/${appointmentId}`,
                  JSON.stringify(status),  
                 {
                  headers: {
          'Content-Type': 'application/json'  
                 }
                 }
                );

            return response.data;

    }catch(error)
    {
        console.log("error updating appointment status");
    }

}

export const updateAppointmentMessage = async (appointmentId: number, message: string) =>{

    try {
           const response = await axios.put<AppointmentFull>(
                `${api}/appointments/updateMessage/${appointmentId}`,
                  JSON.stringify(message),  
                 {
                  headers: {
          'Content-Type': 'application/json'  
                 }
                 }
                );

            return response.data;

    }catch(error)
    {
        console.log("error updating appointment message");
    }

}

export const getAppointmentsByDoctorId = async (doctorId: number) =>{


    try {
        const response = await axios.get<AppointmentFull[]>(`${api}/appointments/doctorget/${doctorId}`);


            console.log("Appointments for doctor: ", response.data);
                     return response.data; 


    } catch (error)
    {
        console.log("Error getting appointments by doctor id!");
    }
}