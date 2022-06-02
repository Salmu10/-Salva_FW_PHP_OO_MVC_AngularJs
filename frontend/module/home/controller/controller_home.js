app.controller('controller_home', function($scope, $window, carrusel, category, news, books, type) { 


  // localStorage.removeItem('token');
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;

    $scope.slide = carrusel;
    $scope.categoria = category;
    $scope.tipo = type;

    var news_array = [];
    var cont = 3;

    news.items.forEach(news => {
      if (news.volumeInfo) {
          const const_news = {
              'title': news.volumeInfo.title,
              'thumbnail': news.volumeInfo.imageLinks.thumbnail,
              'description': news.volumeInfo.description,
              'link': news.accessInfo.webReaderLink
          }
          news_array.push(const_news);
      }
    });

    $scope.MoreNews = function() {

      cont = cont + 2;
      
      if (news_array != undefined) {
        total_news = news_array;
      }

      $scope.news_scope = total_news.slice(0, cont);
    
      if (cont >= 10) {
        var el = angular.element(document.querySelector('#load_news_button'));
        el.remove();
        $scope.no_more_news = true;
      }
    }

    $scope.news_scope = news_array.slice(0, cont);

    // for(row in category){
    //   var content_array = [];
    //   content = category[row].category_name.replace(/_/g, " ");
    //   content_array.push({content});
    //   $scope.categ = content_array;
    // }
    // console.log($scope.categ);

    $scope.redirect_shop = function(key, value) {
      var filters = [];
      localStorage.setItem('currentPage', 'shop-list');
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