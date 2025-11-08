




using api.Dtos.Doctor;
using api.Models;

namespace api.Mappers
{
    
    public static class DoctorMappers
    {
         public static DoctorDetailsDto ToDoctorDetailsDto(this Doctor doctorModel)
        {
            return new DoctorDetailsDto
            {
                DoctorId = doctorModel.DoctorId,
                DoctorName = doctorModel.User?.UserName,
                Email = doctorModel.User?.Email,
                Type = doctorModel.Type,
                ClinicId = doctorModel.ClinicId,

                Appointments = doctorModel.Appointments
                .Select(a => a.ToAppointmentSummaryDto())
                .ToList()
            };
        }
       
    
    public static User ToUserFromCreatedDto(this CreateDoctorDto createddoctorDto)
        {
            return new User
            {
                UserName = createddoctorDto.DoctorName,
                Email = createddoctorDto.DoctorEmail,
                Password = createddoctorDto.Password,
                Role = "Doctor"
            };
        }

       


    }



}