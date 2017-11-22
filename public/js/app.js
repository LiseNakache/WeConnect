var app = angular.module('weConnectApp', ['ui.router', 'ngStorage']);

app.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function ($stateProvider, $urlRouterProvider,$locationProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller : "homeCtrl",
        })
        .state('employers', {
            url: '/employers',
            templateUrl: 'templates/employers.html',
            controller : "employersCtrl",
        })
        .state('employees', {
            url: '/employees',
            templateUrl: 'templates/employee.html',
            controller: 'employeeCtrl',
        })
        .state('employer-signup', {
            url: '/employer-signup',
            templateUrl: '/templates/employer-signup.html',
            controller: 'employerSignUpCtrl'  
        })
        .state('employee-signup', {
            url: '/employee-signup',
            templateUrl: '/templates/employee-signup.html',
            controller: 'employeeSignUpCtrl'
        })

    $urlRouterProvider.otherwise('/home');
    // $locationProvider.html5Mode(true);
}]);
