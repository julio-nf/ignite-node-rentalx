import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCars1621382054874 implements MigrationInterface {
    name = 'CreateCars1621382054874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "cars" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                "daily_rate" integer NOT NULL,
                "available" boolean NOT NULL DEFAULT true,
                "license_plate" character varying NOT NULL,
                "fine_amount" integer NOT NULL,
                "brand" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "category_id" uuid,
                CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "is_admin"
            SET DEFAULT 'false'
        `);
        await queryRunner.query(`
            ALTER TABLE "cars"
            ADD CONSTRAINT "FK_9b6410d2f4eabb985524faae074" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cars" DROP CONSTRAINT "FK_9b6410d2f4eabb985524faae074"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "is_admin"
            SET DEFAULT false
        `);
        await queryRunner.query(`
            DROP TABLE "cars"
        `);
    }

}
