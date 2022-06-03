app.factory('services_login', ['services', 'services_localstorage', 'services_shop', '$rootScope', 'toastr', function(services, services_localstorage, services_shop, $rootScope, toastr) {
    let service = {login: login, logout: logout, profile: profile, register: register, verify_email: verify_email, recover_password: recover_password, verify_token: verify_token, new_password: new_password};
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
                toastr.success("Log in successfully");
                if(localStorage.getItem('likes') == null) {
                    location.href = "#/home/";
                    window.location.reload();
                } else {
                    // page = localStorage.getItem('page');
                    location.href = "#/shop/";
                    window.location.reload();
                    // services_shop.change_page(page);
                }
                return;
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

    function profile() { 
        location.href = "#/home/";
        var token = localStorage.getItem('token');
        services.post('login', 'data_user', {token: token})
        .then(function(response) {
            $rootScope.profile_menu = true;
            $rootScope.profile_data = response;
        }, function(error) {
            console.log(error);
        });
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
        services.post('login', 'verify_email', {token_email: token})
        .then(function(response) {
            result = JSON.parse(response);
            if(result == "fail"){
                toastr.error("Something went wrong");
            } else {
                toastr.success('Email verified');
                location.href = "#/login/";
                return;
            }
        }, function(error) {
            console.log(error);
        });
    }

    function recover_password(email) {
        services.post('login', 'send_recover_email', {email_forg: email})
        .then(function(response) {
            result = JSON.parse(response);
            if(result == "error"){
                $rootScope.exists_email = true;	
            } else{
                $rootScope.exists_email = false;
                toastr.success("Email sended");
                location.href = "#/login/";
                return;
            }
        }, function(error) {
            console.log(error);
        });
    }

    function verify_token(token_email, password) {
        new_pass = password;
        services.post('login', 'verify_token', {token_email: token_email})
        .then(function(response) {
            result = JSON.parse(response);
            if(result == "verify"){
                new_password(token_email, new_pass);
            }else {
                console.log("error");
            }
        }, function(error) {
            console.log(error);
        });
    }

    function new_password(token_email, password) {
        services.post('login', 'new_password', {token_email: token_email, password: password})
        .then(function(response) {
            result = JSON.parse(response);
            if(result == "done"){
                toastr.success('New password changed');
                location.href = "#/login ";
                return;
            } else {
                toastr.error('Error seting new password');
            }
        }, function(error) {
            console.log(error);
        });
    }

}]);