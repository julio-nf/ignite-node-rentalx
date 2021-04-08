import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterUsersAddAvatarColumn1617883290375 implements MigrationInterface {
    name = 'AlterUsersAddAvatarColumn1617883290375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "avatar" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "isAdmin"
            SET DEFAULT 'false'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "isAdmin"
            SET DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "avatar"
        `);
    }

}
