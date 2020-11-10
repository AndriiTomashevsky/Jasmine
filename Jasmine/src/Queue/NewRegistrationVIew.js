(function (global, $)
{
    function NewRegistrationView(params)
    {
        var that = this;
        this.$el = $('#' + params.id);
        this.storage = params.storage;

        bindEvents.call(that);
    }

    global.NewRegistrationView = NewRegistrationView;
    //this.NewRegistrationView = NewRegistrationView;

    NewRegistrationView.prototype = {
        onCreate: function (callback)
        {
            this._callback = callback;
        }
    };

    function bindEvents()
    {
        var that = this;

        that.$el.find('#ServiceCenter').on('change input', setDatePicker.bind(that));
        that.$el.find('#datepicker').on('change', setTimes.bind(that));
        that.$el.on('submit', function (event)
        {
            event.preventDefault();
            submit.call(that);
        });

        that.$el.find('#registrationbutton').on('click', function (event)
        {
            if (that.$el.valid())
            {
                var email = $('#Email').val();
                event.preventDefault();
            }
        });
    }

    function submit()
    {
        if (that.$el.valid())
        {
            try
            {
                this._callback();
                var date = formatDBDate($('#datepicker').val());
            } catch (e)
            {
                $('#myModal').modal('hide');
                $('body').html('<div class="register-container"><div class="row"><div class="col-lg-12"><div class="text-center m-b-md"><h3 style="color:red">Помилка сервера, спробуйте пізніше</h3></div></div></div ></div >');
            }
        }
    }

    function setTimes()
    {
        $('#Time').find('option').not(':first').remove();
        $('#Time').val('');

        var datepick = $('#datepicker').val();
        var formatteddate = formatDBDate(datepick);
        var dayOfWeek = new Date(Date.parse(formatteddate)).getDay();
        var times = this.storage.timesOptions.slice();
        if (dayOfWeek == 5)
        {
            times.pop();
        }

        var centerId = $('#ServiceCenter').find('option:selected').attr('id');

        $.ajax({
            method: 'get',
            url: '/QueueSeason/registrations',
            data: {
                'centerId': centerId,
                'date': formatteddate
            },
            success: function (data)
            {
                //Формування випадаючого списку з вільним часом на вибраний день
                var timeList = data.content;
                //$('#Time').html('<option value="" disabled selected>Оберіть час</option>');
                if (timeList.length == 0)
                {
                    for (var i = 0; i < times.length; i++)
                    {
                        $('#Time').append($('<option>', {
                            value: times[i].val,
                            text: times[i].text
                        }));
                    }
                }
                else
                {
                    for (var i = 0; i < times.length; i++)
                    {
                        var equal = false;
                        $.each(timeList, function (index, time)
                        {
                            var parseTime = time;
                            if (times[i].val == parseTime)
                            {
                                equal = true;
                            }
                        });
                        //var equalFlag = false;

                        if (equal)
                        {
                            $('#Time').append($('<option>', {
                                value: times[i].val,
                                text: times[i].text,
                            }).prop('disabled', true));
                            equal = false;
                        }
                        else
                        {
                            $('#Time').append($('<option>', {
                                value: times[i].val,
                                text: times[i].text
                            }));
                        }
                    }
                }
            },
            error: function (ex, textStatus, errorThrown)
            {
            }
        });

        $('#Time').attr('disabled', false);
    }

    function setDatePicker()
    {
        if ($('#ServiceCenter').val() == "")
        {
            $('#datepicker').attr('disabled', true);
        }
        else
        {
            $('#datepicker').datepicker('setDate', null);
            $('#datepicker').attr('disabled', true);
            $('#Time').attr('disabled', true);
            $('#datepicker').datepicker("destroy");
            var disabledDate = [];
            var holidays = ['01-01', '01-07', '03-08', '05-01', '05-09', '06-28', '08-24', '10-14', '12-25'];
            //var EastersAndTrinities = ['2019-04-28', '2019-06-16', '2020-04-19', '2020-06-07', '2021-05-02', '2021-06-20', '2022-04-24', '2022-06-12', '2023-04-16', '2023-06-04', '2024-05-05', '2024-06-23', '2025-04-20', '2025-06-08', '2026-04-12', '2026-05-31', '2027-05-02', '2027-06-20', '2028-04-16', '2028-06-04', '2029-04-08', '2029-05-27', '2030-04-28', '2030-06-16'];
            var floatHolidays = ['2019-12-30', '2019-12-31'];

            var centerId = $('#ServiceCenter').find('option:selected').attr('id');

            for (var i = 0; i < this.storage.disabledDates.length; i++)
            {
                if (centerId == this.storage.disabledDates[i].centerId)
                {
                    disabledDate = this.storage.disabledDates[i].dates;
                    break;
                }
            }

            $('#datepicker').datepicker({
                minDate: 0,
                maxDate: "+1M",
                numberOfMonths: 2,
                beforeShowDay: function (date)
                {
                    var formatteddate = jQuery.datepicker.formatDate('yy-mm-dd', date);
                    var sub = formatteddate.substring(5, 10);
                    var isNotFirstFiveDays = true;
                    var numberDay = date.getDate();
                    for (var i = 1; i <= 5; i++)
                    {
                        if (i == numberDay)
                        {
                            isNotFirstFiveDays = false;
                        }
                    }
                    var day = date.getDay();
                    var result = day != 0 && day != 6;
                    var res = disabledDate.indexOf(formatteddate) == -1;
                    var res2 = holidays.indexOf(formatteddate.substring(5, 10)) == -1;
                    var res3 = floatHolidays.indexOf(formatteddate) == -1;
                    return [result && res && res2 && res3, ''];
                }
            });
            if ($(window).width() < 768)
            {
                resizeCalendar();
            }

            $('#datepicker').attr('disabled', false);
        }
    }

    //Форматування дати у вигляд yyyy-mm-dd
    function formatDBDate(date)
    {
        var datearr = date.split('.');
        var formatdate = datearr.reverse().join('-');
        return formatdate;
    }

    $(function ()
    {
        $('#PhoneNumber').mask('+38(000)-000-00-00');
        $('#datepicker').attr('disabled', true);
        $('#Time').attr('disabled', true);
        $('#createpdfbutton').attr("clicked", false);

        $('#ServiceCenter').html('<option value="" disabled selected>Оберіть центр обслуговування</option>');
        $('#ServiceCenter').append($('<option>', {
            id: "1",
            value: "пров. Задорожній, 3 корп. 1",
            text: "пров. Задорожній, 3 корп. 1"
        }));
    });

})(this, jQuery);



