angular.module("Githackapp", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "index.html",
                controller: "MainController",
                
            })
            .when("/login", {
                controller: "LoginController",
                templateUrl: "login.html"
            })
            .when("/profile/:profileId", {
                controller: "ProfileController",
                templateUrl: "profile.html"
            })
            .when("/toplist", {
                controller: "TopListController",
                templateUrl: "top-list.html"
            })
           
    });
   
    Githackapp.controller("LoginController", function(contacts, $scope) {




        



    });
    Githackapp.controller("ProfileController", function(contacts, $scope) {
        
        
        
        
        
        
            });
    Githackapp.controller("TopListController", function(contacts, $scope) {
                
                
                
                
                
                
    });
                  



     