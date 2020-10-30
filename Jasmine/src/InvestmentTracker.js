function InvestmentTracker(params)
{
    this.listView = params.listView;
    this.newView = params.newView;

    this.newView.onCreate(function (investment)
    {
        this.listView.addInvestment(investment);
    }.bind(this));
}