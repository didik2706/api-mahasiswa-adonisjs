import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Mahasiswas extends BaseSchema {
  protected tableName = 'mahasiswa'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('nim').unique().notNullable()
      table.string('nama').notNullable()
      table.string('email').unique().notNullable()
      table.enum('prodi', [
        'Informatika', 'Teknologi Informasi', 'Sistem Informasi', 'Teknik Elektro', 'Rekayasa Perangkat Lunak'
      ])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable('mahasiswas')
  }
}
