app.factory('services_localstorage', function() {
    let service = {setSession: setSession, clearSession: clearSession};
    return service;

    function setSession(jwt) {
        localStorage.setItem('token', jwt);
    }

    function clearSession() {
        localStorage.removeItem('token');
    }

});