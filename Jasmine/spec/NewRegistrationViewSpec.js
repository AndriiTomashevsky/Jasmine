/// <reference path="..\lib/jasmine-3.6.0/jasmine.js" />
/// <reference path="..\src/NewRegistrationView.js" />

describe("NewRegistrationView", function ()
{
    var view;

    beforeEach(function ()
    {
        loadFixtures('NewRegistrationView.html');

        view = new NewRegistrationView({
            selector: '#myForm'
        });
    });

    it("should expose a property with its DOM element", function ()
    {
        expect(view.$element).toExist();
    });

    it("should allow the input of the stock symbol", function ()
    {
    });

    it("should allow the input of shares", function ()
    {
    });

    it("should allow the input of the share price", function ()
    {
    });
});