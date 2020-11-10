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
        beforeEach(function (done)
        {
            stock.fetch({
                success: done
            });
        });

        it("should update its share price", function ()
        {
            expect(stock.sharePrice).toEqual(20.18);
        });
    });
});