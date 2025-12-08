//when getting all patients
export type PatientDetailsDto = {
  userId: number;
  patientId: number;
  name: string;
  userName: string;
  email: string;
  medicalRecord?: string;
}

