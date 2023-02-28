import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    Route.post('singup', 'AuthController.singUp')
    Route.post('singin', 'AuthController.singIn')

    Route.group(() => {
        Route.post('logout', 'AuthController.logout')
        Route.get('me', 'AuthController.me')
    }).middleware(['auth'])

})
    .prefix('api/v1/auth')
    .namespace('App/Controllers/Http')