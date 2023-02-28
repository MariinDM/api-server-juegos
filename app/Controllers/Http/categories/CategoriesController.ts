import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/categories/Category'
import CategoryValidator from 'App/Validators/categories/CategoryValidator'

export default class CategoriesController {

  public async index({ auth, response }: HttpContextContract) {

    const user = await auth.use('api').authenticate()

    if (user.role_id != 1) {
      return response.badRequest({
        message: 'Acceso Denegado',
        data: null
      })
    }

    const categories = await Category.all()

    return response.ok({
      message: 'Categorias Obtenidas',
      data: categories
    })
  }

  public async store({ auth, response, request }: HttpContextContract) {

    const user = await auth.use('api').authenticate()

    if (user.role_id != 1) {
      return response.badRequest({
        message: 'Acceso Denegado',
        data: null
      })
    }

    const vali = await request.validate(CategoryValidator)

    if (!vali) return

    await Category.create(vali)

    return response.created({
      message: 'Categoria Creada',
      data: null
    })
  }

  public async show({ response, auth, params }: HttpContextContract) {

    const user = await auth.use('api').authenticate()

    if (user.role_id != 1) {
      return response.badRequest({
        message: 'Acceso Denegado',
        data: null
      })
    }

    const category = await Category.findOrFail(params.id)

    if (!category) {
      return response.notFound({
        message: 'Categoria no encontrada',
        data: null
      })
    }

    return response.ok({
      message: 'Categorias Obtenidas',
      data: category
    })
  }

  public async update({ response, request, params, auth }: HttpContextContract) {

    const user = await auth.use('api').authenticate()

    if (user.role_id != 1) {
      return response.badRequest({
        message: 'Acceso Denegado',
        data: null
      })
    }

    const category = await Category.findOrFail(params.id)

    if (!category) {
      return response.notFound({
        message: 'Categoria no encontrada',
        data: null
      })
    }

    const cat_req = await request.validate(CategoryValidator)

    await category.merge(cat_req).save()

    return response.ok({
      message: 'Categorias Actualizada',
      data: null
    })
  }

  public async destroy({ params, auth, response }: HttpContextContract) {

    const user = await auth.use('api').authenticate()

    if (user.role_id != 1) {
      return response.badRequest({
        message: 'Acceso Denegado',
        data: null
      })
    }

    const category = await Category.findOrFail(params.id)

    if (!category) {
      return response.notFound({
        message: 'Categoria no encontrada',
        data: null
      })
    }

    await category.merge({active:!category.active}).save()

    return response.ok({
      message: 'Estado Actualizado',
      data: null
    })
  }
}
