import { StringLiteral } from "typescript";


export type UserProfileToken = {
name: string;
userName: string;
email: string;
role: string;
token: string;
userId: number;
}
export type AssistantSimple = {
assistantUserName: string;
assistantId: number;
assistantName: string;
assistantEmail: string;
clinicId: number;



}
export type ClinicDetailed = {
id: number;
name: string;
location: string;
doctors: Doctor[];
assistants: AssistantSimple[];

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
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Status Written' | 'Status Given';
}
//writeen is by the doctor
//given is by the assistant


export type Doctor = {
  doctorId: number;
  userId: number;
  clinicId?: number | null;
  type: string;

  clinic?: ClinicDetailed | null;
  user: User;
  appointments: Appointment[];


}


export type AssistantDetailed = {
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

export type AppointmentFull = {
id: number;
appointmentDateTime: Date;
status: string;
message: string;
doctorId: number;
doctorName: string;
doctorType: string;
patientId: number;
patientName: string;


}
