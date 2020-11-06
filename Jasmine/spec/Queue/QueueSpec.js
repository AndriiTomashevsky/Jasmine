describe('Queue', function ()
{
    it('should have times options', function ()
    {
        expect(timesOptions.length).toEqual(8);
        expect(window.timesOptions.length).toEqual(8);
    });

    it('should have disabled dates', function ()
    {
        expect(Storage.disableDates.length).toEqual(3);
    });
});