app.controller('controller_home', function($scope, $window, carrusel, category, type) { 

$scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;

    $scope.slide = carrusel;
    $scope.categoria = category;
    $scope.tipo = type;

   

    // window.addEventListener('load', function(){
    // angular.element($window).on('load', function() {
    //   new Glider(document.querySelector('.carrusel_list'),{ 
    //       slidesToShow: 1,
    //       dots: '.carrusel_indicator',
    //       draggable: true,
    //   });
    // });


    // for(row in category){
    //   var content_array = [];
    //   content = category[row].category_name.replace(/_/g, " ");
    //   content_array.push({content});
    //   $scope.categ = content_array;
    // }
    // console.log($scope.categ);
    

    $scope.redirect_shop = function(key, value) {
      var filters = [];
      // filters.push({key, value});
      // localStorage.removeItem('filters');
      // localStorage.setItem('filters', JSON.stringify(filters));
      localStorage.setItem('currentPage', 'shop-list');
      // location.href = "#/shop";
      // $location.path('/#shop');
console.log(key);
      filters.push({key, value});
      filters.push({"brand_name":[this.getAttribute('id')]});
      localStorage.removeItem('filters');
      localStorage.setItem('filters', JSON.stringify(filters));

    };
  
});