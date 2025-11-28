export interface AppointmentShort {
  id: number; 
  date: Date;
  patientId: number;
  doctorId: number;
  message: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled'; //will add more
}

export type UserProfileToken = {
name: string;
userName: string;
email: string;
role: string;
token: string;
userId: number;


}


export type User ={
  name: string;
  userName: string;
  email: string;
  role: string;
  userId: number;

}

//will pass this to appointment simple