<?php
    class search_model {
        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = search_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_car_type() {
            return $this -> bll -> get_car_type_BLL();
        }

        public function get_car_brand($args) {
            return $this -> bll -> get_car_brand_BLL($args);
        }

        public function get_autocomplete($args) {
            return $this -> bll -> get_autocomplete_BLL($args);
        }
    }