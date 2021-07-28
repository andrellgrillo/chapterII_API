import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateSpecificationsCars1627476572922
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "specifications_cars",
        columns: [
          {
            name: "specification_id",
            type: "char(36)",
            charset: "ascii",
          },
          {
            name: "car_id",
            type: "char(36)",
            charset: "ascii",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "specifications_cars",
      new TableForeignKey({
        name: "FKSpecificationsCar",
        referencedTableName: "specifications",
        referencedColumnNames: ["id"],
        columnNames: ["specification_id"],
        onDelete: "No Action",
        onUpdate: "Cascade",
      })
    );

    await queryRunner.createForeignKey(
      "specifications_cars",
      new TableForeignKey({
        name: "FKCars",
        referencedTableName: "cars",
        referencedColumnNames: ["id"],
        columnNames: ["car_id"],
        onDelete: "No Action",
        onUpdate: "Cascade",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("specifications_cars", "FKCars");
    await queryRunner.dropForeignKey(
      "specifications_cars",
      "FKSpecificationsCar"
    );
    await queryRunner.dropTable("specifications_cars");
  }
}
