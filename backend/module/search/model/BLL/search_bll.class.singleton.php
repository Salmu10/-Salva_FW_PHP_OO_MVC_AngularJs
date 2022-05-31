<?php
	class search_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = search_dao::getInstance();
			$this->db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_car_type_BLL() {
			return $this -> dao -> select_car_type($this->db);
		}

		public function get_car_brand_BLL($args) {
			if($args == 1){
				return $this -> dao -> select_car_brand($this->db);
            }else{
				return $this -> dao -> select_car_type_brand($this->db, $args);
            }
		}

        public function get_autocomplete_BLL($args) {
            if (!empty($args['car_type']) && empty($args['car_brand'])){
                return $this -> dao -> select_auto_car_type($this->db, $args['car_type'], $args['car_brand']);
            }else if(empty($args['car_type']) && !empty($args['car_brand'])){
				return $this -> dao -> select_auto_car_brand($this->db, $args['car_brand'], $args['complete']);
            }else if(!empty($args['car_type']) && !empty($args['car_brand'])){
				return $this -> dao -> select_auto_car_type_brand($this->db, $args['car_type'], $args['car_brand'], $args['complete']);
            }else {
				return $this -> dao -> select_auto($this->db, $args['complete']);
            }
		}		
	}
?>