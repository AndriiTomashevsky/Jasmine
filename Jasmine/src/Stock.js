function Stock(params)
{
    this.symbol = params.symbol;
    this.sharePrice = params.sharePrice;
}

Stock.prototype.fetch = function ()
{
    var url = 'http://localhost:8000/stocks/' + this.symbol;

    $.getJSON(url, function (data)
    {
        this.sharePrice = data.sharePrice;
    }.bind(this));
};