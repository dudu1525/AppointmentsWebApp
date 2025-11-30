import { StringLiteral } from "typescript";


export type UserProfileToken = {
name: string;
userName: string;
email: string;
role: string;
token: string;
userId: number;
}

export type ClinicDetailed = {
id: number;
name: string;
location: string;
doctors: Doctor[];
assistants: Assistant[];

}

export type ClinicSimple = {
  id: number;
  name: string;
  location: string;
}

export type DoctorAndClinic = {
doctorUserName: string;
doctorId: number;
doctorName: string;
email: string;
type: string;
clinicName: string;


}


export type  Appointment = {
  id: number;
    appointmentDateTime: Date;
   patientId: number;
  doctorId: number;
  message: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Status Given';
}



export type Doctor = {
  doctorId: number;
  userId: number;
  clinicId?: number | null;
  type: string;

  clinic?: ClinicDetailed | null;
  user: User;
  appointments: Appointment[];


}


export type Assistant = {
id: number;
  userId: number;
  clinic?: ClinicDetailed | null;
  user: User;


}


export type User ={
  name: string;
  userName: string;
  email: string;
  role: string;
  userId: number;

}


//will pass this to appointment simple

export type Patient  = {
  patientId: number;
  userId: number;
 userName: string;
 name: string;
 email: string;
 appointments: Appointment[];

}
