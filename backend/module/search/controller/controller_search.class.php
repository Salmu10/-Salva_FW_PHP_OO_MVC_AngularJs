<?php
    class controller_search {
        function car_type() {
            echo json_encode(common::load_model('search_model', 'get_car_type'));
        }

        function car_brand() {
            echo json_encode(common::load_model('search_model', 'get_car_brand', $_POST['car_type']));
        }
        
        function autocomplete() {
            echo json_encode(common::load_model('search_model', 'get_autocomplete', $_POST['auto']));
        }
    }
?>