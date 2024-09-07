namespace BookVault.Interfaces;

public interface IHashService
{
    public string GenerateHash(string password);
    public bool VerifyHash(string hash, string password);
}