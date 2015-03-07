var testModule = (function(){

    var foo = function(){
        console.log("Called from the function foo!");
    };

    return{
        foo: foo
    }

})();