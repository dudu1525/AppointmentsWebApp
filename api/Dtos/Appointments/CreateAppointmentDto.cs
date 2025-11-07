namespace api.Dtos.Appointments
{
    // Data needed to book a new appointment
    public class CreateAppointmentDto
    {
        public int DoctorId { get; set; }
        public DateTime AppointmentDateTime { get; set; }
    }
}