import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/categories/Category'
import View from 'App/Models/categories/View'
import ViewValidator from 'App/Validators/categories/ViewValidator'

export default class ViewsController {
  public async index({ auth, response }: HttpContextContract) {

    const user = await auth.use('api').authenticate()

    if (user.role_id != 1) {
      return response.badRequest({
        message: 'Acceso Denegado',
        data: null
      })
    }

    const categories = await View.all()

    return response.ok({
      message: 'Vistas Obtenidas',
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

    const vali = await request.validate(ViewValidator)

    if (!vali) return

    const category = await Category.find(vali.category_id)

    if (!category) {
      return response.notFound({
        message: 'Categoria no encontrada',
        data: null
      })
    }

    await View.create(vali)

    return response.created({
      message: 'Vista Creada',
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

    const view = await View.find(params.id)

    if (!view) {
      return response.notFound({
        message: 'Vista no encontrada',
        data: null
      })
    }

    return response.ok({
      message: 'Vistas Obtenidas',
      data: view
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

    const view = await View.find(params.id)

    if (!view) {
      return response.notFound({
        message: 'Vista no encontrada',
        data: null
      })
    }

    const category = await Category.find(view.category_id)

    if (!category) {
      return response.notFound({
        message: 'Categoria no encontrada',
        data: null
      })
    }

    const view_req = await request.all()

    await view.merge(view_req).save()

    return response.ok({
      message: 'Vistas Actualizada',
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

    const view = await View.find(params.id)

    if (!view) {
      return response.notFound({
        message: 'Vista no encontrada',
        data: null
      })
    }

    await view.merge({ active: !view.active }).save()

    return response.ok({
      message: 'Estado Actualizado',
      data: null
    })
  }
}
