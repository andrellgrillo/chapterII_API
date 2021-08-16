import { MigrationInterface, QueryRunner } from "typeorm";

export class renameColumnAvailabeInCars1627409088951
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("cars", "available", "isAvailable");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("cars", "isAvailable", "available");
  }
}
