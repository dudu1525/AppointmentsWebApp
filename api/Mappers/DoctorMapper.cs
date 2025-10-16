




using api.Dtos.Doctor;
using api.Models;

namespace api.Mappers
{
    
    public static class DoctorMappers
    {
        public static Doctordto ToDoctorDto(this Doctor doctorModel)//send this to the interface, the user doesent need to see the whole doctor structure
        {
            return new Doctordto
            {
                Id = doctorModel.Id,
                DoctorName = doctorModel.DoctorName,
                ClinicId = doctorModel.ClinicId,
                Type = doctorModel.Type
            };
        }

        public static Doctor ToDoctorFromRegister(this DoctorRegisterDto doctorDto, int clinicId)
        {//transform this from a standard Dto, given by the user input to a Doctor object that can be stored inside the database
            return new Doctor
            {
                DoctorName = doctorDto.DoctorName,
                Password = doctorDto.Password,
                ClinicId = clinicId,
                Type = doctorDto.Type
            };
        }

       


    }



}