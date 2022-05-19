app.controller('controller_home', function($scope, $window, carrusel, category, type) {  
    
    $scope.slide = carrusel;
    $scope.categoria = category;
    $scope.tipo = type;

    // $scope.myInterval = 5000;
    // $scope.noWrapSlides = false;

    // window.addEventListener('load', function(){
    angular.element($window).on('load', function() {
      new Glider(document.querySelector('.carrusel_list'),{ 
          slidesToShow: 1,
          dots: '.carrusel_indicator',
          draggable: true,
      });
    });

    // for(row in category){
    //   $rootScope.list_products[row].favs_class = "bx-heart";
    //   var product = $rootScope.list_products[row];
    // }
  
    $scope.redirect_shop = function(key, value) {
      var filters = [];
      filters.push({key, value});
      localStorage.removeItem('filters');
      localStorage.setItem('filters', JSON.stringify(filters));
      localStorage.setItem('currentPage', 'shop-list');
      location.href = "#/shop";
      // $location.path('/#shop');
    };
  
});