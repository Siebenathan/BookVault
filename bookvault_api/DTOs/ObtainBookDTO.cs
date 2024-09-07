using BookVault.Models;

namespace BookVault.DTOs;

public class ObtainBookDTO
{
    public string AuthorName { get; set; }
    public string BookName { get; set; }
    public string Synopsis { get; set; }
    public DateTime PublicationDate { get; set; }
    public List<string> BookGender { get; set; }
    public string BookCoverUrl { get; set; }
    public int NumberOfPages { get; set; }
    public string BookIdentifier { get; set; }
}
