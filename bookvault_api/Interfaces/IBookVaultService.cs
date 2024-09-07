using BookVault.DTOs;
using BookVault.Models;
namespace BookVault.Interfaces;

public interface IBookVaultService
{
    public Task<OperationResultDTO> CreateUser(CreateUserDTO createUserDTO);
    public Task<ObtainUserDTO> Login(string email, string password);
    public Task<OperationResultDTO> CreateAuthor(CreateAuthorDTO authorDTO);
    public Task<ObtainAuthorDTO> GetAuthorByName(string authorName);
    public Task<List<ObtainAuthorDTO>> GetAuthors(List<string> authorsNamesList = null);
    public Task<OperationResultDTO> CreateNewBook(CreateBookDTO createBookDTO, IFormFile bookImageFile);
    public Task<List<ObtainBookDTO>> GetAllBooks();
    public Task<List<ObtainBookDTO>> GetBooksByName(string name);
    public Task<ObtainBookDTO> GetBookByIdentifier(string bookIdentifier);
    public Task<ObtainBookAndAuthorDTO> GetBookAndAuthorByBookIndentifier(string bookIdentifier);
    public Task<ObtainAuthorAndAllHisBooks> GetAuthorAndAllHisBooks(string authorName);
}