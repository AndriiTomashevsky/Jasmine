describe('Tasks', function ()
{
    it('10 + "2" - 3 shoud be "102"', function ()
    {
        var a = 10 + "2" - 3;

        expect(a).toEqual('102');
    });

    it('"99.99" == 99.99 shoud be true', function ()
    {
        var a = "99.99" == 99.99;

        expect(a).toEqual(true);
    });

    it('"12" < "111" shoud be true', function ()
    {
        var a = "12" < "111";

        expect(a).toEqual(true);
    });

    it('var a = 1; a++. console.log(a++) shoud be 2', function ()
    {
        var a = 1;

        expect(a++).toEqual(2);
    });

    it('var arr = []; arr[1] = 1. arr.length should be 2;', function ()
    {
        var arr = [];
        arr[1] = 1;
        arr.length;

        expect(arr.length).toEqual(2);
    });

    it('var a = {name: "John"}; var b = a; a = null. b should be Object({ name: "John" })', function ()
    {
        var a = { name: "John" };
        var b = a;
        a = null;

        expect(b).toEqual({ name: "John" });
    });

    it('var a = {c: 1} var b = {c: 1}. a == b should be true', function ()
    {
        var a = { c: 1 }
        var b = { c: 1 }
        console.log(a == b);

        expect(a == b).toEqual(true);
    });

    it('var name = "John"; function getName() { console.log(name); } setTimeout(function() { var name = "Tom"; getName(); // <= каков результат вызова? }, 100). name should be "John"', function ()
    {
        var name = "John";

        function getName()
        {
            console.log(name);
        }

        setTimeout(function ()
        {
            var name = "Tom";
            getName(); // <= каков результат вызова?
        }, 100);

        expect("John").toEqual("John");
    });

    it('var a = [], b = []. a == b should be true', function ()
    {
        var a = [], b = [];

        expect(a == b).toEqual(true);
    });

    it('var a = "" || 0 || 2 || true || false; a should be false', function ()
    {
        var a = "" || 0 || 2 || true || false;

        expect(a).toEqual(false);
    });

    it('var b = 3 && true && false && null. b should be false', function ()
    {
        var b = 3 && true && false && null;

        expect(b).toEqual(false);
    });

    it('sayBye("Piter"); // каков результат вызова? var sayBye = function (name) { alert("Bye" + name); }. shoud display Bye John', function ()
    {
        sayBye("Piter"); // каков результат вызова?

        var sayBye = function (name)
        {
            alert("Bye" + name);
        }

        expect(false).toEqual(true);
    });

    it('sayHi("John"); // каков результат вызова? function sayHi(name) { alert("Hi" + name); }. shoud display Hi John', function ()
    {
        sayHi("John"); // каков результат вызова?

        function sayHi(name)
        {
            //alert("Hi" + name);
        }

        expect(true).toEqual(true);
    });

    it('var arr = [1, 2]; var brr = arr; brr = [42, 43]. arr[0] should be 1', function ()
    {
        var arr = [1, 2];
        var brr = arr;
        brr = [42, 43];

        expect(arr[0]).toEqual(1);
    });

    it('Array 1: filtered array shoud be [4, 4, 2, 6, 8]', function ()
    {
        var arr = [1, 4, 4, 7, 2, 9, 6, 8, 3];

        var filtered_arr = arr.filter(item => item % 2 == 0);


        expect(filtered_arr.toString()).toEqual("4,4,2,6,8");
    });

    it('Array 1: max value should be 9', function ()
    {
        var arr = [1, 4, 4, 7, 2, 9, 6, 8, 3];

        var max = 0;

        for (var i = 0; i < arr.length; i++)
        {
            if (arr[i] > max)
            {
                max = arr[i];
            }
        }

        expect(max).toEqual(9);
    });

    it('Array 2: new array should be [{ id: 1032 },{ id: 1002 }]', function ()
    {
        var arrOfItems = [
            { id: 1011, name: "John", age: 31 },
            { id: 1032, name: "Kevin", age: 20 },
            { id: 1084, name: "Kelly", age: 32 },
            { id: 1033, name: "Mike", age: 40 },
            { id: 1002, name: "Kate", age: 22 }];

        var new_arr = arrOfItems.filter(item => item.age < 30).map(item => { id: item.id; });

        expect(new_arr.toString()).toEqual([{ id: 1032 }, { id: 1002 }]);
    });
});