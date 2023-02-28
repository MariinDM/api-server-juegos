import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Users/Role'
import RoleViewValidator from 'App/Validators/categories/RoleViewValidator'

export default class RolesViewsController {
  public async index({ auth, response }: HttpContextContract) {

    //VALIDACION DE ROL
    const user = await auth.use('api').authenticate()
    if (user.role_id != 1) {
      return response.badRequest({
        message: 'Acceso Denegado',
        data: null
      })
    }

    //CONSULTA DE LAS VISTAS
    const rolesViews = await Role.query()
      .preload('views')

    return response.ok({
      message: "Vistas del Rol obtenidas",
      data: rolesViews
    })
  }

  public async store({ request, auth, response }: HttpContextContract) {

    //VALIDACION DE ROL
    const user = await auth.use('api').authenticate()
    if (user.role_id != 1) {
      return response.badRequest({
        message: 'Acceso Denegado',
        data: null
      })
    }

    try {
      //VALIDAR DATA
      const vali = await request.validate(RoleViewValidator)

      if (!vali) return

      //BUSCAR ROL
      const role = await Role.find(vali.role_id)
      if (!role) {
        return response.notFound({
          message: 'Rol no encontrado',
          data: null
        })
      }

      console.log(role)

      //METODO SYNC
      await role.related('views').sync(vali.view_id)

      return response.created({
        message: 'Vistas Asignadas al Rol',
        data: null
      })
    } catch (e) {
      return response.badRequest({
        message: 'Error',
        data: e
      })
    }

  }

  public async show({ response, params }: HttpContextContract) {

    //VALIDACION DE ROL
    const role_id = await Role.find(params.id)

    if(!role_id){
      return response.notFound({
        message: 'Rol no encontrado',
        data: null
      })
    }

    const rolesViews = await Role.query()
      .where('id', params.id)
      .preload('views')

    return response.ok({
      message: "Vistas Obtenidas",
      data: rolesViews
    })

  }
}
