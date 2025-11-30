




using api.Dtos.Doctor;
using api.Models;

namespace api.Mappers
{
    
    public static class DoctorMappers
    {
         public static DoctorDetailsDto ToDoctorDetailsDto(this Doctor doctorModel)
        {
            return new DoctorDetailsDto
            {   DoctorUserName = doctorModel.User?.UserName,
                DoctorId = doctorModel.DoctorId,
                DoctorName = doctorModel.User?.Name,
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
            {   Name = createddoctorDto.DoctorName,
                UserName = createddoctorDto.DoctorUserName,
                Email = createddoctorDto.DoctorEmail,
                Password = createddoctorDto.Password,
                Role = "Doctor"
            };
        }

    public static DoctorSimpleDto ToDoctorSimpleDto(this Doctor doctorOriginal)
        {
            return new DoctorSimpleDto
            {   DoctorUserName = doctorOriginal.User.UserName,
                 DoctorName = doctorOriginal.User.Name,
                DoctorId = doctorOriginal.DoctorId,
                Email = doctorOriginal.User.Email,
                Type = doctorOriginal.Type,
                ClinicName = doctorOriginal.Clinic.Name,


                 
                    

            };

        }

       


    }



}