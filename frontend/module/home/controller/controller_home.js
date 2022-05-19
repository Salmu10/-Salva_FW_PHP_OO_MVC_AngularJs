app.controller('controller_home', function($scope, $window, carrusel, category, type) { 

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;

    $scope.slide = carrusel;
    $scope.categoria = category;
    $scope.tipo = type;

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
      if (key == "brand_name") {
        filters.push({"brand_name": [value]});
        localStorage.removeItem('filters');
        localStorage.setItem('filters', JSON.stringify(filters));
        location.href = "#/shop";
      } else if(key == "category_name") {
        filters.push({"category_name": [value]});
        localStorage.removeItem('filters');
        localStorage.setItem('filters', JSON.stringify(filters));
        location.href = "#/shop";
      } else if(key == "type_name") {
        filters.push({"type_name": [value]});
        localStorage.removeItem('filters');
        localStorage.setItem('filters', JSON.stringify(filters));
        location.href = "#/shop";
      }

    };
  
});