app.factory('employerFact', function($http) {

  //ALL THE EMPLOYEES PROFIL//

  var allEmployees = []

  /////////////////////////////EMPLOYER FUNCTIONS//////////////////////////////
  //Render the employers
  let getEmployers = function() {
    return $http.get('/employers')
      .then(function(response) {
        return angular.copy(response.data);
      });
  };

  // Adds employee to database after signup
  let addEmployer = function(employer) {
    return $http.post('/employers', employer)
      .then(function(response) {
        return angular.copy(response.data);
      });
  };
  // Gets individual employee object
  let getEmployer = function(id) {
    return $http.get('/employer/' + id)
      .then(function(response) {
        return angular.copy(response.data);
      });
  };
  // Edit the information of an employer

  // Further details below
  /* The data param in the function expects an object with the key and value
  of what needs to be changed according the specifications defined in the schema
  */
  let editEmployer = function(data, id) {
    return $http.put('/employer/' + id + '/update', data)
      .then(function(response) {
        return angular.copy(response.data);
      });
  };
  //Remove an employer
  let removeEmployer = function(id) {
    return $http.get('/employer/' + id)
      .then(function(response) {
        return angular.copy(response.data);
      });
  };
  ///////////////////DEV FUNCTIONS////////////////
  let emptyEmployers = function() {
    return $http.delete('/employers')
    .then(function(response) {
      return angular.copy(response.data);
    });
  };
  ///////////////////END OF DEV FUNCTIONS/////////
  //////////////////////////////END OF EMPLOYER FUNCTIONS///////////////////////

  return {
    getEmployers: getEmployers,
    addEmployer: addEmployer,
    getEmployer: getEmployer,
    editEmployer: editEmployer,
    removeEmployer: removeEmployer,
    allEmployees: allEmployees,
    emptyEmployers: emptyEmployers
  };

});
