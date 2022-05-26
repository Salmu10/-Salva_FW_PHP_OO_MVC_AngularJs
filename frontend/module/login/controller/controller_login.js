app.controller('controller_login', function($scope, $route, $rootScope, services, services_login, services_social_login, toastr) {
    $scope.regex_username = /^[A-Za-z0-9._-]{5,10}$/;
    $scope.regex_email = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    $scope.regex_password = /^[A-Za-z0-9._-]{5,20}$/;
    
    $scope.login = function(){
        console.log($scope.username);
        console.log($scope.password);
        // services_login.login($scope.username, $scope.password);
    }

    $scope.register = function(){
        console.log($scope.username_reg);
        console.log($scope.pass_reg);
        console.log($scope.pass_reg_2);
        services_login.register($scope.username_reg, $scope.email_reg, $scope.pass_reg);
    }

    let path = $route.current.originalPath.split('/');
    if(path[1] === 'login'){
        $scope.show_login = true;
        $scope.show_forget_password, $scope.show_recover_password = false;
    } 

});
