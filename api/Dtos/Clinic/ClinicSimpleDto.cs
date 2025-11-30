using api.Dtos.Doctor; 
using api.Dtos.Assistant;

namespace api.Dtos.Clinic
{
    // For returning a clinic with its staff
    public class ClinicSimpleDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }

    }
}