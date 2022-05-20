app.factory('services_search', ['services', '$rootScope', function(services, $rootScope) {
    let service = {search_car_type: search_car_type, search_car_brand: search_car_brand, search_autocomplete: search_autocomplete, search: search};
    return service;

    function search_car_type() {
        services.post('search', 'car_type')
       .then(function(response) {
           $rootScope.car_type = response;
       }, function(error) {
            console.log(error);
       }); 
    }

    function search_car_brand(car_type = undefined) {
        services.post('search', 'car_brand', {car_type: car_type})
        .then(function(response) {
            // console.log(response);
            $rootScope.car_brand = response;
        }, function(error) {
            console.log(error);
        });
    }

    function search_autocomplete(car_type = undefined, car_brand = undefined, autocomplete) {
        if(autocomplete != ""){
            services.post('search', 'autocomplete', {car_type: car_type, car_brand: car_brand, complete: autocomplete})
            .then(function(response) {
                $rootScope.complete = response;
            }, function(error) {
                console.log(error);
            });           
        }else{
            $rootScope.complete = [];
        }
    }

    function search(car_type = undefined, car_brand = undefined, complete) {
        console.log('Hola');
        if(car_type || car_brand || complete != undefined && complete != ""){
            var filters = [];
        }
        
        if(car_type){
            // console.log(car_type);
            // filters.push({key: "car_type", value: [car_type]});
            filters.push({"type_name": [car_type]});
        }
        if(car_brand){
            // filters.push({key: "brand_name", value: [car_brand]});
            filters.push({"brand_name": [car_brand]});
        }
        if(complete != undefined && complete != ""){ 
            filters.push({"city": [complete]});    
        }
       
        if(filters){
            localStorage.setItem("filters", JSON.stringify(filters));
            location.href = "#/shop/";
        }
    }

}]);