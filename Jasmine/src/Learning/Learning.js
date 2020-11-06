var global = this;

/////////////////
function foo()
{
    var bar = "bar";

    return this.bar;
}

function foo2()
{
    //"use strict";
    var bar = "bar";

    return this.bar;
}

var bar = "bar2";
///////////////////////
let z = 10;
/////////////////////////
var o1 = {
    bar2: "bar2",
    foo: function ()
    {
        return this.bar2;
    }
};

var o2 = { bar2: "bar4", foo: o1.foo };

var bar2 = "bar3";
var foo3 = o1.foo;
//////////////////////////

var bar5 = "bar2";

function daz()
{
    var bar5 = "bar5";
    function maz()
    {
        return this.bar5;
    }
    return maz();
}
//////////////////////

function foo4()
{
    return this.bar1;
}

var o3 = { bar1: "bar3" };

var bar1 = "bar1";

function outer()
{
    let x = 5;

    function inner()
    {
        x++;

        return x;
    }

    return inner;
}

function multiply(n)
{
    var x = n;

    return function (m)
    {
        return x * m;
    };
}
//////////////////////
let foo1 = (function ()
{
    let obj = { greeting: "hello" };

    return {
        display: function ()
        {
            return obj.greeting;
        }
    };
})();
////////////////////////
var Module = {};

Module.name = "MODULE 1";

Module.startModule = function ()
{
    return this.name;
};

(function Module2()
{
    message = 'Module2';
})();