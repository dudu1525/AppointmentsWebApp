export type updatePatientDto = {
userName: string;
name: string;
email: string;
medicalRecord?: string;


}

export type updateDoctorDto = {
userName: string;
name: string;
email: string;
type: string;
clinicId?: number;


}

export type updateAssistantDto = {
userName: string;
name: string;
email: string;
clinicId?: number;


}