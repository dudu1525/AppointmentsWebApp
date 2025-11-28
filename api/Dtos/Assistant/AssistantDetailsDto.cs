namespace api.Dtos.Assistant
{
    // For sending doctor data safely to the client
    public class AssistantDetailsDto
    {
        public int AssistantId { get; set; }
        public string AssistantName { get; set; }

        public string AssistantUserName {get;set;}
        public string AssistantEmail { get; set; }
        public int? ClinicId { get; set; }
    }
}