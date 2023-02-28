import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import Role from '../Users/Role'

export default class View extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column()
  public icon:string

  @column()
  public route:string

  @column()
  public description:string

  @column()
  public number:number

  @column()
  public active:boolean

  @column()
  public category_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Category, {
    foreignKey: 'category_id'
  })
  public categories: BelongsTo<typeof Category>
  
  @manyToMany(() => Role,{
    pivotTable: 'roles_views'
  })
  public roles: ManyToMany<typeof Role>

}
