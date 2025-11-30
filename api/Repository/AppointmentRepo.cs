using api.Data;
using api.Dtos.Appointments;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class AppointmentRepo : IAppointmentRepo
    {
        private readonly ApplicationDBContext _dbcontext;

        public AppointmentRepo(ApplicationDBContext context)
        {
            _dbcontext = context;
        }

        public async Task<Appointment> CreateAsync(CreateAppointmentDto appointmentDto, int patientId)
        {
            var appointmentModel = new Appointment
            {
                DoctorId = appointmentDto.DoctorId,
                PatientId = patientId, 
                Status = "Pending",
                AppointmentDateTime = appointmentDto.AppointmentDateTime 
            };

            await _dbcontext.Appointment.AddAsync(appointmentModel);
            await _dbcontext.SaveChangesAsync();
            return appointmentModel;
        }
        
        public async Task<Appointment?> DeleteAsync(int id)
        {
            var appointment = await _dbcontext.Appointment.FindAsync(id);
            if (appointment == null) return null;

            _dbcontext.Appointment.Remove(appointment);
            await _dbcontext.SaveChangesAsync();
            return appointment;
        }

        public async Task<List<Appointment>> GetAllForUserAsync(int userId, string userRole)
        {
            IQueryable<Appointment> query = _dbcontext.Appointment
                .Include(a => a.Patient).ThenInclude(p => p.User)
                .Include(a => a.Doctor).ThenInclude(d => d.User);

            if (userRole == "Patient")
            {
                query = query.Where(a => a.Patient.UserId == userId);
            }
            else if (userRole == "Doctor")
            {
                query = query.Where(a => a.Doctor.UserId == userId);
            }

            return await query.ToListAsync();
        }

        public async Task<List<Appointment>> GetAppointmentsForPatient(int patientId)
        {
            return await _dbcontext.Appointment.
                Where(d => d.PatientId == patientId).ToListAsync();//here patient info is not included

        }

        public async Task<List<String>>? GetAppointmentsFromADay(DateTime selectedDate, int doctorId)
        {
            
            return await _dbcontext.Appointment.
            Where(d => d.DoctorId == doctorId).
            Where(d => d.AppointmentDateTime.Date == selectedDate.Date)
            .Select(a => a.AppointmentDateTime.ToString("HH:mm"))  
        .ToListAsync();
        }

        public async Task<Appointment?> GetByIdAsync(int id)
        {
            return await _dbcontext.Appointment
                .Include(a => a.Patient).ThenInclude(p => p.User)
                .Include(a => a.Doctor).ThenInclude(d => d.User)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<Appointment?> UpdateAsync(int id, UpdateAppointmentDto appointmentDto)
        {
            var existingAppointment = await _dbcontext.Appointment.FindAsync(id);
            if (existingAppointment == null) return null;

            existingAppointment.AppointmentDateTime = appointmentDto.AppointmentDateTime;
            existingAppointment.Status = appointmentDto.Status;
            existingAppointment.Message = appointmentDto.Message;

            await _dbcontext.SaveChangesAsync();
            return existingAppointment;
        }
    }
}