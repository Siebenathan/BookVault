namespace BookVault.DTOs;

public record CreateAuthorDTO(string authorName, DateTime dateOfBirth, string countryOfBirth, IFormFile imageOfTheAuthor, string authorSynopsis);