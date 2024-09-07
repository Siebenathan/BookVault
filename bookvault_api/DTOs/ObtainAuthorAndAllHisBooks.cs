namespace BookVault.DTOs;
public class ObtainAuthorAndAllHisBooks
{
    public ObtainAuthorDTO Author {get; set;}
    public List<ObtainBookDTO> Books { get; set; }
}