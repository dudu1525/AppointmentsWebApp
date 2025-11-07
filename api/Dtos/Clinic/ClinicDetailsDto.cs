using api.Dtos.Doctor; 
using api.Dtos.Assistant;

namespace api.Dtos.Clinic
{
    // For returning a clinic with its staff
    public class ClinicDetailsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public List<DoctorDetailsDto> Doctors { get; set; }
        public List<AssistantDetailsDto> Assistants { get; set; }
    }
}