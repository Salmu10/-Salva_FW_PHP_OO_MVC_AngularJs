app.factory('services_shop', ['services', '$rootScope', function(services, $rootScope) {
    let service = {details: details, filter_search: filter_search, pagination: pagination, change_page: change_page, highlight_filters: highlight_filters};
    return service;

    function filter_search() {
        var filters = localStorage.getItem('filters');
        console.log(filters);
        // services.post('shop', 'filters_search', {orderby: "asc", total_prod: 5, items_page: 5, filters: filters})
        services.post('shop', 'filters_search', {filters: filters})
        .then(function(response) {
            pagination(response);
        }, function(error) {
            console.log(error);
        });
    }

    function highlight_filters() {
        if (localStorage.getItem('filters')) {
            const filters = JSON.parse(localStorage.getItem('filters'));
            for (row in filters) {
                for (row_inner in filters[row]) {
                    $rootScope[filters[row][row_inner]] = true;
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