import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRentals1627646374654 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "rentals",
        columns: [
          { name: "id", type: "char(36)", charset: "ascii", isPrimary: true },
          { name: "car_id", type: "char(36)", charset: "ascii" },
          { name: "user_id", type: "char(36)", charset: "ascii" },
          { name: "start_date", type: "timestamp", default: "now()" },
          { name: "end_date", type: "timestamp", isNullable: true },
          { name: "expected_return_date", type: "timestamp" },
          { name: "total", type: "numeric", isNullable: true },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
        foreignKeys: [
          {
            name: "FKRentalsCars",
            referencedTableName: "cars",
            referencedColumnNames: ["id"],
            columnNames: ["car_id"],
            onDelete: "No Action",
            onUpdate: "Cascade",
          },
          {
            name: "FKRentalsUsers",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "No Action",
            onUpdate: "Cascade",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("rentals");
  }
}
