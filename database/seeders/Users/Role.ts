import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Profile from 'App/Models/Users/Profile'
import Role from 'App/Models/Users/Role'
import User from 'App/Models/Users/User'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    //CREACION DE LOS ROLES
    await Role.createMany([
      {
        name: 'Developer',
        description: 'Todos los privilegios',
        active: true
      },
      {
        name: 'Administrador',
        description: 'Todos los privilegios',
        active: true
      },
      {
        name: 'Cliente',
        description: 'Todos los privilegios',
        active: true
      },
      {
        name: 'Trabajador',
        description: 'Todos los privilegios',
        active: true
      }
    ])

    //CREACION DL USUARIO DEVELOPER
    const dev = await User.create({
      email:'developer@gmail.com',
      password:'1234567890',
      active: true,
      role_id: 1
    })

    //CREACION DEL PERFIL DEVELOPER
    await Profile.create({
      user_id: dev.id,
      name: 'Developer',
      lastname: 'Developer',
      phone: '8765435678',
      address: 'Calle Developer'
    })
  }
}
