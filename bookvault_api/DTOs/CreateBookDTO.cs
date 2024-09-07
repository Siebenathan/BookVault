using BookVault.Models;

namespace BookVault.DTOs;

// public record struct CreateBookDTO(string AuthorName, string BookName,
// string Synopsis, DateTime PublicationDate,
// List<BookGenresEnum> BookGender, int NumberOfPages);

public class CreateBookDTO
{
    public string AuthorName { get; set; }
    public string BookName { get; set; }
    public string Synopsis { get; set; }
    public DateTime PublicationDate { get; set; }
    public List<BookGenresEnum> BookGender { get; set; }
    public int NumberOfPages { get; set; }
}
