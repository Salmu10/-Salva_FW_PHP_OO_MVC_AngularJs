app.factory('services_login', ['services', 'services_localstorage', '$rootScope', 'toastr', function(services, services_localstorage, $rootScope, toastr) {
    let service = {login: login, logout: logout, register: register};
    return service;
    
    function login(username, password) {
        // services.post('login', 'login', {username:username, password:password})
        // .then(function(response) {
        //     if(response != "fail") {
        //         toastr.success("Log In");
        //         services_localstorage.setSession(response);
        //     }else {
        //         toastr.error("This account doesn't exist.");
        //     }
        //     location.href = "#/home";
        //     window.location.reload();
        //     return;
        // }, function(error) {
        //     console.log(error);
        // });
    }

    function logout() { 
        services_localstorage.clearSession();
        location.href = "#/home/";
        window.location.reload();
    }

    function register(username, email, password) {

        console.log(username);
        // services.post('login', 'register', {username:username, email:email, password:password})
        // .then(function(response) {
        //     $rootScope.token = response;
        //     location.href = "#/login";
        //     return;
        // }, function(error) {
        //     console.log(error);
        // });
    }

}]);