using BookVault.DTOs;
using BookVault.Interfaces;
using BookVault.Models;
using BookVault.Repository;
using Microsoft.EntityFrameworkCore;

namespace BookVault.Services;

public class BookVaultService : IBookVaultService
{
    private readonly DataContext _dataContext;
    private readonly IHashService _hashService;
    private readonly IFileService _fileService;
    public BookVaultService(DataContext dataContext, IHashService hashService, IFileService fileService)
    {
        _dataContext = dataContext;
        _hashService = hashService;
        _fileService = fileService;
    }
    public async Task<OperationResultDTO> CreateUser(CreateUserDTO createUserDTO)
    {
        var verifyIfExistUser = await _dataContext.Users.Where(u => u.Email == createUserDTO.email).FirstOrDefaultAsync();
        if (verifyIfExistUser != null)
        {
            return new OperationResultDTO(Sucess: false, Message: "A user already has this email, try again with another email.");
        }

        createUserDTO.dateOfBirth = createUserDTO.dateOfBirth.Date;
        string hashPassword = _hashService.GenerateHash(createUserDTO.password);

        var newUser = new User
        {
            Email = createUserDTO.email,
            Name = createUserDTO.name,
            Password = hashPassword,
            DateOfBirth = createUserDTO.dateOfBirth,
            RoleId = 1
        };
        await _dataContext.Users.AddAsync(newUser);
        await _dataContext.SaveChangesAsync();

        return new OperationResultDTO(Sucess: true, Message: "Account created successfully, you can now log in");
    }

    public async Task<ObtainUserDTO> Login(string email, string password)
    {
        var user = await _dataContext.Users
        .Include(u => u.Role)
        .Select(u => new ObtainUserDTO { Name = u.Name, DateOfBirth = u.DateOfBirth, Email = u.Email, Password = u.Password, RoleName = u.Role.RoleName })
        .Where(u => u.Email == email)
        .FirstOrDefaultAsync();

        if (user == null) return null;

        bool isPasswordCorrect = _hashService.VerifyHash(user.Password, password);
        if (!isPasswordCorrect) return null;
        return user;
    }

    public async Task<OperationResultDTO> CreateAuthor(CreateAuthorDTO authorDTO)
    {
        var verifyIfAuthorExist = await _dataContext.Authors.Where(u => u.AuthorName == authorDTO.authorName).FirstOrDefaultAsync();
        if (verifyIfAuthorExist != null)
        {
            return new OperationResultDTO(false, "This author has already been registered.");
        }

        //Saving author image on file service.
        string imageUrl = "";
        OperationResultDTO result;

        using (var ms = new MemoryStream())
        {
            await authorDTO.imageOfTheAuthor.CopyToAsync(ms);
            var fileBytes = ms.ToArray();
            List<string> path = new List<string> { "images", "authors" };
            (result, imageUrl) = await _fileService.SaveFile(fileBytes, authorDTO.authorName, path);
        }

        if (!result.Sucess)
        {
            return result;
        }


        var newAuthor = new Author
        {
            AuthorImageUrl = imageUrl,
            AuthorName = authorDTO.authorName,
            AuthorSynopsis = authorDTO.authorSynopsis,
            CountryOfBirth = authorDTO.countryOfBirth,
            DateOfBirth = authorDTO.dateOfBirth.Date
        };

        try
        {
            await _dataContext.Authors.AddAsync(newAuthor);
            await _dataContext.SaveChangesAsync();
            return new OperationResultDTO(true, "Author successfully registered.");
        }
        catch (Exception err)
        {
            return new OperationResultDTO(false, err.Message);
        }

    }

    public async Task<ObtainAuthorDTO> GetAuthorByName(string authorName)
    {
        var authorDb = await _dataContext.Authors.Where(a => a.AuthorName == authorName).FirstOrDefaultAsync();

        if (authorDb == null) return null;

        ObtainAuthorDTO obtainAuthorDTO = new ObtainAuthorDTO
        {
            authorName = authorDb.AuthorName,
            authorSynopsis = authorDb.AuthorSynopsis,
            countryOfBirth = authorDb.CountryOfBirth,
            dateOfBirth = authorDb.DateOfBirth,
            imageOfTheAuthor = authorDb.AuthorImageUrl
        };

        return obtainAuthorDTO;
    }

    public async Task<List<ObtainAuthorDTO>> GetAuthors(List<string>? authorsNamesList)
    {
        if (authorsNamesList != null)
        {
            //Implementar
        }

        var authorDTOs = await _dataContext.Authors
        .Select(u => new ObtainAuthorDTO
        {
            authorName = u.AuthorName,
            authorSynopsis = u.AuthorSynopsis,
            countryOfBirth = u.CountryOfBirth,
            dateOfBirth = u.DateOfBirth,
            imageOfTheAuthor = u.AuthorImageUrl
        }).ToListAsync();

        return authorDTOs;
    }

    public async Task<OperationResultDTO> CreateNewBook(CreateBookDTO createBookDTO, IFormFile bookImageFile)
    {
        // var queryBooksAndAuthor = await _dataContext.Books.Where(b => b.BookName == createBookDTO.BookName)
        // .Select(b => new { Book = b, Author = (Author)null })
        // .Union(_dataContext.Authors
        // .Where(a => a.AuthorName == createBookDTO.AuthorName).
        // Select(a => new { Book = (Book)null, Author = a })).FirstOrDefaultAsync();
        // if(queryBooksAndAuthor.Book != null) return new OperationResultDTO(false, "A book with this title is already registered."); 
        // if(queryBooksAndAuthor.Author == null) return new OperationResultDTO(false, "The author of this book is not registered in the database.");

        var verifyIfBookExist = await _dataContext.Books.Where(b => b.BookName == createBookDTO.BookName).FirstOrDefaultAsync();
        if (verifyIfBookExist != null) return new OperationResultDTO(false, "A book with this title is already registered.");

        var verifyIfAuthorExist = await _dataContext.Authors.Where(a => a.AuthorName == createBookDTO.AuthorName).FirstOrDefaultAsync();
        if (verifyIfAuthorExist == null) return new OperationResultDTO(false, "The author of this book is not registered in the database.");

        if (verifyIfBookExist != null) return new OperationResultDTO(false, "A book with this title is already registered.");
        if (verifyIfAuthorExist == null) return new OperationResultDTO(false, "The author of this book is not registered in the database.");

        //Saving book image on file service.
        string imageUrl = "";
        OperationResultDTO result;

        using (var ms = new MemoryStream())
        {
            await bookImageFile.CopyToAsync(ms);
            var fileBytes = ms.ToArray();
            List<string> path = new() { "images", "bookCovers" };
            (result, imageUrl) = await _fileService.SaveFile(fileBytes, createBookDTO.BookName, path);
        }

        if (!result.Sucess) return result;

        var bookGenres = new List<BookGenre>();

        createBookDTO.BookGender.ForEach((item) =>
        {
            var newBookGenre = new BookGenre { Genre = item.ToString() };
            bookGenres.Add(newBookGenre);
        });

        var bookIdentifier = createBookDTO.BookName + "-" + Guid.NewGuid();

        var newBook = new Book
        {
            BookName = createBookDTO.BookName.Trim().ToLower(),
            NumberOfPages = createBookDTO.NumberOfPages,
            PublicationDate = createBookDTO.PublicationDate.Date,
            Synopsis = createBookDTO.Synopsis.Trim(),
            Author = verifyIfAuthorExist,
            BookCoverUrl = imageUrl,
            AuthorId = verifyIfAuthorExist.Id,
            BookGenres = bookGenres,
            BookIdentifier = bookIdentifier
        };

        await _dataContext.Books.AddAsync(newBook);
        await _dataContext.SaveChangesAsync();

        return new OperationResultDTO(true, "The book has been registered successfully!");
    }

    public async Task<List<ObtainBookDTO>> GetAllBooks()
    {
        var allBooksList = await _dataContext.Books.Include(b => b.Author).Include(b => b.BookGenres).Select(b => new ObtainBookDTO
        {
            AuthorName = b.Author.AuthorName,
            Synopsis = b.Synopsis,
            BookName = b.BookName,
            NumberOfPages = b.NumberOfPages,
            PublicationDate = b.PublicationDate,
            BookCoverUrl = b.BookCoverUrl,
            BookGender = b.BookGenres.Select(g => g.Genre).ToList(),
            BookIdentifier = b.BookIdentifier
        }).ToListAsync();

        return allBooksList;
    }

    public async Task<List<ObtainBookDTO>> GetBooksByName(string name)
    {
        return await _dataContext.Books.Where(b => b.BookName.Contains(name))
        .Select(b => new ObtainBookDTO
        {
            AuthorName = b.Author.AuthorName,
            Synopsis = b.Synopsis,
            BookName = b.BookName,
            NumberOfPages = b.NumberOfPages,
            PublicationDate = b.PublicationDate,
            BookCoverUrl = b.BookCoverUrl,
            BookGender = b.BookGenres.Select(g => g.Genre).ToList(),
            BookIdentifier = b.BookIdentifier
        }).ToListAsync();
    }

    public async Task<ObtainBookDTO> GetBookByIdentifier(string bookIdentifier)
    {
        return await _dataContext.Books.Where(b => b.BookIdentifier == bookIdentifier)
        .Select(b => new ObtainBookDTO
        {
            AuthorName = b.Author.AuthorName,
            Synopsis = b.Synopsis,
            BookName = b.BookName,
            NumberOfPages = b.NumberOfPages,
            PublicationDate = b.PublicationDate,
            BookCoverUrl = b.BookCoverUrl,
            BookGender = b.BookGenres.Select(g => g.Genre).ToList(),
            BookIdentifier = b.BookIdentifier
        }).FirstOrDefaultAsync();
    }

    public async Task<ObtainBookAndAuthorDTO> GetBookAndAuthorByBookIndentifier(string bookIdentifier)
    {
        return await _dataContext.Books
            .Where(b => b.BookIdentifier == bookIdentifier)
            .Join(_dataContext.Authors,
                book => book.AuthorId,
                author => author.Id,
                (book, author) => new ObtainBookAndAuthorDTO
                {
                    Book = new ObtainBookDTO
                    {
                        AuthorName = author.AuthorName,
                        BookName = book.BookName,
                        Synopsis = book.Synopsis,
                        NumberOfPages = book.NumberOfPages,
                        PublicationDate = book.PublicationDate,
                        BookCoverUrl = book.BookCoverUrl,
                        BookGender = book.BookGenres.Select(g => g.Genre).ToList(),
                        BookIdentifier = book.BookIdentifier
                    },
                    Author = new ObtainAuthorDTO
                    {
                        authorName = author.AuthorName,
                        dateOfBirth = author.DateOfBirth,
                        authorSynopsis = author.AuthorSynopsis,
                        countryOfBirth = author.CountryOfBirth,
                        imageOfTheAuthor = author.AuthorImageUrl
                    }
                })
            .FirstOrDefaultAsync();
    }

    public async Task<ObtainAuthorAndAllHisBooks> GetAuthorAndAllHisBooks(string authorName)
    {
        var authorAndAllBooks = await _dataContext.Authors.Where(a => a.AuthorName == authorName)
        .Include(a => a.Books).ThenInclude(b => b.BookGenres).FirstOrDefaultAsync();

        if (authorAndAllBooks == null)
        {
            return null;
        }

        var formatedList = new List<ObtainBookDTO>();

        authorAndAllBooks.Books.ForEach(book => formatedList.Add(new ObtainBookDTO
        {
            AuthorName = authorAndAllBooks.AuthorName,
            BookName = book.BookName,
            Synopsis = book.Synopsis,
            NumberOfPages = book.NumberOfPages,
            PublicationDate = book.PublicationDate,
            BookCoverUrl = book.BookCoverUrl,
            BookGender = book.BookGenres.Select(g => g.Genre).ToList(),
            BookIdentifier = book.BookIdentifier
        }));

        return new ObtainAuthorAndAllHisBooks
        {
            Author = new ObtainAuthorDTO
            {
                authorName = authorAndAllBooks.AuthorName,
                dateOfBirth = authorAndAllBooks.DateOfBirth,
                authorSynopsis = authorAndAllBooks.AuthorSynopsis,
                countryOfBirth = authorAndAllBooks.CountryOfBirth,
                imageOfTheAuthor = authorAndAllBooks.AuthorImageUrl
            },
            Books = formatedList
        };



    }
}