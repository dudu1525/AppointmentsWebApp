using api.Dtos.Appointments;
using api.Dtos.Doctor;
using api.Dtos.Patient;
using api.Models;
using System.Linq;

namespace api.Mappers
{
    public static class AppointmentMapper
    {
        public static DetailedAppointmentDto ToAppointmentDetailsDto(this Appointment appointmentModel)
        {
            return new DetailedAppointmentDto
            {
                Id = appointmentModel.Id,
                AppointmentDateTime = appointmentModel.AppointmentDateTime,
                CreatedOn = appointmentModel.CreatedOn,
                Status = appointmentModel.Status,
                Message = appointmentModel.Message,
                Patient = new PatientDetailsDto
                {
                    PatientId = appointmentModel.Patient.PatientId,
                    UserName = appointmentModel.Patient.User?.UserName,
                    Email = appointmentModel.Patient.User?.Email
                },
                Doctor = new DoctorDetailsDto
                {
                    DoctorId = appointmentModel.Doctor.DoctorId,
                    DoctorName = appointmentModel.Doctor.User?.UserName,
                    Email = appointmentModel.Doctor.User?.Email,
                    ClinicId = appointmentModel.Doctor.ClinicId,
                    Type = appointmentModel.Doctor.Type
                }

            };

        }
        
        public static AppointmentSummaryDto ToAppointmentSummaryDto(this Appointment appointmentModel)
        {
              return new AppointmentSummaryDto
              {
                  Id = appointmentModel.Id,
                  AppointmentDateTime = appointmentModel.AppointmentDateTime,
                  Status = appointmentModel.Status,
                  PatientId = appointmentModel.PatientId ?? 0,

                  PatientName = appointmentModel.Patient?.User?.UserName
              };
        }
    }
}