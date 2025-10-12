using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class ModifiedFK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointment_User_PatientId",
                table: "Appointment");

            migrationBuilder.RenameColumn(
                name: "PatientId",
                table: "Appointment",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Appointment_PatientId",
                table: "Appointment",
                newName: "IX_Appointment_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointment_User_UserId",
                table: "Appointment",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointment_User_UserId",
                table: "Appointment");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Appointment",
                newName: "PatientId");

            migrationBuilder.RenameIndex(
                name: "IX_Appointment_UserId",
                table: "Appointment",
                newName: "IX_Appointment_PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointment_User_PatientId",
                table: "Appointment",
                column: "PatientId",
                principalTable: "User",
                principalColumn: "Id");
        }
    }
}
