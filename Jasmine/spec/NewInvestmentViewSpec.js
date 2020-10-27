/// <reference path="..\lib/jasmine-3.6.0/jasmine.js" />
/// <reference path="..\src/NewInvestmentView.js" />

describe("NewInvestmentView", function ()
{
    var view;

    beforeEach(function ()
    {
        loadFixtures('NewInvestmentView.html');

        view = new NewInvestmentView({
            selector: '#new-investment'
        });
    });

    it("should expose a property with its DOM element", function ()
    {
        expect(view.$element).toExist();
    });

    it("should have an empty stock symbol", function ()
    {
        expect(view.getSymbolInput()).toHaveValue('');
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