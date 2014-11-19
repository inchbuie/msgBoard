// home-index.js

var module = angular.module("homeIndex", ['ngRoute']);

//configure client-side routing with angular
module.config(
    function ($routeProvider) {
        $routeProvider.when("/", {
            controller: topicsController, // when controller looks like this
            templateUrl: "/templates/topicsView.html" // use this url fragment to load html template from server
        });

        $routeProvider.when("/newmessage", {
            controller: newTopicController, 
            templateUrl: "templates/newTopicView.html" 
        });

        $routeProvider.otherwise({
            redirectTo: "/"
        }); //default route
    });


function topicsController($scope, $http) {
    console.log("inside the topics controller");

    $scope.data = [];
    $scope.isBusy = true;

    $http.get("/api/v1/topics?includeReplies=true")
        .then(
        function (result) {
            //succesful
            angular.copy(result.data, $scope.data);
        },
        function () {
            //error
            console.log("error loading topics");
        })
        .then(function () {
            // after either error or success
            $scope.isBusy = false;
        });
}


function newTopicController($scope, $http, $window) {
}