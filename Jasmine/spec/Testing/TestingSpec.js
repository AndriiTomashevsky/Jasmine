describe('Fixing Algorithm for date in i.kyivgaz', function ()
{
    it('should calculate date 3 month until now', function ()
    {
        expect(quarterData()).toEqual('06.10.2020 0:00:00');
    });
});