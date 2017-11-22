app.controller('employerSignUpCtrl', function ($rootScope, $scope, employerFact, $location, $stateParams, $state, projectsFact) {
    
        $scope.addEmployers = function() {
          let employerInfo = {
            name: $scope.name,
            username: $scope.username,
            companyName: $scope.companyName,
            image_url: $scope.image,
            location: $scope.location
            // currentProject: $scope.project
          };
          console.log(employerInfo);
          employerFact.addEmployer(employerInfo)
            .then(function(employer) {
              $scope.employers = employer
              console.log($scope.employers);
            })
            .catch(function(error) {
              console.log(error);
            });
        };
})