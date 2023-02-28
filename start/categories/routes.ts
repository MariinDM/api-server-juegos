import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.resource('categories', 'CategoriesController')
    Route.resource('views', 'ViewsController')
    Route.resource('rolesviews', 'RolesViewsController')
})
    .middleware(['auth'])
    .prefix('api/v1/')
    .namespace('App/Controllers/Http/categories')