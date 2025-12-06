
using api.Dtos.Doctor;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace api.Interfaces
{

  public interface IDoctorRepo
  {
    Task<List<Doctor>> GetAllAsync();
    Task<Doctor?> GetByIdAsync(int id);

     Task<Doctor> CreateAsync(CreateDoctorDto createddoctorDto, int clinicId);
  

   Task<Doctor?> UpdateAsync(int id, UpdateDoctorDto doctorDto); 

      Task<Doctor?> DeleteDoctorAsync(int id);

      Task<Doctor?> GetDoctorAndClinic(int doctorId);

      Task<Doctor?> GetDoctorByUserId(int userId);
 

  }




}