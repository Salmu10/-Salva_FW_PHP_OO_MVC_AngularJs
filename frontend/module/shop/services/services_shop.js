app.factory('services_shop', ['services', '$rootScope', function(services, $rootScope) {

    let service = {details: details, filter_search: filter_search, pagination: pagination, change_page: change_page, highlight_filters: highlight_filters, 
        get_filters: get_filters, orderby: orderby, visits: visits, cars: cars, load_more: load_more};
    let cont = 0;

    return service;

    function filter_search() {
        var filters = localStorage.getItem('filters');
        var orderby = localStorage.getItem('orderby');
        services.post('shop', 'filters_search', {orderby: orderby, filters: filters})
        .then(function(response) {
            pagination(response);
            // services_maps.load_map(list);
        }, function(error) {
            console.log(error);
        });
    }

    function get_filters(filt) {

        var type_name = [];
        var category_name = [];
        var color = [];
        var extras = [];
        var doors = [];
        var filters = [];  

        // localStorage.removeItem('filters');

        angular.forEach(filt.type_name, function (value, key) {
            if (filt.type_name[key].checked) {
                type_name.push(filt.type_name[key].type_name);
            }
        });
        if(type_name.length != 0){
            filters.push({"type_name":type_name});
        }

        angular.forEach(filt.category_name, function (value, key) {
            if (filt.category_name[key].checked) {
                category_name.push(filt.category_name[key].category_name);
                console.log(category_name);
            }
        });
        if(category_name.length != 0){
            filters.push({"category_name":category_name});
        }

        angular.forEach(filt.color, function (value, key) {
            if (filt.color[key].checked) {
                color.push(filt.color[key].color);
            }
        });
        if(color.length != 0){
            filters.push({"color":color});
        }

        angular.forEach(filt.extras, function (value, key) {
            if (filt.extras[key].checked) {
                extras.push(filt.extras[key].extras);
            }
        });
        if(extras.length != 0){
            filters.push({"extras":extras});
        }

        angular.forEach(filt.doors, function (value, key) {
            if (filt.doors[key].checked) {
                doors.push(filt.doors[key].doors);
            }
        });
        if(doors.length != 0){
            filters.push({"doors":doors});
        }

        if(filters.length != 0){
            localStorage.setItem('filters', JSON.stringify(filters));
        }

        location.href = "#/shop/";
    }

    function highlight_filters() {
        if (localStorage.getItem('filters')) {
            const filters = JSON.parse(localStorage.getItem('filters'));
            for (row in filters) {
                for (row_inner in filters[row]) {
                    for (row_inner_inner in filters[row][row_inner]) {
                        $rootScope[filters[row][row_inner][row_inner_inner]] = true;
                    }
                }
            }
        }
    }

    function orderby(order) {
    
        var orderby = [];
        let orderby_val = order;
    
        localStorage.setItem('orderby', orderby);

        if (orderby_val == 1){
            orderby = "price DESC,";
        } else if (orderby_val == 2){
            orderby = "price ASC,";
        } else {
            orderby = "";
        }

        localStorage.setItem('orderby', orderby);
    }

    function details(id) {
        services.post('shop', 'details_carousel', {id: id})
        .then(function(response) {
            $rootScope.myInterval = 5000;
            $rootScope.noWrapSlides = false;
            $rootScope.active = 0;
            $rootScope.list = response[0];
            $rootScope.images = response[1][0];
            visits(id);
            cars(response);
            // load_favs();
        }, function(error) {
            console.log(error);
        });
    }

    function cars(car_data) {
        services.post('shop', 'cars', {category: car_data[0][0].category, type: car_data[0][0].type, id: car_data[0][0].id})
        .then(function(response) {
            // $rootScope.related = response.slice(0, 3);
            // cont = 0;
            load_more(response);
        }, function(error) {
            console.log(error);
        });
    }

    function load_more(car) {

        cont = cont + 3;

        if (car != undefined) {
            related_car = car;
        }

        $rootScope.related = related_car.slice(0, cont);
        
        if (cont >= related_car.length) {
            var el = angular.element(document.querySelector('#load_more_button'));
            el.remove();
        }
    }

    function visits(id) {
        services.post('shop', 'most_visit', {id: id})
        .then(function(response) {
            console.log("Visits updated");
        }, function(error) {
            console.log(error);
        });
    }

    function pagination(cars) {
        $rootScope.cars = cars;
        $rootScope.page = 1;
        $rootScope.total_page = Math.ceil(cars.length/5);
        $rootScope.pages = [];
        for(i = 1; i <= $rootScope.total_page; i++){
            $rootScope.pages.push(i);
        }
        change_page($rootScope.page);
    }

    function change_page(page) {
        $rootScope.show1 = true;
        $rootScope.show2 = true;

        $rootScope.current_page = page;
        $rootScope.list =  $rootScope.cars.slice((($rootScope.current_page - 1) * 5), (($rootScope.current_page) * 5));
        if(page >= $rootScope.total_page ){
            $rootScope.show2 = false;
        } 
        if(page <= 1){
            $rootScope.show1 = false;
        }
    }

}]);