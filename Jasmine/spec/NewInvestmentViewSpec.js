/// <reference path="..\lib/jasmine-3.6.0/jasmine.js" />
/// <reference path="..\src/NewInvestmentView.js" />

describe("NewInvestmentView", function ()
{
    beforeEach(function ()
    {
        loadFixtures('NewInvestmentView.html');
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