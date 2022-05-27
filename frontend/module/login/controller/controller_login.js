app.controller('controller_login', function($scope, $route, $rootScope, services, services_login, services_social_login, toastr) {
    $scope.regex_username = /^[A-Za-z0-9._-]{5,10}$/;
    $scope.regex_email = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    $scope.regex_password = /^[A-Za-z0-9._-]{5,20}$/;


    $scope.login = function(){
        services_login.login($scope.username, $scope.password);
    }

    $scope.register = function(){
        if ($scope.pass_reg != $scope.pass_reg_2) {
            $scope.pass_equal = true;
        } else {
            $scope.pass_equal = false;
            services_login.register($scope.username_reg, $scope.pass_reg, $scope.email_reg);
        }
    }

    let path = $route.current.originalPath.split('/');
    if(path[1] === 'login'){
        $scope.show_login = true;
        $scope.show_forget_password, $scope.show_recover_password = false;
    }
    else if(path[1] === 'logout'){
        services_login.logout();
    }
    else if (path[1] === 'verify') {
        services_login.verify_email($route.current.params.token);
    }

});
