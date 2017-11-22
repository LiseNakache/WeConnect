app.controller('employeeCtrl', function($scope, $stateParams, $location, projectsFact, employeeFact, $rootScope) {
  $scope.projects = []

    // $scope.showName = $stateParams.showName

  $scope.employees = [];

//GET THE EMPLOYEE PROFILE
  employeeFact.getEmployees()
    .then(function(employee) {
      $scope.employees = employee;
      console.log($scope.employees)
    })
    .catch(function(error) {
      console.log(error);
    });


    //EMPLOYEE SEES THE NEW UPDATED PROJECTS
  projectsFact.getProjects()
  .then(function(projects) {
    $scope.projects = projects;
  })
  .catch(function(error) {
    console.log(error)
  });




    //--NEXT GOAL--//
    
    // $scope.addProject = function(index) {
    //   var id = $scope.projects[index]._id
    //   alert(id)
    //   var employeeId = $scope.employers[0]._id
    //   alert(employeeId)
    //   projectsFact.addProjectEmployee(id,employeeId)
    // };





});
