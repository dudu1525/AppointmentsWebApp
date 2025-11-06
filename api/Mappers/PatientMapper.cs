using api.Dtos.Patient;
using api.Models;

namespace api.Mappers
{
    public static class PatientMapper
    {
        public static User ToUserFromCreateDto(this CreatePatientDto patientDto)
        {
            return new User
            {
                UserName = patientDto.UserName,
                Email = patientDto.Email,
                Password = patientDto.Password,
                Role = "Patient"
            };
        }


        public static PatientDetailsDto ToPatientDetailsDto(this Patient patientModel)
        {
            return new PatientDetailsDto
            {
                PatientId = patientModel.PatientId,
                UserName = patientModel.User.UserName,
                Email = patientModel.User.Email
            };
        }
    }

}