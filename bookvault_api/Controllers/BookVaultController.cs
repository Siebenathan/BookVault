using BookVault.DTOs;
using BookVault.Interfaces;
using BookVault.Models;
using BookVault.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging.Abstractions;
using Newtonsoft.Json;

namespace BookVault.Controllers;

[ApiController]
[Route("[controller]")]
public class BookVaultController : ControllerBase
{
    private readonly IBookVaultService _bookVaultService;
    private readonly ITokenService _tokenservice;
    public BookVaultController(IBookVaultService bookVaultService, ITokenService tokenService)
    {
        _bookVaultService = bookVaultService;
        _tokenservice = tokenService;
    }

    [HttpGet]
    [Route("teste")]
    public IActionResult Teste()
    {
        return Ok("deu certo");
    }

    [HttpPost]
    [Route("user/create")]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserDTO createUserDTO)
    {
        var response = await _bookVaultService.CreateUser(createUserDTO);
        if (!response.Sucess) return BadRequest(response.Message);
        return Ok(response.Message);
    }

    [HttpGet]
    [Route("user/login")]
    public async Task<IActionResult> Login(string email, string password)
    {
        var loggedUser = await _bookVaultService.Login(email, password);
        if (loggedUser == null)
        {
            return BadRequest("Email ou senha inconpatíveis.");
        }

        var token = _tokenservice.CreateToken(loggedUser);
        return Ok(token);
    }

    [HttpPost]
    [Route("admin/createauthor")]
    public async Task<IActionResult> CreateNewAuthor([FromForm] CreateAuthorDTO authorDTO)
    {
        var response = await _bookVaultService.CreateAuthor(authorDTO);
        return Ok("testando");
    }

    [HttpGet]
    [Route("admin/getallauthors")]
    public async Task<IActionResult> GetAllAuthors()
    {
        List<ObtainAuthorDTO> authors;
        try
        {
            authors = await _bookVaultService.GetAuthors();
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return BadRequest(e.Message);
        }

        return Ok(authors);
    }

    [HttpGet]
    [Route("get/bookgenres")]
    public IActionResult GetBookGenres()
    {
        return Ok(Enum.GetNames<BookGenresEnum>());
    }

    [HttpPost]
    [Route("admin/createnewbook")]
    public async Task<IActionResult> CreateNewBook([FromForm] IFormFile imageFile, [FromForm] string data)
    {
        OperationResultDTO result;
        var createBookDTO = JsonConvert.DeserializeObject<CreateBookDTO>(data);

        try
        {
            result = await _bookVaultService.CreateNewBook(createBookDTO, imageFile);
        }
        catch (Exception err)
        {
            Console.WriteLine(err);
            return BadRequest(err.Message);
        }

        if (!result.Sucess)
        {
            return BadRequest(result.Message);
        }

        return Ok(result.Message);
    }

    [HttpGet]
    [Route("get/allBooks")]
    public async Task<IActionResult> GetAllBooks()
    {
        try
        {
            var books = await _bookVaultService.GetAllBooks();
            return Ok(books);
        }
        catch (Exception err)
        {
            return BadRequest(err);
        }
    }

    [HttpGet]
    [Route("get/bookByName")]
    public async Task<IActionResult> GetBooksByName([FromQuery] string bookName)
    {
        try
        {
            var books = await _bookVaultService.GetBooksByName(bookName.Trim().ToLower());
            Console.WriteLine(books[0].BookName);
            Console.WriteLine("batata");
            if (books != null)
            {
                return Ok(books);
            }
            return NotFound("No book was found with that name, try to check if the name is spelled correctly.");
        }
        catch (Exception err)
        {
            return BadRequest(err);
        }
    }

    [HttpGet]
    [Route("get/bookByIdentifier")]
    public async Task<IActionResult> GetBookByIdentifier([FromQuery] string bookIdentifier)
    {
        try
        {
            var book = await _bookVaultService.GetBookByIdentifier(bookIdentifier);
            if (book != null)
            {
                return Ok(book);
            }
            return NotFound("No book was found with that identifier.");
        }
        catch (Exception err)
        {
            return BadRequest(err);
        }
    }

    [HttpGet]
    [Route("get/bookAndAuthorByBookIdentifier")]
    public async Task<IActionResult> GetBookAndAuthorByBookIdentifier([FromQuery] string bookIdentifier)
    {
        Console.WriteLine(bookIdentifier);
        try
        {
            ObtainBookAndAuthorDTO bookAndAuthor = await _bookVaultService.GetBookAndAuthorByBookIndentifier(bookIdentifier);

            if (bookAndAuthor != null)
            {
                return Ok(new { bookAndAuthor.Book, bookAndAuthor.Author });
            }
            return NotFound("No book was found with that identifier.");
        }
        catch (Exception err)
        {
            return BadRequest(err);
        }
    }

    [HttpGet]
    [Route("get/authorAndAllHisBooks")]
    public async Task<IActionResult> GetAuthorAndAllHisBooks([FromQuery] string authorName)
    {
        try
        {
            ObtainAuthorAndAllHisBooks bookAndAuthor = await _bookVaultService.GetAuthorAndAllHisBooks(authorName);

            if (bookAndAuthor != null)
            {
                return Ok(new { books = bookAndAuthor.Books, author = bookAndAuthor.Author });
            }
            return NotFound("No book was found with that identifier.");
        }
        catch (Exception err)
        {
            return BadRequest(err);
        }
    }

    [HttpGet]
    [Route("get/bookByLikeName")]
    public async Task<IActionResult> GetBookByLikeName([FromQuery] string authorName)
    {
        try
        {
            ObtainAuthorAndAllHisBooks bookAndAuthor = await _bookVaultService.GetAuthorAndAllHisBooks(authorName);

            if (bookAndAuthor != null)
            {
                return Ok(new { books = bookAndAuthor.Books, author = bookAndAuthor.Author });
            }
            return NotFound("No book was found with that identifier.");
        }
        catch (Exception err)
        {
            return BadRequest(err);
        }
    }
}

