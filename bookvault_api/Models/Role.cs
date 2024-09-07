namespace BookVault.Models;

public class Role
{
    public int Id { get; set; }
    public string RoleName { get; set; }
    public List<User> Users { get; set; }
}

public static class DefaultRoles
{
    public static List<Role> GetDefaultRoles()
    {
        return new List<Role>
        {
            new Role {Id = 1, RoleName = "User"},
            new Role {Id = 2, RoleName = "Admin"}   
        };
    }
}