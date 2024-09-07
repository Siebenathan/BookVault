using BookVault.Interfaces;

namespace BookVault.Services;

public class BCryptService : IHashService
{
    private int workFactor = 13;
    public string GenerateHash(string password)
    {
        return BCrypt.Net.BCrypt.EnhancedHashPassword(password, workFactor);
    }

    public bool VerifyHash(string hash, string password)
    {
        return BCrypt.Net.BCrypt.EnhancedVerify(password, hash);
    }
}