
using api.Dtos.Assistant;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace api.Interfaces
{

  public interface IAssistantRepo
  {
    Task<List<Assistant>> GetAllAsync();
    Task<Assistant?> GetByIdAsync(int id);

     Task<Assistant> CreateAsync(CreateAssistantDto createAssistantDto, int clinicId);
  

     Task<Assistant?> UpdateAsync(int id, UpdateAssistantDto assistantDto); 

      Task<Assistant?> DeleteAssistantAsync(int id);

     Task<Assistant?> GetByUserIdAsync(int id);
  }


}