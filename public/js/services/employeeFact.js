app.factory('employeeFact', function($http) {


  /////////////////////////////EMPLOYEE FUNCTIONS/////////////////////////////
  // Renders employees//
  let getEmployees = function() {
    return $http.get('/employees')
      .then(function(response) {
        return angular.copy(response.data);
      });
  };

  // Adds employee to database after signup
  let addEmployee = function(employee) {
    return $http.post('/employees', employee)
      .then(function(response) {
        return angular.copy(response.data);
      });
  };

  // Gets individual employee object -- NEXT GOAL
  let getEmployee = function(id) {
    return $http.get('/employee/' + id)
      .then(function(response) {
        return angular.copy(response.data);
      });
  };


//--// Edit the information of an employee: WORK FOR THE FUTURE //--// 

  // Further details below
  /* The data param in the function expects an object with the key and value
  of what needs to be changed according the specifications defined in the schema */
 
 //--NEXT GOAL--//
  let editEmployee = function(data, id) {
    return $http.put('/employee/' + id + '/update', data)
      .then(function(response) {
        return angular.copy(response.data);
      });
  };
  //Remove an employee
  let removeEmployee = function(id) {
    return $http.get('/employee/' + id)
      .then(function(response) {
        return angular.copy(response.data);
      });
  };

  ///////////////////DEV FUNCTIONS////////////////
  let emptyEmployees = function() {
    return $http.delete('/employees')
      .then(function(response) {
        return angular.copy(response.data);
      });
  };
  ///////////////////END OF DEV FUNCTIONS/////////
  /////////////////////////////END OF EMPLOYEE FUNCTIONS///////////////////////

  return {
    getEmployees: getEmployees,
    addEmployee: addEmployee,
    getEmployee: getEmployee,
    editEmployee: editEmployee,
    removeEmployee: removeEmployee,
    emptyEmployees: emptyEmployees
  };

});
