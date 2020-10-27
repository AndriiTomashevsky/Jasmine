describe('Learning JS', function ()
{
    it('"test array splice should not modify array', function ()
    {
        var arr = [1, 2, 3, 4, 5];
        var result = arr.splice(2, 3);

        expect(result).toEqual([3, 4, 5]);
    });
});