function Stock(params)
{
    this.symbol = params.symbol;
    this.sharePrice = params.sharePrice;
}

Stock.prototype.fetch = function (params)
{
    params = params || {};
    var that = this;
    var success = params.success || function () { };
    var url = 'http://localhost:8000/stocks/' + that.symbol;

    $.getJSON(url, function (data)
    {
        this.sharePrice = data.sharePrice;
        success(that);
    }.bind(this));
};