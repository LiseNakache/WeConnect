app.controller('employeeSignUpCtrl', function ($rootScope, $scope, employeeFact, $location, $stateParams, $state, projectsFact) {

        $scope.skillsArray = [];

        $scope.addToSkillsArray = function(skill) {
          $scope.skillsArray.push(skill);
          $scope.skill = "";
        };

        $scope.addEmployee = function() {
          let employeeInfo = {
            username: $scope.username,
            name: $scope.name,
            location: $scope.location,
            image_url: $scope.image,
            skills: $scope.skillsArray
          };
          employeeFact.addEmployee(employeeInfo)
            .then(function(employee) {
              $scope.employees = employee;
              console.log($scope.employees);
            })
            .catch(function(error) {
              console.log(error);
            });
        };


        // $scope.changeView = function() {
        //   $rootScope.username = $scope.username;
        //   $rootScope.location = $scope.location;
        //   $rootScope.image = $scope.image;
        //   $rootScope.skills = $scope.skills;
        //
        //   // console.log($scope.username,$scope.location,$scope.image,$scope.skills)
        //   console.log('hey');
        //   $state.go("employees");
        //
        //   $scope.addEmployee(employeeInfo);
        // };
      


})