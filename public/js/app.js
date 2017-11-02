
var Githackapp = angular.module('Githackapp',  ['ngRoute','satellizer','zingchart-angularjs']);


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
        
        
        $scope.myJson = {
            globals: {
                shadow: false,
                fontFamily: "Verdana",
                fontWeight: "100"
            },
            type: "pie",
            backgroundColor: "#f5f5f5",
    
            legend: {
                layout: "x5",
                position: "50%",
                borderColor: "transparent",
                marker: {
                    borderRadius: 10,
                    borderColor: "transparent"
                }
            },
            tooltip: {
                text: "%v requests"
            },
            plot: {
                refAngle: "-90",
                borderWidth: "0px",
                valueBox: {
                    placement: "in",
                    text: "%npv %",
                    fontSize: "15px",
                    textAlpha: 1,
                }
            },
            series: [{
                text: "JavaScript",
                values: [40],
                backgroundColor: "#f14e4e  #f14e4e ",
            }, {
                text: "AngularJS",
                values: [20],
                backgroundColor: "#698b69 #698b69"
            }, {
                text: "PHP",
                values: [5],
                backgroundColor: "#FDAA97 #FC9B87"
            }, {
                text: "CSS",
                values: [10],
                backgroundColor: "#28C2D1"
            }, {
                text: "Node",
                values: [25],
                backgroundColor: "#D2D6DE",
            }]
        };
    });

    
       
        
    });





Githackapp.controller("TopListController", function ($http, $scope) {

    $http.get('http://localhost:8080/profiles/').success(function(data) {
        $scope.profiles = data;
        
    });


});









