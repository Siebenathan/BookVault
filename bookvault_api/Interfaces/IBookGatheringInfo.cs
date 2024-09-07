using BookVault.DTOs;

namespace BookVault.Interfaces;

public interface IBookGatheringInfo
{
    public Task<CreateBookDTO> GatherInfo();
}