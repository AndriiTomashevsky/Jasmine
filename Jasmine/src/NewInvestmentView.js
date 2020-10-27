(function ($, Investment, Stock)
{
    function NewInvestmentView(params)
    {
        this.$element = $(params.selector);
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