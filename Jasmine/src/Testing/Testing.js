function quarterData()
{
    var today = new Date();
    var quarter = new Date();
    quarter.setDate(quarter.getDate() - 90);

    var day = quarter.getDate();
    var month = quarter.getMonth() + 1;
    var year = quarter.getFullYear();

    if (day < 10)
    {
        day = '0' + day;
    }

    if (month < 10)
    {
        month = '0' + month;
    }
    //var todayDate = day + '.' + month + '.' + year;

    //var quarterDate;
    //if (month - 3 <= 0)
    //{
    //    quarterDate = day + '.' + (month + 9) + '.' + (year - 1);
    //} else
    //{
    //    month = month - 3;
    //    if (month < 10)
    //    {
    //        month = '0' + month;
    //    }
    //    quarterDate = day + '.' + month + '.' + year;
    //}
    //var dateRouteTo = todayDate + ' 0:00:00';
    quarterDate = day + '.' + month + '.' + year;

    var dateRouteFrom = quarterDate + ' 0:00:00';
    return dateRouteFrom;
}
