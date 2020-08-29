import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class updateColumnsInUsers1598623892076 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'class',
      type: 'varchar',
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'class');
  }
}
