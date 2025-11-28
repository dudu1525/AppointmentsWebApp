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
            {   AssistantUserName = assistantModel.User?.UserName,
                AssistantId = assistantModel.AssistantId,
                AssistantName = assistantModel.User?.Name,
                AssistantEmail = assistantModel.User?.Email,
                ClinicId = assistantModel.ClinicId
            };
        }
        
        public static User ToUserFromCreatedAssistantDto(this CreateAssistantDto assistantDto)
        {

            return new User
            {   Name= assistantDto.AssistantName,
                UserName = assistantDto.AssistantUserName,
                Password = assistantDto.Password,
                Email = assistantDto.AssistantEmail,
                Role = "Assistant"
            };
        }

       
    
   

       


    }



}