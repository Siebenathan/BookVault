using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BookVault.Models;

namespace ProjetoOgro.Repository.Context.Mappings;

public class BookGenreMap : IEntityTypeConfiguration<BookGenre>
{
    public void Configure(EntityTypeBuilder<BookGenre> builder)
    {
        builder.ToTable("BookGenres");

        builder.HasData(Enum.GetNames<BookGenresEnum>().Select((item, index) => new BookGenre { Id = index + 1, Genre = item }).ToList());
    }
}

