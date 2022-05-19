<?php
    class controller_home {

        function carrusel() {
            echo json_encode(common::load_model('home_model', 'get_carrusel'));
        }

        function category() {
            // echo json_encode('Hola');
            echo json_encode(common::load_model('home_model', 'get_category'));
        }
        
        function type() {
            echo json_encode(common::load_model('home_model', 'get_type'));
        }
    }
?>