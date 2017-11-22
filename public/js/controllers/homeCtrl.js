app.controller('homeCtrl', function($rootScope, $scope, employerFact, employeeFact, $state) {

  $scope.changeView = function() {
    $rootScope.username = $scope.username;
    $rootScope.location = $scope.location;
    $rootScope.image = $scope.image;
    $rootScope.skills = $scope.skills;

    // console.log($scope.username,$scope.location,$scope.image,$scope.skills)
    console.log('hey');
    $state.go("employees");

    $scope.addEmployee();
  };


  $scope.addEmployers = function() {
    var employerInfo = {
      username: $scope.name,
      companyName: $scope.company,
      image_url: $scope.image,
      currentProject: $scope.project
    };
    $scope.name = "";
    $scope.company = "";
    $scope.company = "";
    console.log($scope.name);
    employerFact.addEmployer(employerInfo)
      .then(function(employer) {
        // $scope.employers = employer
        console.log($scope.employers);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
});
