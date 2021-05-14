import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsers1617730788854 implements MigrationInterface {
    name = 'CreateUsers1617730788854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "username" character varying NOT NULL,
                "password" character varying NOT NULL,
                "email" character varying NOT NULL,
                "driverLicense" character varying NOT NULL,
                "isAdmin" boolean NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }

}
