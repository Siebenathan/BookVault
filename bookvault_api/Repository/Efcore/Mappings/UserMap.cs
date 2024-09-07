using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BookVault.Models;

namespace ProjetoOgro.Repository.Context.Mappings;

public class UserMap : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");

        builder.Property(p => p.Name)
            .HasColumnType("varchar(200)")
            .IsRequired();

        builder.Property(p => p.Email)
            .HasColumnType("varchar(150)")
            .IsRequired();

        builder.Property(p => p.Password)
            .HasColumnType("varchar(150)")
            .IsRequired();

        builder.Property(p => p.DateOfBirth)
            .HasColumnType("Date")
            .IsRequired();

        builder.HasOne(r => r.Role).
            WithMany(u => u.Users).
            HasForeignKey(u => u.RoleId).
            IsRequired();

        builder.HasKey(p => p.Id);


    }
}

