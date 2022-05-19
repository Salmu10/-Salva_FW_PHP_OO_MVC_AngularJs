app.factory('services_shop', ['services', '$rootScope', function(services, $rootScope) {
    let service = {details: details, filter_search: filter_search};
    return service;

    function filter_search(filters) {
        // services.post('shop', 'filters_search', {orderby: "asc", total_prod: 5, items_page: 5, filters: filters})
        services.post('shop', 'filters_search', {filters: filters})
        .then(function(response) {
            console.log(response);
        //    pagination(response);
        }, function(error) {
            console.log(error);
        });
    }

    function details(id) {
        services.post('shop', 'details_carousel', {id: id})
        .then(function(response) {
            console.log(response[1]);
            $rootScope.list = response[0];
            // $rootScope.images = response[1];
            // load_favs();
        }, function(error) {
            console.log(error);
        });
    }

}]);