describe('Stock', function ()
{
    var stock;
    var originalSharePrice = 0;

    beforeEach(function ()
    {
        stock = new Stock({
            symbol: 'AOUE',
            sharePrice: originalSharePrice
        });
    });

    it('should have a share price', function ()
    {
        expect(stock.sharePrice).toEqual(originalSharePrice);
    });

    describe('when fetched', function ()
    {
        beforeEach(function ()
        {
            jasmine.Ajax.install();
        });

        beforeEach(function ()
        {
            jasmine.Ajax.stubRequest('http://localhost:8000/stocks/AOUE').andReturn({
                'status': 200,
                'contentType': 'application/json',
                'responseText': '{ "sharePrice": 20.18 }'
                });

            stock.fetch();
        });

        afterEach(function ()
        {
            jasmine.Ajax.uninstall();
        });


        it("should update its share price", function ()
        {
            expect(stock.sharePrice).toEqual(20.18);
        });
    });
});