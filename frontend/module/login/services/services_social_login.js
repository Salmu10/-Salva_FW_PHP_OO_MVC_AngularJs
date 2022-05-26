app.factory('services_social_login', ['services', 'services_localstorage', 'toastr', function(services, services_localstorage, toastr) {
    let service = {initialize:initialize, google:google, github:github, social_login:social_login};
    return service;

    function initialize() {
        // var firebaseConfig = {
        //     apiKey: "AIzaSyBOo5emMZXMi0T411OPKgoDGcvDl_IKSno",
        //     authDomain: "test-php-js-7fc12.firebaseapp.com",
        //     projectId: "test-php-js-7fc12",
        //     storageBucket: "test-php-js-7fc12.appspot.com",
        //     messagingSenderId: "495514694215",
        //     appId: "1:495514694215:web:b183cd7f513ce8b0d6f762",
        //     measurementId: "G-JXEGLTGLTC"
        // };
        // firebase.initializeApp(firebaseConfig);
    }

    function google() {
        // let provider = new firebase.auth.GoogleAuthProvider();
        // provider.addScope('email');
        // let authService = firebase.auth();

        // authService.signInWithPopup(provider)
        // .then(function(result) {
        //     social_login({id:result.user.uid, username:result.user.displayName, email:result.user.email, avatar:result.user.photoURL});
        // })
        // .catch(function(error) {
        //     console.log('Se ha encontrado un error:', error);
        // });
    }

    function github() {
        // let provider = new firebase.auth.GithubAuthProvider();
        // provider.addScope('email');
        // let authService = firebase.auth();
        
        // authService.signInWithPopup(provider)
        // .then(function(result) {
        //     social_login({id:result.user.uid, username:result.user.displayName, email:result.user.email, avatar:result.user.photoURL});
        // })
        // .catch(function(error) {
        //     console.log('Se ha encontrado un error:', error);
        // });
    }

    function social_login(profile) {

        console.log(profile);
        // services.post('login', 'social_login', {profile: profile})
        // .then(function(response) {
        //     if(response != "fail") {
        //         toastr.success("Log In");
        //         services_localstorage.setSession(response);
        //     }else {
        //         toastr.error("This account doesn't exist.");
        //     }
        //     location.href = "#/home";
        //     window.location.reload();
        // }, function(error) {
        //     console.log(error);
        // });
    }// end_socialLogIn
}]);
