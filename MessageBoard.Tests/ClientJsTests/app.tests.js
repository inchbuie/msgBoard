/// <reference path="../scripts/jasmine-html.js" />
/// <reference path="../../messageboard/scripts/myapp.js" />

describe("myapp tests->", function () {

    it("isDebug", function () {
        expect(app.isDebug).toEqual(true);
    });

    it("log", function () {
        expect(app.log).toBeDefined();
        app.log("just testing");
    });
});