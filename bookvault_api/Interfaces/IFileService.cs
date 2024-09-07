namespace BookVault.Interfaces;

public interface IFileService
{
    public Task<(OperationResultDTO, string)> SaveFile(byte[] file, string fileName, List<string> path);  
    public Task<OperationResultDTO> DeleteFile(string fileName);  
}