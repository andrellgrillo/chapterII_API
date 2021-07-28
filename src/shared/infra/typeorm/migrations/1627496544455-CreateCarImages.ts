import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateCarImages1627496544455 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "car_images",
        columns: [
          {
            name: "id",
            type: "char(36)",
            charset: "ascii",
            isPrimary: true,
          },
          {
            name: "car_id",
            type: "char(36)",
            charset: "ascii",
          },
          {
            name: "image_name",
            type: "varchar",
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
      "car_images",
      new TableForeignKey({
        name: "FKCarImages",
        referencedTableName: "cars",
        referencedColumnNames: ["id"],
        columnNames: ["car_id"],
        onDelete: "",
        onUpdate: "",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("car_images", "FKCarImages");
    await queryRunner.dropTable("car_images");
  }
}
