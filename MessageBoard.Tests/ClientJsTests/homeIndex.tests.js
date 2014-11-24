/// <reference path="../scripts/jasmine-html.js" />
/// <reference path="../../messageboard/scripts/angular.js" />
/// <reference path="../../messageboard/scripts/angular-mocks.js" />
/// <reference path="../../messageboard/scripts/home-index.js" />
/// <reference path="../../MessageBoard/Scripts/angular-route.js" />

describe("home-Index tests->", function () {

    beforeEach(function () {
        module("homeIndex");
    });

    // use angular-mocks to mock http context
    //if $httpBackend exists it will be used instead of $http by angular
    var $httpBackend;

    beforeEach(inject(function ($injector) {
        //$injector object is part of angular, can resolve references
        // could also get $scope etc. here
        $httpBackend = $injector.get("$httpBackend");

        //upon this request, return some made-up data
        $httpBackend.when("GET", "/api/v1/topics?includeReplies=true")
            .respond([
                {
                    title: "first title",
                    body: "some body text blah blah",
                    id: 1,
                    created: "20141121"
                },
                {
                    title: "second title",
                    body: "some other body text blah blah",
                    id: 2,
                    created: "20141121"
                }
            ]);

        //TODO
        //$httpBackend.when("POST", "/api/v1/topics...")
        //$httpBackend.when("GET", "/api/v1/replies...")
        //$httpBackend.when("POST", "/api/v1/replies...")
    }));

    afterEach(function () {
        //clear mock back-end of any pending requests, ready for next test
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe("dataService->", function () {
        //use angular-mocks to inject data service
        it("can load topics", inject(
            function (dataService) {
                expect(dataService.topics).toEqual([]);

                //tell mock backend to expect a get request
                $httpBackend.expectGET("/api/v1/topics?includeReplies=true");
                //make the call (will use mock httpBackend)
                dataService.getTopics();
                //wait till all backend calls are done (instead of .then callback)
                $httpBackend.flush();
                //now evaluate the test
                expect(dataService.topics.length).toBeGreaterThan(0);
                expect(dataService.topics.length).toEqual(2);
            }
        ));
    });
});