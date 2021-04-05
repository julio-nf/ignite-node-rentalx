import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCategory1617660107653 implements MigrationInterface {
    name = 'CreateCategory1617660107653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "categories" (
                "id" character varying NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "categories"
        `);
    }

}
