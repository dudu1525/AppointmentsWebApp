using api.Dtos.Appointments;
using api.Models;

namespace api.Interfaces
{
    public interface IAppointmentRepo
    {
        Task<List<Appointment>> GetAllForUserAsync(int userId, string userRole); //either for patient or doctor

         //Task<List<Appointment>> GetAllForClinic(int clinicId);

        Task<Appointment?> GetByIdAsync(int id);
        Task<Appointment> CreateAsync(CreateAppointmentDto appointmentDto, int patientId);
        Task<Appointment?> UpdateAsync(int id, UpdateAppointmentDto appointmentDto);
        Task<Appointment?> DeleteAsync(int id);
    }
}