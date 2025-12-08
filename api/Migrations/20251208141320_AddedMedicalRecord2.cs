using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddedMedicalRecord2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AbdominalPain",
                table: "Symptoms",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Cough",
                table: "Symptoms",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CritialSymptoms",
                table: "Symptoms",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Fever",
                table: "Symptoms",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Headache",
                table: "Symptoms",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OtherSymptoms",
                table: "Symptoms",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "SoreThroat",
                table: "Symptoms",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AbdominalPain",
                table: "Symptoms");

            migrationBuilder.DropColumn(
                name: "Cough",
                table: "Symptoms");

            migrationBuilder.DropColumn(
                name: "CritialSymptoms",
                table: "Symptoms");

            migrationBuilder.DropColumn(
                name: "Fever",
                table: "Symptoms");

            migrationBuilder.DropColumn(
                name: "Headache",
                table: "Symptoms");

            migrationBuilder.DropColumn(
                name: "OtherSymptoms",
                table: "Symptoms");

            migrationBuilder.DropColumn(
                name: "SoreThroat",
                table: "Symptoms");
        }
    }
}
