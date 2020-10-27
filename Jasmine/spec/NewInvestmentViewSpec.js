/// <reference path="..\lib/jasmine-3.6.0/jasmine.js" />
/// <reference path="..\src/NewInvestmentView.js" />

describe("NewInvestmentView", function ()
{
    var view, listView;

    beforeEach(function ()
    {
        loadFixtures('NewInvestmentView.html');
        appendLoadFixtures('InvestmentListView.html');

        listView = new InvestmentListView({
            id: 'investment-list'
        });

        view = new NewInvestmentView({
            id: '#new-investment',
            listView: listView
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

    describe('when its add button is clicked', function ()
    {
        beforeEach(function ()
        {
            // fill form inputs
            // simulate the clicking of the button
        });

        it('should add the investment to the list', function ()
        {
            expect(listView.count()).toEqual(1);
        });
    });
});