using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BookVault.Models;

namespace ProjetoOgro.Repository.Context.Mappings;

public class AuthorMap : IEntityTypeConfiguration<Author>
{
    public void Configure(EntityTypeBuilder<Author> builder)
    {
        builder.ToTable("Authors");

        builder.Property(p => p.DateOfBirth)
            .HasColumnType("Date")
            .IsRequired();

        builder.Property(p => p.AuthorSynopsis)
            .HasColumnType("varchar(1000)")
            .IsRequired();

    }
}

