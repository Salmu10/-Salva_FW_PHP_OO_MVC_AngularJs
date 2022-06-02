var app = angular.module('/Framework_PHP_OO_MVC_AngularJS', ['ngRoute', 'toastr', 'ui.bootstrap']);
// var app = angular.module('/Framework_PHP_OO_MVC_AngularJS', ['ngRoute', 'toastr']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "frontend/module/home/view/home.html", 
            controller: "controller_home",
            resolve: {
                carrusel: function (services) {
                    return services.get('home','carrusel');
                },
                category: function (services) {
                    return services.get('home','category');
                },
                type: function (services) {
                    return services.get('home','type');
                }
            }
        }).when("/shop", {
            templateUrl: "frontend/module/shop/view/shop.html", 
            controller: "controller_shop",
            resolve: {
                filters: function (services) {
                    return services.get('shop', 'filters');
                },
                list: function (services) {
                    return services.get('shop', 'list');
                }
            }
        }).when("/car/:token", {
            templateUrl: "frontend/module/shop/view/shop.html", 
            controller: "controller_shop",
            resolve: {
                filters: function () {},
                list: function () {}
            }
        }).when("/contact", {
            templateUrl: "frontend/module/contact/view/contact.html",
            controller: "controller_contact"
        }).when("/login", {
            templateUrl: "frontend/module/login/view/login.html", 
            controller: "controller_login"
        }).when("/logout", {
            templateUrl: "frontend/module/login/view/login.html", 
            controller: "controller_login"
        }).when("/verify/:token", {
            templateUrl: "frontend/module/login/view/login.html", 
            controller: "controller_login"
        }).when("/recover", {
            templateUrl: "frontend/module/login/view/login.html", 
            controller: "controller_login"
        }).when("/recover/:token", {
            templateUrl: "frontend/module/login/view/login.html", 
            controller: "controller_login"
        }).otherwise("/home", {
            templateUrl: "frontend/module/home/view/home.html", 
            controller: "controller_home",
            resolve: {
                carrusel: function (services) {
                    return services.get('home','carrusel');
                },
                category: function (services) {
                    return services.get('home','category');
                },
                type: function (services) {
                    return services.get('home','type');
                }
            }
        });
}]);

app.run(function($rootScope, services, services_search, services_secure_login){

    if(localStorage.token){
        $rootScope.menu = true;
    }else{
        $rootScope.menu = false;
    }
    
    services_secure_login.protecturl();
    services_secure_login.protect_activity();
    services_secure_login.token_expires();
    services_secure_login.refresh_token();
    services_secure_login.refresh_session();
    
    services_search.search_car_type();
    services_search.search_car_brand();

    $rootScope.click_car_brand = function(car_type){
        services_search.search_car_brand(car_type);
    }

    $rootScope.click_autocomplete = function(car_type = undefined, car_brand = undefined, autocomplete){
        services_search.search_autocomplete(car_type, car_brand, autocomplete);
    }

    $rootScope.click_search = function(car_type = undefined, car_brand = undefined, autocomplete = undefined){ 
        services_search.search(car_type, car_brand, autocomplete);
    }
});