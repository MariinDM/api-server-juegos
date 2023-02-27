import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Users/Profile'
import Role from 'App/Models/Users/Role'
import User from 'App/Models/Users/User'
import SingupValidator from 'App/Validators/auth/SingupValidator'
import UserRegisterValidator from 'App/Validators/auth/UserRegisterValidator'

export default class AuthController {

  public async singIn({ response, request }: HttpContextContract) {


    try {
      const vali = await request.validate(UserRegisterValidator)

      if (!vali) return

      if (!vali.role_id) { vali.role_id = 3 }

      //VALIDACION DEL ROL
      const rol = await Role.find(vali.role_id)
      if (!rol) {
        return response.notFound({
          message: 'Rol no encontrado',
          data: null
        })
      }
      //VALIDACION DEL CORREO
      const emailExis = await User.findBy('email', vali.email)
      if (emailExis) {
        return response.badRequest({
          message: 'Email ya existente',
          data: null
        })
      }

      //CREACION DEL USUARIO
      const user = await User.create({
        email: vali.email,
        password: vali.password,
        active: vali.active,
        role_id: vali.role_id
      })

      await Profile.create({
        user_id: user.id,
        name: vali.name,
        lastname: vali.lastname,
        phone: vali.phone,
        address: vali.address
      })

      return response.created({
        message: 'Usuario Creado Correctamente',
        data: null
      })

    } catch (e) {
      return response.badRequest({
        message: e,
        data: null
      })
    }

  }

  public async singUp({ auth, response, request }: HttpContextContract) {

    const vali = await request.validate(SingupValidator)

    if (!vali) return

    try {
      const verify = await auth.use('api').verifyCredentials(vali.email, vali.password)

      if (!verify) return

      const user = User.findBy('email', vali.email)

      if (!user) {
        return response.notFound({
          message: 'Correo o Contraseña Incorrectos',
          data: null
        })
      }

      const token = await auth.use('api').attempt(vali.email, vali.password, {
        expiresIn: '6hour'
      })

      return response.ok({
        message: 'Sesión Iniciada Correctamente',
        data: {
          type: token.type,
          token: token.token,
          expires_at: token.expiresAt?.toFormat('dd/MM/yyyy  HH:mm:ss')
        }
      })

    } catch (e) {
      console.log(e)
      return response.badRequest({
        message: 'Ocurrio un Error',
        data: e
      })
    }

  }

  public async logout({ response, auth }: HttpContextContract) {

    await auth.use('api').revoke()

    return response.ok({
      message: 'Sesión Cerrada Correctamente',
      data: {
        revoke: true
      }
    })

  }

}
