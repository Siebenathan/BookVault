using BookVault.DTOs;
using BookVault.Models;

namespace BookVault.Interfaces;

public interface ITokenService
{
    public string CreateToken(ObtainUserDTO user);
    
}