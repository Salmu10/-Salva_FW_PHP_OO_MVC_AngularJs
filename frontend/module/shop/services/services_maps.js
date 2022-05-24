app.factory('services_maps', ['services', '$rootScope', function(services, $rootScope) {

    let service = {load_map: load_map, load_map_details: load_map_details};

    return service;

    function load_map(data) {

        mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsbXUxMCIsImEiOiJja3p6cG1jcXIwY255M2JwNjZzM28wcTkzIn0.3tzNN-ErSH4vKXouoVYBDA';
        const map = new mapboxgl.Map({
        container: 'maps',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-1.5, 40.5],
        zoom: 4.5
        });
    
        for (row in data) {

            const popup = new mapboxgl.Popup({offset: 25}).setHTML(
                "<div class='popup' id='"+ data[row].id +"'>"+
                    "<img class='popup_img' src='http://localhost/Framework_PHP_OO_MVC_AngularJS/frontend/view/images/img_cars/" + data[row].car_image +"'>" +
                    "<div class='popup_desc_car'><h2>"+ data[row].brand_name + " " + data[row].model + " - " + data[row].price + " €" + "</h2>"+
                        "<h3>"+ data[row].km + " km - " + data[row].type_name + "</h3>"+
                        "<h3>"+ data[row].color + " - " + data[row].city + "</h3>"+
                    "</div>"+
                "</div>"
            );
    
            const marker = new mapboxgl.Marker({color: 'red'})
            .setLngLat([data[row].lng, data[row].lat])
            .setPopup(popup)
            .addTo(map);
        }
    }

    function load_map_details(data) {


        mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsbXUxMCIsImEiOiJja3p6cG1jcXIwY255M2JwNjZzM28wcTkzIn0.3tzNN-ErSH4vKXouoVYBDA';
        const map = new mapboxgl.Map({
            container: 'maps_details',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [data[0][0].lng, data[0][0].lat],
            zoom: 8
        });
    
        const popup = new mapboxgl.Popup({offset: 25}).setHTML(
            "<div class='popup_details' id='"+ data[0][0].id +"'>"+
            "<img class='popup_img' src='http://localhost/Framework_PHP_OO_MVC_AngularJS/frontend/view/images/img_cars/" + data[0][0].car_image +"'>" +
            "<div class='popup_desc_car'><h2>"+ data[0][0].brand_name + " " + data[0][0].model + " - " + data[0][0].price +  " €" + "</h2>"+
                "<h3>"+ data[0][0].km + " km - " + data[0][0].type_name + "</h3>"+
                "<h3>"+ data[0][0].color + " - " + data[0][0].city + "</h3>"+
            "</div>"+
            "</div>"
        );
    
        const marker1 = new mapboxgl.Marker({ color: 'red'})
        .setLngLat([data[0][0].lng, data[0][0].lat])
        .setPopup(popup)
        .addTo(map);
    }
    


}]);