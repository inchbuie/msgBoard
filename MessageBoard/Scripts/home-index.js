// home-index.js
function homeIndexController($scope, $http) {
    //console.log("inside the home index controller");

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

angular.module("messageBoard", []).controller("homeIndexController", homeIndexController);