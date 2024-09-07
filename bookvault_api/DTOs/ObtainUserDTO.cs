namespace BookVault.DTOs;

// public record struct ObtainUserDTO(string Name, string Email, string Password, DateTime DateOfBirth, string RoleName);
public class ObtainUserDTO
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string RoleName { get; set; }
}
