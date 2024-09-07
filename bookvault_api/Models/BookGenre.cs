namespace BookVault.Models;

public class BookGenre
{
    public int Id { get; set; }
    public string Genre { get; set; }
    public List<Book> Books { get; set; }
}