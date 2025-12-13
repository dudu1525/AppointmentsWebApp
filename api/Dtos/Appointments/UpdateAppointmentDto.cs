namespace api.Dtos.Appointments
{
    // For updating status, message, or rescheduling
    public class UpdateAppointmentDto
    {

        public DateTime AppointmentDateTime { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }

        public int doctorId {get;set;}

    }
}