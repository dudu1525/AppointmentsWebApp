using api.Data;
using api.Dtos.Appointments;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
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

            var supposeDoctor = await _dbcontext.Doctor.FirstOrDefaultAsync(d => d.DoctorId == appointmentDto.doctorId);


            if (supposeDoctor == null)
            {
                return null;
            }

            existingAppointment.AppointmentDateTime = appointmentDto.AppointmentDateTime;
            existingAppointment.Status = appointmentDto.Status;
            existingAppointment.Message = appointmentDto.Message;
            existingAppointment.DoctorId = appointmentDto.doctorId;


            await _dbcontext.SaveChangesAsync();
            return existingAppointment;
        }


        public async Task<List<Appointment>> GetAppointmentsByClinicAndStatusAsync(int clinicId,string status)
        {
            return await _dbcontext.Appointment
                .Include(a => a.Doctor).ThenInclude(a =>a.User)
                    .Include(a => a.Patient).ThenInclude(a =>a.User)
                    .Where(a => a.Doctor != null
                            && a.Doctor.ClinicId == clinicId
                            && a.Status == status)
                                .ToListAsync();
        }

        public async Task<Appointment> UpdateAppointmentStatus(int appointmentId, string status)
        {
           var appointment = await _dbcontext.Appointment
        .Include(a => a.Doctor).ThenInclude(d => d.User)
        .Include(a => a.Patient).ThenInclude(p => p.User)
        .FirstOrDefaultAsync(a => a.Id == appointmentId);

             if (appointment == null)
                     return null;

                 appointment.Status = status;
             await _dbcontext.SaveChangesAsync();

                return appointment;


        }

        public async Task<Appointment> UpdateAppointmentMessage(int appointmentId, string message)
        {
            var appointment = await _dbcontext.Appointment
                    .Include(a => a.Doctor).ThenInclude(d => d.User)
              .Include(a => a.Patient).ThenInclude(p => p.User)
        .FirstOrDefaultAsync(a => a.Id == appointmentId);

             if (appointment == null)
                     return null;

                 appointment.Message = message;
             await _dbcontext.SaveChangesAsync();

                return appointment;
        }

        public async Task<List<Appointment>> GetByDoctorIdAsync(int doctorId)
        {
            var appointment = await _dbcontext.Appointment
                    .Include(a => a.Doctor).ThenInclude(d => d.User)
              .Include(a => a.Patient).ThenInclude(p => p.User)
                     .Where(a => a.DoctorId == doctorId).ToListAsync();

            if (appointment==null )
            return null;

            return appointment;

        }
    }
}