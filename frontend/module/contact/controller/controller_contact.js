app.controller('controller_contact', function($scope, services, toastr) {

    $scope.regName = /^[A-Za-z-Ñ-ñ\s]{4,60}$/;
    $scope.regEmail = /^[A-Za-z0-9._-]{4,20}@[a-z]{3,6}.[a-z]{2,4}$/;
    $scope.regMatter = /^[A-Za-z-\s]{6,60}$/;
    $scope.regMessage = /^[A-Za-z0-9-\s.]{15,200}$/;
    
    $scope.send_contact = function() {
        
        let email = {'name': $scope.contact_name, 'email': $scope.contact_email, 'matter': $scope.matter, 'message': $scope.message};
        services.post('contact', 'send_contact_us', email)
        .then(function(response) {
            if (response == 'true') {
                toastr.success('Email sended');
                $scope.full_name = null;
                $scope.user_email = null;
                $scope.email_matter = null;
                $scope.email_message = null;
            }else {
                toastr.error('Error trying to send');
            }
        }, function(error) {
            console.log(error);
        });
    }
});