app.factory('services_secure_login', ['services', '$rootScope', 'services_login', function(services, $rootScope, services_login) {
    let service = {protecturl: protecturl, refresh_token: refresh_token, refresh_session: refresh_session, protect_activity: protect_activity, token_expires: token_expires};
    return service;

    function protecturl() {
        var token = localStorage.getItem('token');
        services.post('login', 'controluser', {token: token})
        .then(function(response) {
            result = JSON.parse(response);
            if (result == "match"){
                console.log(result);
            }else if (result == "not_match"){
                toastr.error("Debes realizar login");
                services_login.log_out();
            }
        }, function(error) {
            console.log(error);
        });
    }

    function protect_activity() {
        setInterval(function(){
            services.post('login', 'activity')
            .then(function(response) {
                result = JSON.parse(response);
				if(result == "inactivo"){
					toastr.error("Tiempo agotado, porfavor inicie sesión de nuevo");
                    services_login.log_out();
				}
            }, function(error) {
                console.log(error);
            });
        }, 600000);
    }

    function token_expires() {
        setInterval(function(){
            if(localStorage.getItem('token') == null){
                console.log('Not registred');
            } else {
                var token = localStorage.getItem('token');
                services.post('login', 'token_expires', {token: token})
                .then(function(response) {
                    result = JSON.parse(response);
                    if (result == "activo"){
                        console.log(result);
                    }else if (result == "inactivo"){
                        toastr.error("Tiempo agotado, porfavor inicie sesión de nuevo");
                        services_login.log_out();
                    }	
                }, function(error) {
                    console.log(error);
                });
            }
        }, 600000);
    }

    function refresh_token() {
        var token = localStorage.getItem('token');
        setInterval(function() {
            services.post('login', 'refresh_token', {token: token})
            .then(function(response) {
                result = JSON.parse(response);
                localStorage.setItem('token', result);
            }, function(error) {
                console.log(error);
            });
        }, 600000);
    }

    function refresh_session() {
        setInterval(function() {
            services.post('login', 'refresh_cookie')
            .then(function(response) {
                console.log("$Session updated");
            }, function(error) {
                console.log(error);
            });
        }, 600000);
    }

}])