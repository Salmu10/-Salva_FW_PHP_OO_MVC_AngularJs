app.factory('services_shop', ['services', '$rootScope', function(services, $rootScope) {
    let service = {details: details, filter_search: filter_search, pagination: pagination, change_page: change_page, highlight_filters: highlight_filters, get_filters: get_filters};
    return service;

    function filter_search() {
        var filters = localStorage.getItem('filters');
        // console.log(filters);
        // services.post('shop', 'filters_search', {orderby: "asc", total_prod: 5, items_page: 5, filters: filters})
        services.post('shop', 'filters_search', {filters: filters})
        .then(function(response) {
            pagination(response);
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

        // console.log(filt.type_name);
        // console.log(filters.type_name);

        // localStorage.removeItem('filters');

        angular.forEach(filt.type_name, function (value, key) {
            if (filt.type_name[key].checked) {
                type_name.push(filt.type_name[key].type_name);
                console.log(type_name);
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
                console.log(color);
            }
        });
        if(color.length != 0){
            filters.push({"color":color});
        }

        angular.forEach(filt.extras, function (value, key) {
            if (filt.extras[key].checked) {
                extras.push(filt.extras[key].extras);
                console.log(extras);
            }
        });
        if(extras.length != 0){
            filters.push({"extras":extras});
        }

        angular.forEach(filt.doors, function (value, key) {
            if (filt.doors[key].checked) {
                doors.push(filt.doors[key].doors);
                console.log(doors);
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

    function details(id) {
        services.post('shop', 'details_carousel', {id: id})
        .then(function(response) {
            $rootScope.myInterval = 5000;
            $rootScope.noWrapSlides = false;
            $rootScope.active = 0;
            $rootScope.list = response[0];
            $rootScope.images = response[1][0];
            // load_favs();
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