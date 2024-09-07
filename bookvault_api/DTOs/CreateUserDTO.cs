namespace BookVault.DTOs;

public record struct CreateUserDTO(string name, string password, string email, DateTime dateOfBirth);