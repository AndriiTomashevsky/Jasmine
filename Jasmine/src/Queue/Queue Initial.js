//#region storage
var timesOptions = [
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
    },
    {
        text: "12:00",
        val: '12:00'
    },
    {
        text: "12:30",
        val: '12:30'
    },
    {
        text: "14:00",
        val: '14:00'
    },
    {
        text: "14:40",
        val: '14:40'
    },
    {
        text: "15:20",
        val: '15:20'
    }
];

function Storage()
{
}

Storage.disableDates = [];

(function GetDisabledDates()
{
    var daysForApiCall = [];

    var now = new Date();
    var afterTwoMothDate = new Date();
    afterTwoMothDate.setMonth(afterTwoMothDate.getMonth() + 2);
    //var checkDate = jQuery.datepicker.formatDate('yy-mm-dd', afterTwoMothDate);
    //var afterSevenDaysDate = new Date();
    //afterSevenDaysDate.setDate(afterSevenDaysDate.getDate() + 7);

    for (var d = now; d <= afterTwoMothDate; d.setDate(d.getDate() + 1))
    {
        var formatDate = jQuery.datepicker.formatDate('yy-mm-dd', d);

        daysForApiCall.push(formatDate);
    }

    $.ajax({
        type: 'get',
        url: '/QueueSeason/GetDisabledDates',
        dataType: "json",
        data: { daysForApiCall: daysForApiCall, timesOptionsLength: timesOptions.length },
        traditional: true,
        success: function (data)
        {
            Storage.disableDates = data;
        },
        error: function (ex, textStatus, errorThrown)
        {
        }
    });
}());

//function GetDates(centerId)
//{
//    var disabledDate = [];
//    var daysForApiCall = [];

//    var now = new Date();
//    var afterTwoMothDate = new Date();
//    afterTwoMothDate.setMonth(afterTwoMothDate.getMonth() + 2);
//    //var checkDate = jQuery.datepicker.formatDate('yy-mm-dd', afterTwoMothDate);
//    //var afterSevenDaysDate = new Date();
//    //afterSevenDaysDate.setDate(afterSevenDaysDate.getDate() + 7);

//    for (var d = now; d <= afterTwoMothDate; d.setDate(d.getDate() + 1))
//    {
//        var formatDate = jQuery.datepicker.formatDate('yy-mm-dd', d);

//        daysForApiCall.push(formatDate);
//    }

//    $.each(daysForApiCall, function (i, item)
//    {
//        $.ajax({
//            type: 'get',
//            url: '/Queue/registrations',
//            data: {
//                'centerId': centerId,
//                'date': item
//            },
//            success: function (data)
//            {
//                var timesList = data.content;

//                if (timesList.length == timesOptions.length)
//                {
//                    disabledDate.push(item);
//                }
//            },
//            error: function (ex, textStatus, errorThrown)
//            {

//            }
//        });
//    });

//    return disabledDate;
//}
//#endregion storage

//#region ready
$(document).ready(function ()
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

    //$.ajax({
    //    type: 'get',
    //    url: '/QueueSeason/centers',
    //    success: function (data)
    //    {
    //        var centerList = data.content;
    //        $('#ServiceCenter').html('<option value="" disabled selected>Оберіть центр обслуговування</option>');
    //        for (var i = 0; i < centerList.length; i++)
    //        {
    //            if (centerList[i].state == 'ACTIVE')
    //            {
    //                $('#ServiceCenter').append($('<option>', {
    //                    id: "1",
    //                    value: "",
    //                    text: "пров. Задорожній, 3 корп. 1"
    //                }));
    //            }
    //        }
    //    },
    //    error: function (ex, textStatus, errorThrown)
    //    {
    //    }
    //});

    //#region ServiceCenter
    $('#ServiceCenter').on('input change', function (e)
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

            for (var i = 0; i < Storage.disableDates.length; i++)
            {
                if (centerId == Storage.disableDates[i].centerId)
                {
                    disabledDate = Storage.disableDates[i].dates;
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
    });

    //#endregion ServiceCenter
    //#region Account
    $('#Account').blur(function ()
    {
        $('.address').text('');
        $('input').removeClass('invalid');
        var input = $(this);
        var param = 'PersonalAccount';
        var account = $(input).val();

        if (account.length != 10)
        {
            return;
        }

        var accountForAddress = account.substring(0, 9);

        $.ajax({
            type: 'post',
            url: '/Queue/checkregistrationparam',
            data: { 'paramname': param, 'value': account },
            success: function (data)
            {
                switch (param)
                {
                    case 'PersonalAccount':
                        if (data.isempty)
                        {
                            $('.tocheckedaccount').text('Особовий рахунок не знайдено');
                            $('button[type="submit"]').prop('disabled', true);
                        }
                        else
                        {
                            $.ajax({
                                type: 'get',
                                url: '/api/CabinetApi',
                                data: { 'account': accountForAddress },
                                success: function (data)
                                {
                                    if (data != 'false')
                                    {
                                        $('.address').text(data);
                                    }
                                    else
                                    {
                                        $('.address').text('');
                                    }
                                },
                                error: function (ex, textStatus, errorThrown)
                                {
                                    $('.address').text('');
                                }
                            });

                            $('button[type="submit"]').prop('disabled', false);
                        }
                        break;
                }
                setstatusprevrequestnumber(input, data.isempty);
            },
            error: function (ex, textStatus, errorThrown)
            {

            }
        });
    });

    var userId = null;

    $('#Account').on('input', function ()
    {
        $('.address').text('');
        var input = $(this);
        var value = $(input).val();


        if (value.length != 10)
        {
            return;
        }

        var accountForAddress = value.substring(0, 9);

        $('input').removeClass('invalid');
        var param = 'PersonalAccount';

        $.ajax({
            type: 'post',
            url: '/Queue/checkregistrationparam',
            data: { 'paramname': param, 'value': value },
            success: function (data)
            {
                switch (param)
                {
                    case 'PersonalAccount':
                        if (data.isempty)
                        {
                            $('.tocheckedaccount').text('Особовий рахунок не знайдено');
                            $('button[type="submit"]').prop('disabled', true);
                        }
                        else
                        {
                            $.ajax({
                                type: 'get',
                                url: '/api/CabinetApi',
                                data: { 'account': accountForAddress },
                                success: function (data)
                                {
                                    if (data != 'false')
                                    {
                                        $('.address').text(data);
                                    }
                                    else
                                    {
                                        $('.address').text('');
                                    }
                                },
                                error: function (ex, textStatus, errorThrown)
                                {
                                    $('.address').text('');
                                }
                            });

                            $.ajax({
                                type: 'get',
                                url: '/Queue/getuserid',
                                data: { 'account': value },
                                success: function (data)
                                {
                                    if (data != 'false')
                                    {
                                        userId = data;
                                    }
                                },
                                error: function (ex, textStatus, errorThrown)
                                {
                                }
                            });

                            $('button[type="submit"]').prop('disabled', false);
                        }
                        break;
                }
                setstatusprevrequestnumber(input, data.isempty);

            },
            error: function (ex, textStatus, errorThrown)
            {

            }
        });
    });

    //#endregion  Account
    //#region Buttons
    $('#registrationbutton').on('click', function (e)
    {
        if ($('.tocheckedaccount').text().trim().length)
        {
            e.preventDefault();
            return;
        }

        if ($('#myForm').valid())
        {
            var email = $('#Email').val();

            var datepickerval = $('#datepicker').val();
            //var selectedServiceCenterId = $('#ServiceCenter').find('option:selected').attr('id');
            var phoneNumber = $('#PhoneNumber').val();
            var company = $('#Company').val();
            var fullName = $('#FullName').val();
            var annotation = $('#Annotation').val();
            $('.modal-title').text('Реєстрація');
            //$('#modalAccount').text(account);
            $('#modalPhoneNumber').text(phoneNumber);
            $('#modalDate').text(datepickerval);
            $('#modalServiceCenter').text($('#ServiceCenter').val());
            $('#modalTime').text($('#Time').val().substring(0, 5));
            $('#modalCompany').text(company);
            $('#modalFullName').text(fullName);
            $('#modalEmail').text(email);
            $('#modalAnnotation').text(annotation);

            //setWarningTextIfExists(account, datepickerval, selectedServiceCenterId);
            $('#myModal').modal('show');
            e.preventDefault();
        }
    });

    $("#createpdfbutton").click(function ()
    {
        $("#myForm").attr('target', '_blank');
        $(this).attr("clicked", true);
    });

    $('#myForm').submit(function (e)
    {
        //if ($("#createpdfbutton").attr("clicked") == 'true')
        //{
        //    //$("#myForm").attr('target', '');
        //    $('#createpdfbutton').attr("clicked", false);
        //    return;
        //}
        e.preventDefault();

        if ($('#myForm').valid())
        {
            try
            {
                var date = formatDBDate($('#datepicker').val());
                var time = $('#Time').val();
                //var dateTime = date + 'T' + time;
                var company = $('#Company').val();
                //var address = $('#address').text() + ", тел." + $('#PhoneNumber').val() + ", IP: setIp";
                var email = $('#Email').val();
                //var theme = '15';
                //var themeForSuccessMessage = $('#Subject').val();
                //var centerId = $('#ServiceCenter').find('option:selected').attr('id');
                //var qmsNumber = time.replace(':', '').substring(0, 4);
                var fullName = $('#FullName').val();
                var phone = $('#PhoneNumber').val();
                var annotation = $('#Annotation').val();
                //daleteRegistrationIfExists(account, date, centerId);

                var isTimeFree = checkIsTimeFree(date, time);

                if (!isTimeFree)
                {
                    $('#myModal').modal('hide');
                    $('body').html('<div class="register-container"><div class="row"><div class="col-lg-12 text-center"><div class="text-center m-b-md"><h3>Нажаль, цей час вже зайнятий, оберіть інший час</h3></div><a href="../QueueSeason" class="btn btn-info"><span>Повернутись</span></a></div></div ></div >');
                    return;
                }

                var formValues = {
                    "Company": company,
                    "Time": time,
                    "Email": email,
                    "Date": date,
                    "FullName": fullName,
                    "Phone": phone,
                    "Annotation": annotation
                };

                $.ajax({
                    url: '/QueueSeason/registrations',
                    data: { model: JSON.stringify(formValues) },
                    method: "POST",
                    dataType: "json",
                    async: false,
                    success: function (data)
                    {
                        //var registrationDateTime = new Date(Date.parse(data.Date));
                        $('#myModal').modal('hide');
                        $('body').html('<div class="register-container">' +
                            '<div class="row">' +
                            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                            '<div class="m-b-md">' +
                            '<h3>Реєстрація пройшла успішно!</h3>' +
                            '<h4 style="margin-top:20px;">Дані про реєстрацію надіслані на Вашу електронну пошту*</h4>' +
                            '<h4 style="margin-top:20px;"><strong>Дата:</strong> ' + data.date + '</h4>' +
                            '<h4 ><strong>Центр обслуговування:</strong> пров. Задорожній, 3 корп. 1' +
                            '<h4 ><strong>Час:</strong> ' + time.substring(0, 5) + '</h4>' +
                            '<h4>Чекаємо на Вас у зазначений час!</h4>' +
                            '<h6 style="margin-top:20px;">*Якщо протягом тривалого часу вказаний лист не надійшов, перевірте наявність повідомлення від noreply@kyivgaz.ua в папці спаму або масової розсилки.</h4>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div >');
                        return;
                    },
                    error: function (e)
                    {
                        $('#myModal').modal('hide');
                        $('body').html('<div class="register-container"><div class="row"><div class="col-lg-12"><div class="text-center m-b-md"><h3 style="color:red">Помилка сервера, спробуйте пізніше</h3></div></div></div ></div >');
                        return;
                    }
                });
            } catch (e)
            {
                $('#myModal').modal('hide');
                $('body').html('<div class="register-container"><div class="row"><div class="col-lg-12"><div class="text-center m-b-md"><h3 style="color:red">Помилка сервера, спробуйте пізніше</h3></div></div></div ></div >');
            }
        }
    });
    //#endregion Buttons
    //#region datepicker
    $('#datepicker').change(function (e)
    {
        //var date = $('#datepicker').val();

        //if ($('#datepicker').val() == "")
        //{
        //    $('#Time').attr('disabled', true);
        //}
        //else
        //{
        //    if ($('#Time option').length == 1)
        //    {
        fillTimeSelect();
        //    }
        $('#Time').attr('disabled', false);
        //}
    });


    $('#datepicker').click(function ()
    {
        $(".ui-datepicker-today span").addClass('ui-state-highlight');
    });


    //#endregion datepicker

});

//#endregion ready

//#region Tools
function setstatusprevrequestnumber(control, status)
{
    if (status)
    {
        $(control).removeClass('invalid');
    }

    if (!status)
    {
        $(control).addClass('invalid');
    }
}

function resizeCalendar()
{
    var debounce;
    // Your window resize function
    $(window).resize(function ()
    {
        // Clear the last timeout we set up.
        clearTimeout(debounce);
        // Your if statement
        if ($(window).width() < 768)
        {
            // Assign the debounce to a small timeout to "wait" until resize is over
            debounce = setTimeout(function ()
            {
                // Here we're calling with the number of months you want - 1
                debounceDatepicker(1);
            }, 250);
            // Presumably you want it to go BACK to 2 or 3 months if big enough
            // So set up an "else" condition
        } else
        {
            debounce = setTimeout(function ()
            {
                // Here we're calling with the number of months you want - 3?
                debounceDatepicker(3);
            }, 250);
        }
        // To be sure it's the right size on load, chain a "trigger" to the
        // window resize to cause the above code to run onload
    }).trigger('resize');

    // our function we call to resize the datepicker
    function debounceDatepicker(no)
    {
        $("#datepicker").datepicker("option", "numberOfMonths", no);
    }
}

//Отримання всіх вільних годин за заданими ЦО та Датою, формування випадаючого списку
function fillTimeSelect()
{
    $('#Time').find('option').not(':first').remove();
    $('#Time').val('');

    var datepick = $('#datepicker').val();
    var formatteddate = formatDBDate(datepick);
    var dayOfWeek = new Date(Date.parse(formatteddate)).getDay();
    var times = timesOptions.slice();
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
}


//Форматування дати у вигляд yyyy-mm-dd
function formatDBDate(date)
{
    var datearr = date.split('.');
    var formatdate = datearr.reverse().join('-');
    return formatdate;
}

function deleteRegistration(id)
{
    $.ajax({
        url: '/Queue/deleteregistrations?Id=' + id,
        type: 'DELETE'
    }).done(function (res)
    {

    }).fail(function (res)
    {
    });
}

function checkIsTimeFree(date, time)
{
    var isTimeFree = false;

    try
    {
        $.ajax({
            async: false,
            url: '/QueueSeason/istimefree',
            data: {
                time: time,
                date: date
            },
            method: "GET"
        }).done(function (data)
        {
            if (data == true)
            {
                isTimeFree = true;
            }
        }).fail(function (e)
        {
            throw "";
        });

    } catch (e)
    {
        throw "";
    }

    return isTimeFree;
}

function daleteRegistrationIfExists(account, date, centerId)
{
    $.ajax({
        url: '/Queue/getregistrations',
        data: {
            userAccount: account,
            date: date
        },
        method: "GET"
    }).done(function (data)
    {
        if (data.content.length > 0)
        {
            for (var i = 0; i < data.content.length; i++)
            {
                var center = data.content[i].center.id;

                if (center == centerId)
                {
                    deleteRegistration(data.content[i].id);
                }
            }
        }
    }).fail(function (e)
    {

    });
}

function setWarningTextIfExists(account, date, centerId)
{
    $('#warningtext span').text('');
    var formattedDate = formatDBDate(date);

    $.ajax({
        url: '/Queue/getregistrations',
        data: {
            userAccount: account,
            date: formattedDate
        },
        method: "GET"
    }).done(function (data)
    {
        //checkRegistration = data.content.length > 0 ? data.content[0] : 0;
        if (data.content.length > 0)
        {
            for (var i = 0; i < data.content.length; i++)
            {
                var center = data.content[i].center.id;

                if (center == centerId)
                {
                    var time = data.content[i].qmsRegistrationTime.split('T')[1].substring(0, 5);
                    $('#warningtext span').text('Ваша попередня реєстрація на ' + time + ' буде скасована');
                }
            }
        }
    }).fail(function (e)
    {

    });
}



    //#endregion Tools