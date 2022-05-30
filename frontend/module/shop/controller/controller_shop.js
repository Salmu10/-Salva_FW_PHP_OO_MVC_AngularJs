app.controller('controller_shop', function($scope, $rootScope, $route, filters, list, services_shop, services_maps) {

    $scope.filter_products = function (filt) {
        services_shop.get_filters(filt);
    };

    $scope.pagination = function(cars) {
        services_shop.pagination(cars);
    }

    $scope.change_page = function(page) {
        services_shop.change_page(page); 
    }

    $scope.orderby = function(order) {
        services_shop.orderby(order); 
    }

    $scope.orderby_button = function() {
        location.href = "#/shop/";
    }

    $scope.remove_filters = function() {
        localStorage.removeItem('filters');
        location.reload();
    }

    $scope.load_details = function() {
        location.href = "#/car/" + this.car.id;
    };

    $scope.load_more = function() {
        services_shop.load_more();
    };
    
    $scope.back_list = function() {
        location.href = "#/shop/";
    };

    $scope.add_favs = function() {
        if(localStorage.token){
            services_shop.add_favs(this.car.id, localStorage.token);
            if(this.car.favs_class == "bxs-heart"){
                this.car.favs_class = "bx-heart";
            }else{
                this.car.favs_class = "bxs-heart";
            }
        }else{
            location.href = "#/login/";
        }
    }

    let path = $route.current.originalPath.split('/');
    if(path[1] === 'shop'){
        $scope.filters = filters;
        $scope.show_list = true;
        $scope.show_paginacion = true;
        $scope.show_details = false;
        if(localStorage.filters){
            services_shop.filter_search();
            services_shop.highlight_filters();
        }else{
            $scope.pagination(list);
            services_maps.load_map(list);
        }
    }else if(path[1] === 'car'){
        $scope.show_list = false;
        $scope.show_paginacion = false;
        $scope.show_details = true;
        services_shop.details($route.current.params.token);
    }
});

