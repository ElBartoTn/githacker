
var Githackapp = angular.module('Githackapp',  ['ngRoute','satellizer']);


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
Githackapp.config(function($authProvider) {
    
    $authProvider.github({
        clientId: "0072677d119c0d0e83eb",
        redirectUri: "http://localhost:8080/",
        url: "http://localhost:8080/auth/github",
      });
    
      $authProvider.httpInterceptor = true;
    
    
      });


  

Githackapp.controller("LoginController", function ($http, $scope,$auth,$location) {

    $scope.authenticate = function() {
        $auth.authenticate('github')
            .then(function(response) {
                $location.path('/');
            })
            .catch(function(response) {
               
            });
    }



$scope.calculScore=function(username)
{
    $http.get('http://localhost:8080/profiles/'+username).success(function(data) {
        $scope.p = data;
        $scope.forknbr=data.forkNbr;
        console.log( $scope.forknbr);
        $scope.projectNbr=data.projectNbr;
        console.log(  $scope.projectNbr);
        $scope.totalscore=parseInt($scope.forknbr)+parseInt($scope.projectNbr);
        console.log($scope.totalscore);
    });
   
}





});
Githackapp.controller("ProfileController", function ($http, $scope,$routeParams) {
    $http.get('http://localhost:8080/profiles/'+$routeParams.username).success(function(data) {
        $scope.p = data;
    });

    
       
        
    });





Githackapp.controller("TopListController", function ($http, $scope) {

    $http.get('http://localhost:8080/profiles/').success(function(data) {
        $scope.profiles = data;
        
    });


});









