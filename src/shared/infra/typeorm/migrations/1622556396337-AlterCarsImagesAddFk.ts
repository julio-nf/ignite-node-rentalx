import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterCarsImagesAddFk1622556396337 implements MigrationInterface {
    name = 'AlterCarsImagesAddFk1622556396337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "is_admin"
            SET DEFAULT 'false'
        `);
        await queryRunner.query(`
            ALTER TABLE "cars_images" DROP COLUMN "car_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "cars_images"
            ADD "car_id" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "cars_images"
            ADD CONSTRAINT "FK_0835d7e3db7a80af5acb3d8b606" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cars_images" DROP CONSTRAINT "FK_0835d7e3db7a80af5acb3d8b606"
        `);
        await queryRunner.query(`
            ALTER TABLE "cars_images" DROP COLUMN "car_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "cars_images"
            ADD "car_id" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "is_admin"
            SET DEFAULT false
        `);
    }

}
