import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSpecification1617708072660 implements MigrationInterface {
    name = 'CreateSpecification1617708072660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "specifications" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_621aabf71e640ab86f0e8b62a37" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "specifications"
        `);
    }

}
