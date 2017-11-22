app.factory('projectsFact', function($http) {

  //GET ALL THE PROJECTS
  let getProjects = function() {
    return $http.get('/projects')
      .then(function(response) {
        return angular.copy(response.data);
      });
  };

  //ADD A PROKECT WHEN EMPLOYER CREATE A NEW ONE
  let addProject = function(project) {
    return $http.post('/projects', project)
      .then(function(response) {
        return angular.copy(response.data);
      });
  };


  // Gets individual employee object -- NEXT GOAL --
  let getProject = function(id) {
    return $http.get('/project/' + id)
      .then(function(response) {
        return angular.copy(response.data);
      });
  };

  //----NEXT GOALS ----//
  let editProject = function(data, id) {
    return $http.put('/project/' + id + '/update', data)
      .then(function(response) {
        return angular.copy(response.data);
      });
  };
  //Remove an project
  let removeProject = function(id) {
    return $http.get('/project/' + id)
      .then(function(response) {
        return angular.copy(response.data);
      });
  };
  let addProjectEmployer = function(project, id) {
    return $http.post('/projects/employer/' + id, project)
      .then(function(response) {
        console.log('Hello Im back from the factory/server');
        console.log(response);
        return angular.copy(response.data);
      });
  };
  // Adds a new project to the employee allProjects array once he accepts
  let addProjectEmployee = function(projectId, employeeId) {
    return $http.post('/projects/employee/'+ employeeId +'/'+ projectId)
      .then(function(response) {
        console.log('Hello Im back from the server');
        return angular.copy(response.data);
      });
  };
  //////////////////////DEV FUNCTIONS//////////////////
  
  let emptyProjects = function() {
    return $http.delete('/projects')
    .then(function(response) {
      return angular.copy(response.data);
    });
  };
  ////////////////////END OF DEV FUNCTIONS//////////////
  ///////////////////////////////END OF PROJECT FUNCTIONS////////////////////////

  return {
    getProjects: getProjects,
    addProject: addProject,
    getProject: getProject,
    editProject: editProject,
    removeProject: removeProject,
    addProjectEmployer: addProjectEmployer,
    addProjectEmployee: addProjectEmployee,
    emptyProjects: emptyProjects
  };

});
