import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterColumnNamesSnakeCase1621378946245 implements MigrationInterface {
    name = 'AlterColumnNamesSnakeCase1621378946245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "categories"
                RENAME COLUMN "createdAt" TO "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "specifications"
                RENAME COLUMN "createdAt" TO "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "driverLicense"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "isAdmin"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "driver_license" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "is_admin" boolean NOT NULL DEFAULT 'false'
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "is_admin"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "driver_license"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "isAdmin" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "driverLicense" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "specifications"
                RENAME COLUMN "created_at" TO "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "categories"
                RENAME COLUMN "created_at" TO "createdAt"
        `);
    }

}
