using api.Dtos.Appointments;

namespace api.Dtos.Doctor
{
    // For sending doctor data safely to the client
    public class DoctorSimpleDto
    {   
        public string DoctorUserName {get;set;}
        public int DoctorId { get; set; }
        public string DoctorName { get; set; }
        public string Email { get; set; }
        public string Type { get; set; }
        public string ClinicName{get;set;}


        
    }
}