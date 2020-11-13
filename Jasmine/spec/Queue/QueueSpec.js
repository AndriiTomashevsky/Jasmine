describe('Queue', function ()
{
    var queue;

    beforeEach(function ()
    {
        queue = new Queue({
            timesOptions: [
                {
                    text: "10:00",
                    val: '10:00'
                },
                {
                    text: "10:40",
                    val: '10:40'
                },
                {
                    text: "11:20",
                    val: '11:20'
                }
            ]
        });
    });

    beforeEach(function (done)
    {
        queue.setDisabledDates({
            success: done
        });
    });

    it('should have disabled dates', function ()
    {
        expect(queue.disabledDates[0].dates.length).toEqual(3);
    });

    describe('when fetched', function ()
    {
        beforeEach(function (done)
        {
            queue.fetch({
                success: done,
                account: '333333333'
            });
        });

        it('should have an address', function ()
        {
            expect(queue.address).toEqual('Київ, БОРИЧІВ УЗВІЗ, буд. 0');
        });
    });
});