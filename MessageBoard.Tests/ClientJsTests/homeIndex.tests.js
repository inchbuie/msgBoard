/// <reference path="../scripts/jasmine-html.js" />
/// <reference path="../../messageboard/scripts/angular.js" />
/// <reference path="../../messageboard/scripts/angular-mocks.js" />
/// <reference path="../../messageboard/scripts/home-index.js" />
/// <reference path="../../MessageBoard/Scripts/angular-route.js" />

describe("home-Index tests->", function () {

    beforeEach(function () {
        module("homeIndex");
    });

    describe("dataService->", function () {
        //use angular-mocks to inject data service
        it("can load topics", inject(
            function (dataService) {
                expect(dataService.topics).toEqual([]);
            }
        ));
    });
});