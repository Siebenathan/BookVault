using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BookVault.Models;

namespace ProjetoOgro.Repository.Context.Mappings;

public class BookMap : IEntityTypeConfiguration<Book>
{
    public void Configure(EntityTypeBuilder<Book> builder)
    {
        builder.ToTable("Books");

        builder.Property(p => p.PublicationDate)
            .HasColumnType("Date")
            .IsRequired();

        builder.Property(p => p.Synopsis)
            .HasColumnType("varchar(1000)")
            .IsRequired();
    }
}

