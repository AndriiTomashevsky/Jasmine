var express = require('express');

var app = express();

app.get('/QueueSeason/GetDisabledDates/', function (req, res)
{
    res.setHeader('Content-Type', 'application/json');
    res.send([{ centerId: '1', dates: ['2020-11-03', '2020-11-04', '2020-11-05'] }]);
});

app.use(express.static(__dirname));
app.listen(8000);