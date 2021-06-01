import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCarsImages1622552013231 implements MigrationInterface {
    name = 'CreateCarsImages1622552013231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "specifications_cars" DROP CONSTRAINT "FKSpecificationCar"
        `);
        await queryRunner.query(`
            ALTER TABLE "specifications_cars" DROP CONSTRAINT "FKCarSpecification"
        `);
        await queryRunner.query(`
            CREATE TABLE "cars_images" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "car_id" character varying NOT NULL,
                "image_name" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_6180002831bf7873c4c37d7a5a7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "specifications_cars" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "specifications_cars"
            ADD CONSTRAINT "PK_63472a3f9ebc2f9ea4f3e89540e" PRIMARY KEY ("car_id", "specification_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "is_admin"
            SET DEFAULT 'false'
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a9606be942c7a7983466a0aa30" ON "specifications_cars" ("car_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_06812f537c06afbf37a9938f35" ON "specifications_cars" ("specification_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "specifications_cars"
            ADD CONSTRAINT "FK_a9606be942c7a7983466a0aa300" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "specifications_cars"
            ADD CONSTRAINT "FK_06812f537c06afbf37a9938f352" FOREIGN KEY ("specification_id") REFERENCES "specifications"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "specifications_cars" DROP CONSTRAINT "FK_06812f537c06afbf37a9938f352"
        `);
        await queryRunner.query(`
            ALTER TABLE "specifications_cars" DROP CONSTRAINT "FK_a9606be942c7a7983466a0aa300"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_06812f537c06afbf37a9938f35"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_a9606be942c7a7983466a0aa30"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "is_admin"
            SET DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "specifications_cars" DROP CONSTRAINT "PK_63472a3f9ebc2f9ea4f3e89540e"
        `);
        await queryRunner.query(`
            ALTER TABLE "specifications_cars"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            DROP TABLE "cars_images"
        `);
        await queryRunner.query(`
            ALTER TABLE "specifications_cars"
            ADD CONSTRAINT "FKCarSpecification" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE
            SET NULL ON UPDATE
            SET NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "specifications_cars"
            ADD CONSTRAINT "FKSpecificationCar" FOREIGN KEY ("specification_id") REFERENCES "specifications"("id") ON DELETE
            SET NULL ON UPDATE
            SET NULL
        `);
    }

}
