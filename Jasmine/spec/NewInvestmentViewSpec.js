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
        expect(view.$element.find('.new-investment-stock-symbol')).toHaveValue('');
    });

    it("should allow the input of the stock symbol", function ()
    {
        expect(view.$element.find('.new-investment-stock-symbol')).toBeMatchedBy('input[type=text]');
    });

    it("should allow the input of shares", function ()
    {
        expect(view.$element).toContainHtml('<input type="number" class= "new-investment-shares" name="shares" value="0">');
    });

    it("should allow the input of the share price", function ()
    {
        expect(view.$element).toContainElement('input[type=number].new-investment-share-price');
    });

    it("should have its shares value to zero", function ()
    {
        expect(view.$element.find('.new-investment-shares')).toHaveValue('0');
    });

    it("should have its share price value to zero", function ()
    {
        expect(view.$element.find('.new-investment-share-price')).toHaveAttr('value', '0');
    });

    it("should have its stock symbol input on focus", function ()
    {
        //expect(view.$element.find('.new-investment-stock-symbol')).toBeFocused();
    });

    it("should not allow to add", function ()
    {
        //expect(view.$element.find('input[type=submit]')).toBeDisabled();
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

    describe('with its inputs correctly filled', function ()
    {
        describe('and when an investment is created', function ()
        {
            var callbackSpy;
            var investment;

            beforeEach(function ()
            {
                callbackSpy = jasmine.createSpy('callback');
                view.onCreate(callbackSpy);
                investment = view.create();
            });

            it('should invoke the "onCreate" callback with the created investment', function ()
            {
                expect(callbackSpy).toHaveBeenCalled();
                expect(callbackSpy).toHaveBeenCalledWith(investment);
            });
        });
    });
});