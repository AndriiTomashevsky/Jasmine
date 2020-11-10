describe('NewRegistrationView', function ()
{
    var view;

    beforeEach(function ()
    {
        loadFixtures('QueueFormView.html');

        view = new NewRegistrationView({
            id: 'new-registration',
            storage: new Queue({
                timesOptions: [
                    {
                        text: "10:00",
                        val: '10:00'
                    },
                    {
                        text: "10:40",
                        val: '10:40'
                    },
                    {
                        text: "11:20",
                        val: '11:20'
                    }
                ]
            })
        });
    });

    beforeEach(function (done)
    {
        view.storage.setDisabledDates({
            success: done
        });

    });

    describe('when service center clicked', function ()
    {
        beforeEach(function ()
        {
            view.$el.find('#ServiceCenter').val('Test').trigger('change');
        });

        it('should enable datepicker', function ()
        {
            expect(view.$el.find('#datepicker')).not.toBeDisabled();
        });

        it('time should to be disabled', function ()
        {
            expect(view.$el.find('#Time')).toBeDisabled();
        });
    });

    describe('when date clicked', function ()
    {
        beforeEach(function ()
        {
            view.$el.find('#datepicker').val('02.11.2020').trigger('change');
        });

        it('time should to be enabled', function ()
        {
            expect(view.$el.find('#Time')).not.toBeDisabled();
        });
    });

    describe('when registration button is clecked', function ()
    {
        var callbackSpy;

        beforeEach(function ()
        {
            spyOnEvent(view.$el, 'click');
            callbackSpy = jasmine.createSpy('callback');
            view.onCreate(callbackSpy);
            view.$el.find('#registrationbutton').click();
        });

        it('should not to call submit', function ()
        {
            expect(callbackSpy).not.toHaveBeenCalled();
        });

        it("should have submited the form, but prevented the default behavior", function ()
        {
            expect('click').toHaveBeenTriggeredOn(view.$el);
            expect('click').toHaveBeenPreventedOn(view.$el);
        });
    });

    it('should have times options', function ()
    {
        expect(view.storage.timesOptions.length).toEqual(3);
    });

    it('should have days for api call', function ()
    {
        expect(view.storage.daysForApiCall.length).toEqual(62);
    });

    it('should expose a property with its DOM element', function ()
    {
        expect(view.$el).toExist();
    });

    it('should allow the input of the company', function ()
    {
        expect(view.$el.find('#Company')).toBeMatchedBy('input[type=text]');
        //expect($el).toContainHtml('<input class="form-control" data-val="true" data-val-required="Поле Організація обов&#39;язкове для заповнення" id="Company" name="Company" placeholder="Назва організації" type="text" value="" />');
        //expect($el.find('#Company')).toContain('input[type=text].form-control');
        //expect($el.find('#Company')).not.toBeDisabled();
    });

    it('should allow the input of the full name', function ()
    {
        expect(view.$el.find('#FullName')).toBeMatchedBy('input[type=text]');
    });

    it('should allow the input of the phone number', function ()
    {
        expect(view.$el.find('#PhoneNumber')).toBeMatchedBy('input[type=text]');
    });

    it('should allow the input of the email', function ()
    {
        expect(view.$el.find('#Email')).toBeMatchedBy('input[type=text]');
    });

    it('should allow the input of the service center', function ()
    {
        expect(view.$el.find('#1')).toBeMatchedBy('select,option');
    });

    it('should not allow the input of the date', function ()
    {
        expect(view.$el.find('input[name=Date]')).toBeDisabled();
    });

    it('should not allow the input of the time', function ()
    {
        expect(view.$el.find('select[name=Time]')).toBeDisabled();
    });

    it('should allow the input of the annotation', function ()
    {
        expect(view.$el.find('#Annotation')).toBeMatchedBy('textarea[name="Annotation"]');
    });

    itShouldBeAtTheDefaultState();

    // shared specs

    function itShouldBeAtTheDefaultState()
    {
        it('should have disabled dates', function ()
        {
            expect(view.storage.disabledDates[0].dates.length).toEqual(3);
        });

        it('should have an empty company', function ()
        {
            expect(view.$el.find('#Company')).toHaveValue('');
            //expect(view.$el.find('#Company')).toHaveAttr('value','');
        });

        it('should have an empty full name', function ()
        {
            expect(view.$el.find('#FullName')).toHaveValue('');
        });

        it('should have an empty email', function ()
        {
            expect(view.$el.find('#Email')).toHaveValue('');
        });

        it('should have an phone number', function ()
        {
            expect(view.$el.find('#PhoneNumber')).toHaveValue('');
        });

        it('should have an empty service center', function ()
        {
            expect(view.$el.find('select[name="ServiceCenter"]').find('option[selected=""]')).toHaveValue('');
        });

        it('should have an empty date', function ()
        {
            expect(view.$el.find('input[name="Date"]')).toHaveValue('');
        });

        it('should have an empty time', function ()
        {
            expect(view.$el.find('#Time').find('option[selected="selected"]')).toHaveValue('');
        });

        it('should not have its company input on focus', function ()
        {
            expect(view.$el.find('#Company')).not.toBeFocused();
        });

        it("should allow to click registration button", function ()
        {
            expect(view.$el.find('button[type=submit]')).not.toBeDisabled();
        });
    }
});