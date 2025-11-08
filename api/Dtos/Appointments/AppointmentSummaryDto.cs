




namespace api.Dtos.Appointments
{
    // A simplified DTO for lists
    public class AppointmentSummaryDto
    {
        public int Id { get; set; }
        public DateTime AppointmentDateTime { get; set; }
        public string Status { get; set; }


        public int PatientId { get; set; }
        public string PatientName { get; set; }
    }
}