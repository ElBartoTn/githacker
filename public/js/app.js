
var Githackapp = angular.module('Githackapp',  ['ngRoute']);


Githackapp.config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "index.html",
                controller: "MainController",

            })
            .when("/login", {
                controller: "LoginController",
                templateUrl: "login.html"
            })
            .when("/profile/:username", {
                controller: "ProfileController",
                templateUrl: "profile.html"
            })
            .when("/toplist", {
                controller: "TopListController",
                templateUrl: "top-list.html"
            })

        });
   

Githackapp.controller("LoginController", function ($http, $scope) {







});
Githackapp.controller("ProfileController", function ($http, $scope,$routeParams) {
    $http.get('http://localhost:8080/profiles/'+$routeParams.username).success(function(data) {
        $scope.p = data;
       
        
    });
       
        
    });





Githackapp.controller("TopListController", function (contacts, $scope) {






});









