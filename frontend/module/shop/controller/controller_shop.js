app.controller('controller_shop', function($scope, $rootScope, $route, filters, list, services_shop) {

    var type_name = [];
    var category_name = [];
    var color = [];
    var extras = [];
    var doors = [];
    // var filters = [];  

    $scope.filter_products = function(value, key) {
        var filter_type = [];

        if(key == "type_name"){
            if(!type_name.includes(value)){
                type_name.push(value);
            }else{
                i = type_name.indexOf(value);
                type_name.splice( i, 1 );
            }
        }else if(key == "category_name"){
            if(!category_name.includes(value)){
                category_name.push(value);
            }else{
                i = category_name.indexOf(value);
                category_name.splice( i, 1 );
            }
        }else if(key == "color"){
            if(!color.includes(value)){
                color.push(value);
            }else{
                i = color.indexOf(value);
                color.splice( i, 1 );
            }
        }else if(key == "extras"){
            if(!extras.includes(value)){
                extras.push(value);
            }else{
                i = extras.indexOf(value);
                extras.splice( i, 1 );
            }
        }else if(key == "doors"){
            if(!doors.includes(value)){
                doors.push(value);
            }else{
                i = doors.indexOf(value);
                doors.splice( i, 1 );
            }
        }

        if(talla.length != 0){
            filter_type.push({key : 'type_name', value : type_name});
        }
        if(color.length != 0){
            filter_type.push({key : 'category_name', value : category_name});
        }
        if(categoria.length != 0){
            filter_type.push({key : 'color', value : color});
        }
        if(categoria.length != 0){
            filter_type.push({key : 'extras', value : extras});
        }
        if(categoria.length != 0){
            filter_type.push({key : 'doors', value : doors});
        }

        console.log(filter_type.length);
        if(filter_type.length == 0){
            $scope.pagination(list);
        }else{
            services_shop.filter_search(filter_type);
        }
    }

    $scope.pagination = function(cars) {
        services_shop.pagination(cars);
    }

    // $scope.change_page = function(page) {
    //     services_shop.change_page(page); 
    // }

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

