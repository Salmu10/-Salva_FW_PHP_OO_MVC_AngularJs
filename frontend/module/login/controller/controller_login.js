app.controller('controller_login', function($scope, $route, $rootScope, services, services_login, services_social_login, toastr) {
    $scope.regex_username = /^[A-Za-z0-9._-]{5,10}$/;
    $scope.regex_email = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    $scope.regex_password = /^[A-Za-z0-9._-]{5,20}$/;

    if (!$rootScope.ini_social_login) {
        $rootScope.ini_social_login = 0;
    }
    if ($rootScope.ini_social_login == 0) {
        services_social_login.initialize();
        $rootScope.ini_social_login = 1;
    }

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

    $scope.login_google = function() {
        services_social_login.google();
    };

    $scope.login_github = function() {
        services_social_login.github();
    };

    $scope.recover_password = function(){
        if($scope.email_forg != undefined){
            services_login.recover_password($scope.email_forg);
        }
    }

    $scope.new_password = function(){
        if ($scope.pass_rec != $scope.pass_rec_2) {
            $scope.pass_equal_rec = true;
        } else {
            $scope.pass_equal_rec = false;
            console.log($scope.pass_rec);
            if($scope.pass_rec != undefined){
                services_login.verify_token($route.current.params.token, $scope.pass_rec);
            }
        }
    }

    let path = $route.current.originalPath.split('/');
    if(path[1] === 'login') {
        $scope.show_login = true;
        $scope.show_forget_password, $scope.show_recover_password = false;
    }else if(path[1] === 'profile') {
        services_login.profile();
    }else if(path[1] === 'logout') {
        services_login.logout();
    }else if (path[1] === 'verify') {
        services_login.verify_email($route.current.params.token);
    }else if(path[1] === 'recover'){
        if($route.current.params.token){
            $scope.show_recover_password = true;
            $scope.show_login, $scope.show_forget_password = false;
        }else{
            $scope.show_forget_password = true;
            $scope.show_login, $scope.show_recover_password = false;
        }
    } 

});
