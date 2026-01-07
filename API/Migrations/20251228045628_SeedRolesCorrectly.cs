using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OwlMigo.Migrations
{
    /// <inheritdoc />
    public partial class SeedRolesCorrectly : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "1c44257b-cb83-4cd7-be7e-b90cf8d13e66", null, "Admin", "ADMIN" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1c44257b-cb83-4cd7-be7e-b90cf8d13e66");
        }
    }
}
