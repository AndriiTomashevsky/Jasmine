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

    describe('with its inputs correctly filled', function ()
    {
        beforeEach(function ()
        {
            view.$el.find('#Company').val('Test').trigger('change');
            view.$el.find('#Time').val('10:00').trigger('change');
            view.$el.find('#Email').val('test@test.com').trigger('change');
            view.$el.find('#datepicker').val('02.11.2020').trigger('change');
            view.$el.find('#FullName').val('Test').trigger('change');
            view.$el.find('#PhoneNumber').val('000-00-00').trigger('change');
            view.$el.find('#ServiceCenter').val('Задорожного 1Б').trigger('change');
        });

        it('should be able to create a registration from the inputs', function ()
        {
            var newRegistration = view.create();
            expect(newRegistration.company).toEqual('Test');
            //expect(newRegistration.time).toEqual('10:00');
            //expect(newRegistration.serviceCenter).toEqual('Задорожного 1Б');
            expect(newRegistration.date).toEqual('02.11.2020');
        });

        describe('when its modalregistration button is clicked', function ()
        {
            beforeEach(function ()
            {
                spyOnEvent(view.$el, 'submit');
                view.$el.submit();
            });

            it("should submit the form", function ()
            {
                expect('submit').toHaveBeenTriggeredOn(view.$el);
            });
        });

        describe('and when the form is submitted', function ()
        {
            beforeEach(function ()
            {
                spyOn(view, 'create');
                spyOnEvent(view.$el, 'submit');

                view.$el.submit();
            });

            it("should prevent the event default behavior", function ()
            {
                expect('submit').toHaveBeenPreventedOn(view.$el);
            });

            it("should create a registration", function ()
            {
                expect(view.create).toHaveBeenCalled();
            });
        });

        describe('and when a registration is created', function ()
        {
            var callbackSpy;
            var registration;

            beforeEach(function ()
            {
                callbackSpy = jasmine.createSpy('callback');
                view.onCreate(callbackSpy);

                registration = view.create();
            });

            it('should invoke the "onCreate" callback with the created investment', function ()
            {
                expect(callbackSpy).toHaveBeenCalled();
                expect(callbackSpy).toHaveBeenCalledWith(registration);
                //expect(callbackSpy.called).toBeTruthy();
                expect(callbackSpy.calls.argsFor(0)[0]).toBe(registration);
            });
        });

        describe('when registration button is clicked', function ()
        {
            beforeEach(function ()
            {
                spyOn(view, 'showModal');
                spyOnEvent(view.$el, 'click');
                spyOnEvent(view.$el, 'submit');
                view.$el.find('#registrationbutton').click();
            });

            it("should show modal window", function ()
            {
                expect(view.showModal).toHaveBeenCalled();
            });

            it('should prevent the event default behavior', function ()
            {
                expect('click').toHaveBeenPreventedOn(view.$el);
            });

            it('should not submit the form', function ()
            {
                expect('submit').not.toHaveBeenTriggeredOn(view.$el);
            });

            it('should shows modal text', function ()
            {
                expect($('#modalPhoneNumber').text()).toEqual('000-00-00');
                expect($('#modalDate').text()).toEqual('02.11.2020');
                //expect($('#modalServiceCenter').text()).toEqual('Задорожного 1Б');
                //expect($('#modalTime').text()).toEqual('10:00');
                expect($('#modalCompany').text()).toEqual('Test');
                expect($('#modalFullName').text()).toEqual('Test');
                expect($('#modalEmail').text()).toEqual('test@test.com');
                expect($('#modalAnnotation').text()).toEqual('');
            });
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
            expect(view.getCenter()).toEqual('');
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