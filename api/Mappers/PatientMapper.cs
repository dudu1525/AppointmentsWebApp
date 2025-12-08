using api.Dtos.Patient;
using api.Models;

namespace api.Mappers
{
    public static class PatientMapper
    {
        public static User ToUserFromCreateDto(this CreatePatientDto patientDto)
        {
            return new User
            {   Name= patientDto.Name,
                UserName = patientDto.UserName,
                Email = patientDto.Email,
                Password = patientDto.Password,
                Role = "Patient"
            };
        }


        public static PatientDetailsDto ToPatientDetailsDto(this Patient patientModel)
        {
            return new PatientDetailsDto
            {   UserId = patientModel.User.Id,
                MedicalRecord = patientModel.MedicalRecord,
                Name= patientModel.User.Name,
                PatientId = patientModel.PatientId,
                UserName = patientModel.User.UserName,
                Email = patientModel.User.Email,
                //Appointments = patientModel.Appointments
            };
        }
    }

}