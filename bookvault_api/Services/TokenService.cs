using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BookVault.DTOs;
using BookVault.Interfaces;
using BookVault.Utilis;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace BookVault.Services;

public class TokenService : ITokenService
{
    private readonly JwtSettings _jwtSettings;
    public TokenService(IOptions<JwtSettings> jwtSettings)
    {
        _jwtSettings = jwtSettings.Value;
    }
    public string CreateToken(ObtainUserDTO user)
    {
        var handler = new JwtSecurityTokenHandler();

        var key = Encoding.ASCII.GetBytes(_jwtSettings.Key);
        var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, user.RoleName),
                new Claim(ClaimTypes.Email, user.Email)
            }),
            SigningCredentials = credentials,
            Expires = DateTime.UtcNow.AddHours(8)
        };

        var token = handler.CreateToken(tokenDescriptor);
        return handler.WriteToken(token);
    }
}