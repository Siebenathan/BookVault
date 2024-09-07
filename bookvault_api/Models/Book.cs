namespace BookVault.Models;

public class Book
{
    public int Id { get; set; }
    public int AuthorId { get; set; }
    public Author Author { get; set; }
    public string BookName { get; set; }
    public DateTime PublicationDate { get; set; }
    public string Synopsis { get; set; }
    public string BookCoverUrl { get; set; }
    public string BookIdentifier { get; set; }
    public int NumberOfPages { get; set; }
    public List<BookGenre> BookGenres { get; set; }
}

public enum BookGenresEnum
{
    Fantasy,
    Science_Fiction,
    Dystopia,
    Action_and_adventure,
    Crime_Fiction,
    Horror,
    Thriller_and_Suspense,
    Historical_fiction,
    Romance,
    Novel,
    Womens_Fiction,
    LGBTQ,
    Contemporary_Fiction,
    Magic_realism,
    Graphic_novel,
    Tale,
    Young_adult,
    New_adult,
    Childrens,
    Memoirs_and_autobiography,
    Biography,
    Gastronomy,
    Art_and_Photography,
    Self_help,
    History,
    Trip,
    True_Crimes,
    Humor,
    Tests,
    Guides_How_To,
    Religion_and_Spirituality,
    Humanities_and_Social_Sciences,
    Fatherhood_and_family,
    Technology_and_Science,
}