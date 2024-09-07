namespace BookVault.Models;

public class Author
{
    public int Id { get; set; }
    public string AuthorName { get; set; }
    public string AuthorSynopsis { get; set; }
    public string AuthorImageUrl { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string CountryOfBirth { get; set; }
    public List<Book> Books { get; set; }
}