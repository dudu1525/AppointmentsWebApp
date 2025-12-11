//when getting all patients
export type PatientDetailsDto = {
  userId: number;
  patientId: number;
  name: string;
  userName: string;
  email: string;
  medicalRecord?: string;
}


export type DoctorDetailsDto = {
doctorUserName: string;
doctorId: number;
doctorName: string;
email: string;
type: string;
clinicId?: number;


}

export type AssistantDetailsDto = {
assistantId: number;
assistantName: string;
assistantUserName: string;
assistantEmail: string;
clinicId?: number;

}

