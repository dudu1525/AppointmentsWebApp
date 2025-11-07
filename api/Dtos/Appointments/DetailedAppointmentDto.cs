using api.Dtos.Doctor;

namespace api.Dtos.Appointments
{
    public class DetailedAppointmentDto
    {
        public int Id { get; set; }
        public DateTime AppointmentDateTime { get; set; }

        public DateTime CreatedOn { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }

        public PatientDetailsDto Patient { get; set; }
        public DoctorDetailsDto Doctor { get; set; }
    }

 
}