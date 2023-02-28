import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import View from '../categories/View'

export default class Role extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public active: boolean

  @column()
  public description?: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  // Relations

  @hasMany(() => User, {
    localKey: 'id',
    foreignKey: 'role_id'
  })
  public users: HasMany<typeof User>

  @manyToMany(() => View, {
    localKey: 'id',
    pivotForeignKey: 'role_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'view_id',
    pivotTable: 'roles_views',
  })
  public views: ManyToMany<typeof View>

}
