using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OwlMigo.Migrations
{
    /// <inheritdoc />
    public partial class Letters : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "AccountId",
                table: "Profiles",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "Letters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReceiverId = table.Column<int>(type: "int", nullable: false),
                    SenderId = table.Column<int>(type: "int", nullable: false),
                    SenderName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TimeSent = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Letters", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProfileToLanguages_ProfileId",
                table: "ProfileToLanguages",
                column: "ProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_ProfileToInterest_ProfileId",
                table: "ProfileToInterest",
                column: "ProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_ProfileToGoal_ProfileId",
                table: "ProfileToGoal",
                column: "ProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Profiles_AccountId",
                table: "Profiles",
                column: "AccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Profiles_AspNetUsers_AccountId",
                table: "Profiles",
                column: "AccountId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProfileToGoal_Profiles_ProfileId",
                table: "ProfileToGoal",
                column: "ProfileId",
                principalTable: "Profiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProfileToInterest_Profiles_ProfileId",
                table: "ProfileToInterest",
                column: "ProfileId",
                principalTable: "Profiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProfileToLanguages_Profiles_ProfileId",
                table: "ProfileToLanguages",
                column: "ProfileId",
                principalTable: "Profiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Profiles_AspNetUsers_AccountId",
                table: "Profiles");

            migrationBuilder.DropForeignKey(
                name: "FK_ProfileToGoal_Profiles_ProfileId",
                table: "ProfileToGoal");

            migrationBuilder.DropForeignKey(
                name: "FK_ProfileToInterest_Profiles_ProfileId",
                table: "ProfileToInterest");

            migrationBuilder.DropForeignKey(
                name: "FK_ProfileToLanguages_Profiles_ProfileId",
                table: "ProfileToLanguages");

            migrationBuilder.DropTable(
                name: "Letters");

            migrationBuilder.DropIndex(
                name: "IX_ProfileToLanguages_ProfileId",
                table: "ProfileToLanguages");

            migrationBuilder.DropIndex(
                name: "IX_ProfileToInterest_ProfileId",
                table: "ProfileToInterest");

            migrationBuilder.DropIndex(
                name: "IX_ProfileToGoal_ProfileId",
                table: "ProfileToGoal");

            migrationBuilder.DropIndex(
                name: "IX_Profiles_AccountId",
                table: "Profiles");

            migrationBuilder.AlterColumn<string>(
                name: "AccountId",
                table: "Profiles",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
