namespace api.Dtos.Doctor
{
    // For sending doctor data safely to the client
    public class DoctorDetailsDto
    {
        public int DoctorId { get; set; }
        public string DoctorName { get; set; }
        public string Email { get; set; }
        public string Type { get; set; }
        public int? ClinicId { get; set; }
    }
}