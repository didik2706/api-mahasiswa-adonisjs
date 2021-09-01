import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Mahasiswa extends BaseModel {

  public static table = 'mahasiswa'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nim: number

  @column()
  public nama: string

  @column()
  public email: string

  @column()
  public prodi: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
