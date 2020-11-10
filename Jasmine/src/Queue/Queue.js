(function (global, $)
{
    function Queue(params)
    {
        this.timesOptions = params.timesOptions;
        this.daysForApiCall = GetDaysForApiCall.call();
    }

    global.Queue = Queue;

    function GetDaysForApiCall()
    {
        var daysForApiCall = [];

        var now = new Date();
        var afterTwoMothDate = new Date();
        afterTwoMothDate.setMonth(afterTwoMothDate.getMonth() + 2);

        for (var d = now; d <= afterTwoMothDate; d.setDate(d.getDate() + 1))
        {
            var formatDate = $.datepicker.formatDate('yy-mm-dd', d);

            daysForApiCall.push(formatDate);
        }

        return daysForApiCall;
    }

    Queue.prototype.setDisabledDates = function (params)
    {
        params = params || {};
        var success = params.success || function () { };
        var that = this;

        $.ajax({
            type: 'get',
            url: '/QueueSeason/GetDisabledDates',
            dataType: "json",
            data: { daysForApiCall: that.daysForApiCall, timesOptionsLength: that.timesOptions.length },
            traditional: true,
            success: function (data)
            {
                that.disabledDates = data;
                success(that);
            },
            error: function (ex, textStatus, errorThrown)
            {
            }
        });
    };

})(this, jQuery);

