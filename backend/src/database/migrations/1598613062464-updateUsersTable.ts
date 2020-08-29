import {
  MigrationInterface, QueryRunner, TableColumn,
} from 'typeorm';

export default class updateUsersTable1598613062464 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'whatsapp',
      type: 'varchar',
      isNullable: true,
    }));

    await queryRunner.addColumn('users', new TableColumn({
      name: 'biography',
      type: 'varchar',
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'whatsapp');
    await queryRunner.dropColumn('users', 'biography');
  }
}
