using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BookVault.Models;

namespace ProjetoOgro.Repository.Context.Mappings;

public class RoleMap : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.ToTable("Roles");

        builder.Property(p => p.RoleName)
            .HasColumnType("varchar(100)")
            .HasColumnName("RoleName")
            .IsRequired();

        builder.HasMany(u => u.Users).
                WithOne(r => r.Role).
                HasForeignKey(u => u.RoleId).
                IsRequired();

        builder.HasKey(p => p.Id);

        builder.HasData(DefaultRoles.GetDefaultRoles());
    }
}

