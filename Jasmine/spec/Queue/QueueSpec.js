/// <reference path="..\lib/jasmine-3.6.0/jasmine.js" />
/// <reference path="..\src/Queue.js" />

describe('Queue', function ()
{
    it('should have times options', function ()
    {
        var queue = new Queue();
        var queue2 = new Queue();

        expect(queue.timesOptions.length).toEqual(8);
        expect(queue2.timesOptions.length).toEqual(8);
    });

    it('should have disabled dates', function ()
    {
        Queue.prototype.disabledDates = ['2019-04-28', '2019-06-16', '2020-04-19', '2020-06-07', '2021-05-02', '2021-06-20', '2022-04-24', '2022-06-12', '2023-04-16', '2023-06-04', '2024-05-05', '2024-06-23', '2025-04-20', '2025-06-08', '2026-04-12', '2026-05-31', '2027-05-02', '2027-06-20', '2028-04-16', '2028-06-04', '2029-04-08', '2029-05-27', '2030-04-28', '2030-06-16'];

        var queue = new Queue();

        expect(queue.disabledDates.length).toEqual(24);
    });
});