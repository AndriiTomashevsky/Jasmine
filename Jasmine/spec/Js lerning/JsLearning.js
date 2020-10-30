﻿var global = this;

describe('Learning JS', function ()
{
    function assert(message, expr)
    {
        if (arguments.length < 2)
        {
            throw new Error("Provide message and value to test");
        }
        if (!arguments[1])
        {
            throw new Error(arguments[0]);
        }
        assert.count++;
        return true;
    }
    assert.count = 0;

    it('"test array splice should not modify array', function ()
    {
        var arr = [1, 2, 3, 4, 5];
        var result = arr.splice(2, 3);

        expect(result).toEqual([3, 4, 5]);
    });

    describe('FunctionTest', function ()
    {
        it('"test function length property', function ()
        {
            expect(assert.length).toEqual(2);
            expect(document.getElementById.length).toEqual(1);
            expect(console.log.length).toEqual(0);
        });

        it('test dynamic relationship', function ()
        {
            function modify(a, b)
            {
                b = 42;
                arguments[0] = arguments[1];

                return a;
            }

            expect(modify(1)).toEqual(undefined);
        });

        it('test scope', function ()
        {
            function sum()
            {
                var i;
                expect(i).toBeUndefined();
            }

            sum();
        });

        it('GlobalObjectTest', function ()
        {
            expect(global).toEqual(window);
            expect(global.window).toEqual(window);
            expect(window.window).toEqual(window);

        });

        describe('CircleTest', function ()
        {
            var circle = {
                radius: 6,
                diameter: function ()
                {
                    return this.radius * 2;
                }
            };

            it('test should implicitly bind to object', function ()
            {
                expect(circle.diameter()).toEqual(12);
            });

            it('test implicit binding to the global object', function ()
            {
                var myDiameter = circle.diameter;

                expect(myDiameter()).toBeNaN();

                // WARNING: Never ever rely on implicit globals
                // This is just an example
                radius = 2;

                expect(myDiameter()).toEqual(4);
            });
        });


    });
});

describe('Flanagan', function ()
{
    it('test ', function ()
    {
        let points = [{ x: 0, y: 0 }, { x: 1, y: 1 }];

        // We can define our own methods, too. The "this" keyword refers to the object
        // on which the method is defined: in this case, the points array from earlier.
        points.dist = function ()
        { // Define a method to compute distance between points
            let p1 = this[0]; // First element of array we're invoked on
            let p2 = this[1]; // Second element of the "this" object
            let a = p2.x - p1.x; // Difference in x coordinates
            let b = p2.y - p1.y; // Difference in y coordinates
            return Math.sqrt(a * a + // The Pythagorean theorem
                b * b); // Math.sqrt() computes the square root
        };

        expect(points.dist()).toEqual(Math.sqrt(2)); // =>: distance between our 2 points
    });

    describe('test bind(), call(), apply()', function ()
    {
        it('f.bind(o) should bind object o and function f', function ()
        {
            function f(y) { return this.x + y; } // This function needs to be bound
            let o = { x: 1 }; // An object we'll bind to
            let g = f.bind(o); // Calling g(x) invokes f() on o

            expect(g(2)).toEqual(3); // => 3
        });

        it('f.bind(null, 1) should bind object and function f with parameters', function ()
        {
            function f(x, y) { return x + y; } // Return the sum of 2 args
            let g = f.bind(null, 1); // Bind the first argument to 1

            expect(g(2)).toEqual(3); // => 3: x is bound to 1, and we pass 2 for the y argument

            function f2(y, z) { return this.x + y + z; }
            let g2 = f2.bind({ x: 1 }, 2); // Bind this and y
            g2(3); // => 6: this.x is bound to 1, y is bound to 2 and z is 3
        });

        it('f.call(o) should pass object o to function f', function ()
        {
            function f() { return this.x; }
            let o = { x: 3 };

            expect(f.call(o)).toEqual(3);
        });

        it('f.call(o, 1, 2) should pass object o to function f with two parametes', function ()
        {
            function f(y, z) { return this.x + y + z; }

            let o = { x: 3 };

            expect(f.call(o, 1, 2)).toEqual(6);
        });

        it('f.apply(o, 1, 2) should pass object o to function f with array', function ()
        {
            function f(y, z) { return this.x + y + z; }

            let o = { x: 3 };

            expect(f.apply(o, [1, 2])).toEqual(6);
        });


        it('call and apply should add object o to function f 3', function ()
        {
            let arrayOfNumbers = [1, 2, 3];
            let biggest = Math.max.apply(Math, arrayOfNumbers);
            let biggest2 = Math.max(arrayOfNumbers);

            expect(biggest).toEqual(3);
            expect(biggest2).toBeNaN();
        });
    });
});

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


describe('METANIT', function ()
{
    describe('let and var', function ()
    {
        it('difference of let and var', function ()
        {
            function displayZ()
            {
                let z = 20;

                {
                    let z = 30;
                }

                return z;
            }

            expect(displayZ()).toBe(20);
            expect(z).toBe(10);

            function displayVarZ()
            {
                var z = 20;

                {
                    // var z = 30; Error!
                }

                return z;
            }

            expect(displayVarZ()).toBe(20);
            expect(z).toBe(10);
        });

        it('variable without var or let should be global', function ()
        {
            function bar()
            {
                a = "25";
            }
            bar();

            expect(a).toBe("25");
        });

        it('variable without var or let in strict mode should throw error', function ()
        {
            function bar()
            {
                //"use strict";
                ff = "25";
            }
            bar();

            expect(ff).toEqual("25"); //ReferenceError: ff is not defined
        });
    });

    describe('this', function ()
    {
        it('this inside function should be global object window', function ()
        {
            expect(foo()).toBe("bar2");
        });

        it('this inside function in strict mode should trow error', function ()
        {
            expect(foo2()).toBe("bar2"); //  Cannot read property 'bar' of undefined
        });

        it('this inside object should references to object', function ()
        {
            var o3 = { bar: "bar3", foo: foo };
            var o4 = { bar: "bar4", foo: foo };

            expect(foo()).toEqual("bar2");
            expect(o3.foo()).toEqual("bar3");
            expect(o4.foo()).toEqual("bar4");
        });

        it('this inside object should references to object 2', function ()
        {
            expect(foo3()).toEqual("bar3");
            expect(o1.foo()).toEqual("bar2");
            expect(o2.foo()).toEqual("bar4");
        });

        it('this inside function should be global object window 2', function ()
        {
            expect(daz()).toEqual("bar2");
        });

        it('this with call(o) or apply(o) should references to o', function ()
        {
            expect(foo4()).toEqual("bar1");
            expect(foo4.call(o3)).toEqual("bar3");
            expect(foo4.apply(o3)).toEqual("bar3");
        });

        it('this with bind(o) should references to o and bind(o) create new function', function ()
        {
            var func = foo4.bind(o3);
            expect(func()).toEqual("bar3");
        });

    });

});
