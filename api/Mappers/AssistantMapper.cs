using api.Dtos.Assistant;
using api.Dtos.Doctor;
using api.Models;

namespace api.Mappers
{
    
    public static class AssistantMapper
    {
        public static AssistantDetailsDto ToAssistantDetailsDto(this Assistant assistantModel)
        {
            return new AssistantDetailsDto
            {
                AssistantId = assistantModel.AssistantId,
                AssistantName = assistantModel.User?.UserName,
                AssistantEmail = assistantModel.User?.Email,
                ClinicId = assistantModel.ClinicId
            };
        }
        
        public static User ToUserFromCreatedAssistantDto(this CreateAssistantDto assistantDto)
        {

            return new User
            {
                UserName = assistantDto.AssistantName,
                Password = assistantDto.Password,
                Email = assistantDto.AssistantEmail,
                Role = "Assistant"
            };
        }

       
    
   

       


    }



}