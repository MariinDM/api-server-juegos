import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasOne, belongsTo, HasOne, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'
import Role from './Role'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column()
  public active: boolean

  @column()
  public role_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasOne(() => Profile, {
    localKey: 'id',
    foreignKey: 'user_id'
  })
  public profile: HasOne<typeof Profile>

  @belongsTo(() => Role, {
    localKey: 'id',
    foreignKey: 'role_id'
  })
  public role: BelongsTo<typeof Role>
}
