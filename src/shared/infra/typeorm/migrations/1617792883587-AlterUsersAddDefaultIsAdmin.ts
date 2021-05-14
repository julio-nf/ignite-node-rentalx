import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterUsersAddDefaultIsAdmin1617792883587 implements MigrationInterface {
    name = 'AlterUsersAddDefaultIsAdmin1617792883587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "isAdmin"
            SET DEFAULT 'false'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "isAdmin" DROP DEFAULT
        `);
    }

}
