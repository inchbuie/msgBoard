﻿//home-index.js

var homeIndexModule = angular.module( "homeIndex", [ "ngRoute" ] );

//configure client-side routing with angular
homeIndexModule.config([
    "$routeProvider",
    function( $routeProvider ){
        $routeProvider.when( "/", {
            controller : topicsController, // when controller looks like this
            templateUrl : "/templates/topicsView.html" // use this url fragment to load html template from server
        } );

        $routeProvider.when( "/newmessage", {
            controller : newTopicController,
            templateUrl : "templates/newTopicView.html"
        } );

        $routeProvider.when( "/message/:id", {
            controller : singleTopicController,
            templateUrl : "templates/singleTopicView.html"
        } );

        $routeProvider.otherwise({
            redirectTo : "/"
        } ); //default route
    }
] );

// create an AngularJS service for inter-controller communication
homeIndexModule.factory("dataService", [
    "$http",
    "$q",
    function($http, $q) { //callback for service
        //local members
        var _topics = [];
        var _isInitialized = false;

        var _dataLoaded = function() {
            return _isInitialized;
        };

        var _getTopics = function() {

            //create deferral object to expose promise (using Angular's magic $q, which was injected)
            var deferred = $q.defer();

            $http.get( "/api/v1/topics?includeReplies=true" )
               .then(
                   function( result ) {
                       //succesful
                       angular.copy( result.data, _topics );
                       // signal that data has been initialized
                       _isInitialized = true;
                       deferred.resolve();
                   },
                   function() {
                       //error
                       deferred.reject();
                   });

            //return object to allow caller to chain then() call after calling this
            return deferred.promise;
        };


        var _addTopic = function( newTopic ) {
            var deferred = $q.defer();

            $http.post( "/api/v1/topics", newTopic )
                .then(
                    function(result) {
                        //succesful
                        var savedTopic = result.data;
                        // merge with existing list of topics
                        _topics.splice( 0, 0, savedTopic );
                        deferred.resolve( savedTopic );
                    },
                    function() {
                        //error
                        deferred.reject();
                    });

            return deferred.promise;
        };

        function _findTopic( id ) {
            //assumes _dataLoaded==true
            var found = null;

            $.each(_topics, function( i, item ) {
                if ( item.id === id ) {
                    found = item;
                    return false;
                }
            });

            return found;
        }

        var _getTopicById = function( id ) {
            var deferred = $q.defer();

            if (_dataLoaded()) {
                var topic = _findTopic( id );
                if (topic) {
                    deferred.resolve( topic );
                } else {
                    deferred.reject();
                }
            } else {
                _getTopics()
                    .then(function() {
                        //succesful
                        var topic = _findTopic( id );
                        if ( topic ) {
                            deferred.resolve( topic );
                        } else {
                            deferred.reject();
                        }
                    },
                    function () {
                        //error
                        deferred.reject();
                    });
            }

            return deferred.promise;
        };

        var _saveReply = function( topic, newReply ) {
            var deferred = $q.defer();

            $http.post( "/api/v1/topics/" + topic.id + "/replies", newReply )
              .then(function( result ) {
                  // success
                  if (topic.replies === null) topic.replies = [];
                  topic.replies.push( result.data );
                  deferred.resolve( result.data );
              },
              function () {
                  // error
                  deferred.reject();
              });

            return deferred.promise;
        };

        // must return object representing the service, exposing private members
        return {
            topics : _topics,
            getTopics : _getTopics,
            addTopic : _addTopic,
            dataLoaded : _dataLoaded,
            getTopicById : _getTopicById,
            saveReply : _saveReply
        };
    }
]);

//pass argument names as strings in an array,
// otherwise minification would rename the function args
// as in (n,p,i) which would not match the code in the view
var topicsController = [
    "$scope",
    "$http",
    "dataService",
    function( $scope, $http, dataService ) {
        //console.log("inside the topics controller");

        $scope.dataSvc = dataService;
        $scope.isBusy = false;

        //only call data service if this is the 1st time & data not already loaded
        if (dataService.dataLoaded() === false) {
            $scope.isBusy = true;
            dataService.getTopics()
                .then(
                    function (result) {
                        //succesful
                    },
                    function () {
                        //error
                        console.log( "error loading topics" );
                    })
                    .then(function () {
                        // after either error or success
                        $scope.isBusy = false;
                    });
        }
    }
];


var newTopicController = [
    "$scope",
    "dataService",
    "$http",
    "$window",
    function( $scope, dataService, $http, $window ) {
        $scope.newTopic = {};

        $scope.save = function() {
            //console.log("save() called for " + $scope.newTopic.title);

            dataService.addTopics( $scope.newTopic )
             .then(
                    function(result) {
                        //succesful
                        $window.location = "#/";
                    },
                    function() {
                        //error
                        console.log( "error saving new topic" );
                    })
                    .then(function() {
                        // after either error or success
                        $scope.isBusy = false;
                    });
        };
    }
];

var singleTopicController = [
    "$scope",
    "dataService",
    "$window",
    "$routeParams",
    function( $scope, dataService, $window, $routeParams ) {
        $scope.topic = null;
        $scope.newReply = {};

        dataService.getTopicById($routeParams.id)
             .then(
                function( result ) {
                    //succesful
                    $scope.topic = result;
                },
                function() {
                    //error, return to main page
                    $window.location = "#/";

                });

        $scope.addReply = function() {
            dataService.saveReply($scope.topic, $scope.newReply)
              .then(function() {
                  // success
                  $scope.newReply.body = "";
              },
              function() {
                  // error
                  alert("Could not save the new reply");
              });
        };
    }
];