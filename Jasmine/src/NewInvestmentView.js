(function ($, Investment, Stock)
{
    function NewInvestmentView(params)
    {
        this.$element = $(params.id);
        this.listView = params.listView;

        this.$element.on('submit', function ()
        {
            this.listView.addInvestment(/* new investment */);
        }.bind(this));
    }

    this.NewInvestmentView = NewInvestmentView;

})(jQuery, Investment, Stock);

NewInvestmentView.prototype = {
    $: function ()
    {
        return this.$element.find.apply(this.$element, arguments);
    },
    getSymbolInput: function ()
    {
        return this.$('.new-investment-stock-symbol');
    }
};

NewInvestmentView.prototype.setSymbol = function (value)
{
    this.$('.new-investment-stock-symbol').val(value);
};