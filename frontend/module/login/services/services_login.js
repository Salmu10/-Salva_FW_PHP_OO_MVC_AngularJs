app.factory('services_login', ['services', 'services_localstorage', '$rootScope', 'toastr', function(services, services_localstorage, $rootScope, toastr) {
    let service = {login: login, logout: logout, register: register, verify_email: verify_email};
    return service;
    
    function login(username, password) {
        services.post('login', 'login', {username: username, password: password})
        .then(function(response) {
            result = JSON.parse(response);
            if(result == "user error"){		
                $rootScope.duplicate_user = true;
                $rootScope.wrong_password = false;
            } else if (result == "error"){
                $rootScope.wrong_password = true;
                $rootScope.duplicate_user = false;
            } else if (result == "activate error"){
                toastr.error("Verify the email");            
            } else {
                $rootScope.duplicate_user = false;
                $rootScope.wrong_password = false;
                services_localstorage.setSession(result);
                toastr.success("Inicio de sesión realizado");
                location.href = "#/home/";
                window.location.reload();
                return;
                // if(localStorage.getItem('likes') == null) {
                //     setTimeout('window.location.href = friendlyURL("?module=home&op=view")', 1000);
                // } else {
                //     console.log(localStorage.getItem('product'));
                //     setTimeout('window.location.href = friendlyURL("?module=shop&op=view")', 1000);
                // }
            }	
        }, function(error) {
            console.log(error);
        });
    }

    function logout() { 
        services_localstorage.clearSession();
        location.href = "#/home/";
        window.location.reload();
    }

    function register(username_reg, pass_reg, email_reg) {
        services.post('login', 'register', {username_reg: username_reg, pass_reg: pass_reg, email_reg: email_reg})
        .then(function(response) {
            result = JSON.parse(response);
            if(result == "error"){
                $rootScope.duplicate_username = true;
                $rootScope.duplicate_email = true;
            } else {
                $rootScope.duplicate_username = false;
                $rootScope.duplicate_email = false;
                $rootScope.token = result;
                toastr.success("Email sended");
                location.href = "#/login/";
                return;
            }
        }, function(error) {
            console.log(error);
        });
    }

    function verify_email(token) {
        console.log(token);
        // services.post('login', 'verify_email', {token:token})
        // .then(function(response) {
        //     $rootScope.token = response;
        //     location.href = "#/login ";
        //     return;
        // }, function(error) {
        //     console.log(error);
        // });
    }

}]);