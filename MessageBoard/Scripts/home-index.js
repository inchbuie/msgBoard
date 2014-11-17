// home-index.js
function homeIndexController($scope, $http) {
    console.log("inside the home index controller");

    $scope.dataCount = 0;
    $scope.data = [];

    $http.get("/api/v1/topics?includeReplies=true")
        .then(
        function (result) {
            //succesful
            angular.copy(result.data, $scope.data);
        },
        function () {
            //error
            console.log("error loading topics");
        });
}

angular.module("messageBoard", []).controller("homeIndexController", homeIndexController);