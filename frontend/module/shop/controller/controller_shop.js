app.controller('controller_shop', function($scope, $rootScope, $route, filters, list, services_shop) {

    // $scope.filter_cars = function (filt) {
    //     console.log(filt);
    // };

    // for (row in filters) {
    //     for (row_inner in filters[row]) {
    //         for (row_inner_inner in filters[row][row_inner]) {
    //             console.log(filters[row][row_inner][row_inner_inner]);
    //             $scope.filters_names = filters[row][row_inner][row_inner_inner];
    //         }
    //     }
    // }

    $scope.filter_products = function (filt) {
        services_shop.get_filters(filt);
    };


    $scope.pagination = function(cars) {
        services_shop.pagination(cars);
    }

    $scope.change_page = function(page) {
        services_shop.change_page(page); 
    }

    $scope.remove_filters = function() {
        localStorage.removeItem('filters');
        location.reload();
    }

    $scope.load_details = function() {
        location.href = "#/car/" + this.car.id;
    };
    
    $scope.back_list = function() {
        location.href = "#/shop";
    };

    let path = $route.current.originalPath.split('/');
    if(path[1] === 'shop'){
        $scope.filters = filters;
        $scope.show_list = true;
        $scope.show_details = false;
        if(localStorage.filters){
            services_shop.filter_search();
            services_shop.highlight_filters();
        }else{
            // console.log(list);
            // $scope.list = list;
            $scope.pagination(list);
        }
    }else if(path[1] === 'car'){
        $scope.show_list = false;
        $scope.show_details = true;
        services_shop.details($route.current.params.token);
    }
});

