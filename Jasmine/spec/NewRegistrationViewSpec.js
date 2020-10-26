/// <reference path="..\lib/jasmine-3.6.0/jasmine.js" />
/// <reference path="..\src/NewRegistrationView.js" />

describe("NewRegistrationView", function ()
{
    beforeEach(function ()
    {
        loadFixtures('NewRegistrationView.html');
    });

    afterEach(function ()
    {
        $('#my-form').remove();
    });

    it("should allow the input of the stock symbol", function ()
    {
    });

    it("should allow the input of shares", function ()
    {
    });

    it("should allow the input of the share price", function ()
    {
    });
});