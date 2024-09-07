using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace bookvault_api.Migrations
{
    /// <inheritdoc />
    public partial class JunctionTableBookBookGender : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Synopsis",
                table: "Books",
                type: "varchar(1000)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<DateTime>(
                name: "PublicationDate",
                table: "Books",
                type: "Date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AddColumn<string>(
                name: "BookCoverUrl",
                table: "Books",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BookIdentifier",
                table: "Books",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "NumberOfPages",
                table: "Books",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "AuthorSynopsis",
                table: "Authors",
                type: "varchar(1000)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.CreateTable(
                name: "BookGenres",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Genre = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookGenres", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BookBookGenre",
                columns: table => new
                {
                    BookGenresId = table.Column<int>(type: "integer", nullable: false),
                    BooksId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookBookGenre", x => new { x.BookGenresId, x.BooksId });
                    table.ForeignKey(
                        name: "FK_BookBookGenre_BookGenres_BookGenresId",
                        column: x => x.BookGenresId,
                        principalTable: "BookGenres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookBookGenre_Books_BooksId",
                        column: x => x.BooksId,
                        principalTable: "Books",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "BookGenres",
                columns: new[] { "Id", "Genre" },
                values: new object[,]
                {
                    { 1, "Fantasy" },
                    { 2, "Science_Fiction" },
                    { 3, "Dystopia" },
                    { 4, "Action_and_adventure" },
                    { 5, "Crime_Fiction" },
                    { 6, "Horror" },
                    { 7, "Thriller_and_Suspense" },
                    { 8, "Historical_fiction" },
                    { 9, "Romance" },
                    { 10, "Novel" },
                    { 11, "Womens_Fiction" },
                    { 12, "LGBTQ" },
                    { 13, "Contemporary_Fiction" },
                    { 14, "Magic_realism" },
                    { 15, "Graphic_novel" },
                    { 16, "Tale" },
                    { 17, "Young_adult" },
                    { 18, "New_adult" },
                    { 19, "Childrens" },
                    { 20, "Memoirs_and_autobiography" },
                    { 21, "Biography" },
                    { 22, "Gastronomy" },
                    { 23, "Art_and_Photography" },
                    { 24, "Self_help" },
                    { 25, "History" },
                    { 26, "Trip" },
                    { 27, "True_Crimes" },
                    { 28, "Humor" },
                    { 29, "Tests" },
                    { 30, "Guides_How_To" },
                    { 31, "Religion_and_Spirituality" },
                    { 32, "Humanities_and_Social_Sciences" },
                    { 33, "Fatherhood_and_family" },
                    { 34, "Technology_and_Science" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookBookGenre_BooksId",
                table: "BookBookGenre",
                column: "BooksId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookBookGenre");

            migrationBuilder.DropTable(
                name: "BookGenres");

            migrationBuilder.DropColumn(
                name: "BookCoverUrl",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "BookIdentifier",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "NumberOfPages",
                table: "Books");

            migrationBuilder.AlterColumn<string>(
                name: "Synopsis",
                table: "Books",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(1000)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "PublicationDate",
                table: "Books",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "Date");

            migrationBuilder.AlterColumn<string>(
                name: "AuthorSynopsis",
                table: "Authors",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(1000)");
        }
    }
}
