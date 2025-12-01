
namespace api.Dtos.Appointments
{
    // A simplified DTO for lists
    public class AppointmentFullDto
    {
        public int Id { get; set; }
        public DateTime AppointmentDateTime { get; set; }
        public string Status { get; set; }

        public string Message {get;set;}

        public int? DoctorId {get;set;}
        public string DoctorName{get;set;}
        public string DoctorType{get;set;}

        public int? PatientId{get;set;}
        public string PatientName{get;set;}
    }
}



