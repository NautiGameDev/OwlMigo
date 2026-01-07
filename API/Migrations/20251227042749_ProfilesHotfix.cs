using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OwlMigo.Migrations
{
    /// <inheritdoc />
    public partial class ProfilesHotfix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AccountToInterest",
                table: "AccountToInterest");

            migrationBuilder.RenameTable(
                name: "AccountToInterest",
                newName: "ProfileToInterest");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProfileToInterest",
                table: "ProfileToInterest",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ProfileToInterest",
                table: "ProfileToInterest");

            migrationBuilder.RenameTable(
                name: "ProfileToInterest",
                newName: "AccountToInterest");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AccountToInterest",
                table: "AccountToInterest",
                column: "Id");
        }
    }
}
