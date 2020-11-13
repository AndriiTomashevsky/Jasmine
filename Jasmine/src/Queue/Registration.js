(function (global)
{
    function Registration(params)
    {
        this.company = params.company;
        this.time = params.time;
        this.email = params.email;
        this.date = params.date;
        this.fullName = params.fullName;
        this.phone = params.phone;
        this.annotation = params.annotation;
        this.serviceCenter = params.serviceCenter;
    }

    global.Registration = Registration;

})(this);
