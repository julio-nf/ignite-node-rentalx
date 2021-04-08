import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterUsersRemoveUsername1617792314801 implements MigrationInterface {
    name = 'AlterUsersRemoveUsername1617792314801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "username"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "username" character varying NOT NULL
        `);
    }

}
