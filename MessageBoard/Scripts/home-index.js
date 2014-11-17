// home-index.js
function homeIndexController($scope) {
    console.log("inside the home index controller");

    $scope.name = "Dennis D. Menace";
    $scope.data = [
        {
            title: "first message",
            body: "hello, how art thou?",
            created: "11/11/2014"
        },
        {
            title: "second message",
            body: "Good Evening, Ladies and Gentlemen",
            created: "11/12/2014"
        },
        {
            title: "third message",
            body: "what up homez?",
            created: "11/13/2014"
        }

    ];
}

angular.module("messageBoard", []).controller("homeIndexController", homeIndexController);