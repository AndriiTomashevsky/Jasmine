var express = require('express');

var app = express();

app.get('/QueueSeason/GetDisabledDates/', function (req, res)
{
    res.setHeader('Content-Type', 'application/json');
    //res.send(['2020-11-16', '2020-11-18', '2020-11-24']);

    res.send([{ centerId: '1', dates: ['2020-11-16', '2020-11-18', '2020-11-24'] }]);
});

app.get('/QueueSeason/registrations/', function (req, res)
{
    res.setHeader('Content-Type', 'application/json');
    //res.send(['2020-11-16', '2020-11-18', '2020-11-24']);

    res.send({ content: ['10:40'] });
});

app.use(express.static(__dirname));
app.listen(8000);