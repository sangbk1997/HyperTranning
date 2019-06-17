myApp.config(function($routeProvider){
    $routeProvider
        .when('/user',{
            templateUrl: '/static/app/user/list.html',
            controller: 'userController'
        })
        .when('/user/insert',{
            templateUrl: '/static/app/user/insert.html',
            controller: 'userController'
        })
        .when('/user/myLogin',{
            templateUrl: '/static/app/user/login.html',
            controller: 'userController'
        })
        .when('/user/myLogout',{
            templateUrl: '/static/app/user/login.html',
            controller: 'userController'
        })
        .when('/user/invalidLogin',{
            templateUrl: '/static/app/user/login.html',
            controller: 'userController'
        })
        .when('/role',{
            templateUrl: '/static/app/role/list',
            controller: 'roleController'
        })

        .otherwise(
            { redirectTo: '/'}
        );
});

