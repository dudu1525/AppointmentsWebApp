using api.Dtos.Clinic;
using api.Models;
using api.Mappers;

namespace api.Mappers
{
    
    public static class ClinicMapper
    {
         public static ClinicDetailsDto ToClinicDetailsDto(this Clinic clinicModel)
        {
            return new ClinicDetailsDto
            {
                Id = clinicModel.Id,
                Name = clinicModel.Name,
                Location = clinicModel.location,
              Doctors = clinicModel.Doctors.Select(d => d.ToDoctorDetailsDto()).ToList(),
                Assistants = clinicModel.Assistants.Select(a => a.ToAssistantDetailsDto()).ToList()

            };
        }
       
    
  

       


    }



}