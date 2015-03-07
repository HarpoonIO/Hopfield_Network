var networkModule = function (_args) {

    // Constants
    var COLUMNS = 5;
    var ROWS = 7;
    var NO_OF_SYMBOLS = 3;
    var MAX_NO_OF_ITERATIONS = 10;
    var SYMBOLS = [[
        -1, -1, -1, -1, 1,
        -1, -1, -1, -1, 1,
        -1, -1, -1, -1, 1,
        -1, -1, -1, -1, 1,
        -1, -1, -1, -1, 1,
        -1, -1, -1, -1, 1,
        -1, -1, -1, -1, 1
    ], [
        1, 1, 1, 1, 1,
        -1, -1, -1, -1, 1,
        -1, -1, -1, -1, 1,
        1, 1, 1, 1, 1,
        1, -1, -1, -1, -1,
        1, -1, -1, -1, -1,
        1, 1, 1, 1, 1
    ], [
        1, 1, 1, 1, 1,
        -1, -1, -1, -1, 1,
        -1, -1, -1, -1, 1,
        1, 1, 1, 1, 1,
        -1, -1, -1, -1, 1,
        -1, -1, -1, -1, 1,
        1, 1, 1, 1, 1
    ]];

    var TEST_A = [
        -1, -1, -1, 1, 1,
        -1, -1, 1, -1, 1,
        -1, -1, -1, -1, 1,
        -1, -1, -1, -1, 1,
        -1, -1, -1, -1, 1,
        -1, -1, -1, -1, 1,
        -1, -1, -1, -1, 1
    ];

    var TEST_B = [
        1, 1, 1, 1, 1,
        1, -1, -1, -1, 1,
        -1, -1, -1, 1, -1,
        -1, -1, 1, -1, -1,
        -1, 1, -1, -1, -1,
        1, -1, -1, 1, -1,
        1, 1, 1, 1, -1
    ];

    var TEST_C = [
        1, 1, 1, 1, 1,
        -1, -1, 1, -1, 1,
        -1, -1, -1, -1, 1,
        -1, -1, -1, -1, 1,
        -1, -1, -1, -1, 1,
        -1, -1, -1, -1, 1,
        -1, -1, -1, -1, 1
    ];

    var TEST_D = [
        1, 1, 1, 1, 1,
        1, 1, 1, 1, 1,
        1, 1, 1, 1, 1,
        1, 1, 1, 1, 1,
        1, 1, 1, 1, 1,
        1, 1, 1, 1, 1,
        1, 1, 1, 1, 1
    ];

    var TEST_E = [
        -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1
    ];

    var TEST_F = [
        -1, 1, -1, 1, -1,
        -1, 1, -1, -1, 1,
        -1, -1, -1, -1, -1,
        1, 1, 1, -1, -1,
        -1, -1, 1, 1, -1,
        1, 1, 1, 1, 1,
        -1, 1, -1, 1, 1
    ];

    // Instance variables
    var matrix = [[]];  // ints
    var state = [];     // ints
    var newValue;       // int
    var stateChanged;   // Boolean
    var command;        // String

    // Constructor with String[] args...
    command = _args[0];
    //setMatrix();
    // TODO: Turn into switch, this looks ridiculous
    if (command === "0") {
        printSymbol(SYMBOLS[0]);
        printSymbol(SYMBOLS[1]);
        printSymbol(SYMBOLS[2]);
    }
    if (command === "1") {
        printMatrix();
    }
    if (command === "2") {
        simulate(SYMBOLS[0]);
    }
    if (command === "3") {
        simulate(SYMBOLS[1]);
    }
    if (command === "4") {
        simulate(SYMBOLS[2]);
    }
    if (command === "5") {
        simulate(TEST_A);
    }
    if (command === "6") {
        simulate(TEST_B);
    }
    if (command === "7") {
        simulate(TEST_C);
    }
    if (command === "8") {
        simulate(TEST_D);
    }
    if (command === "9") {
        simulate(TEST_E);
    }
    if (command === "10") {
        simulate(TEST_F);
    }

    // ------------------------------ functions ------------------------------
    var setMatrix = function () {

        for (var i = 0; i < (ROWS * COLUMNS); i++) {

            for (var j = 0; j < (ROWS * COLUMNS); j++) {
                matrix[i][j] = 0;
                for (var k = 0; k < NO_OF_SYMBOLS; k++) {
                    matrix[i][j] += SYMBOLS[k][i] * SYMBOLS[k][j];
                }
                if (i == j) {
                    matrix[i][j] -= NO_OF_SYMBOLS; // TODO: Check whether this is a valid index in 2dArray in js...
                }
            }
        }
    };

    var printMatrix = function () {

        for (var i = 0; i < (ROWS * COLUMNS); i++) {
            for (var j = 0; j < (ROWS * COLUMNS); j++) {
                console.log((matrix[i][j] >= 0) ? "+" : ""); // I think we missed something here...
            }
            console.log();
        }
        console.log("");
    };

    var printSymbol = function (input) { // Input is int[] input

        for (var i = 0; i < ROWS; i++) {
            for (var j = 0; j < COLUMNS; j++) {
                console.log((input[i * COLUMNS + j] == 1) ? "x" : "");
            }
            console.log();
        }
        console.log();
    };

    var simulate = function (input) { // Input is int[] input

        for (var i = 0; i < (ROWS * COLUMNS); i++) {
            state[i] = input[i];
        }
        console.log("Given symbol: ");
        printSymbol(state);

        // Iterations, async, random sequence...
        for (var i = 0; i < MAX_NO_OF_ITERATIONS; i++) {
            console.log("Iteration number " + i);
            stateChanged = false;
            for (var j = 0; j < (ROWS * COLUMNS); j++) {

                newValue = 0;
                for (var k = 0; k < ROWS; k++) {
                    newValue += matrix[j][k] * state[k];
                }
                if(newValue > 0){
                    newValue = 1;
                }else{
                    if(newValue < 0){
                       newValue = -1;
                    }else{
                        newValue = state[j];
                    }
                }
                if(newValue != state[j]){
                    stateChanged = true;
                }
                state[j] = newValue;
            }
            printSymbol(state);
            if(!stateChanged){
                console.log("Found solution, done!");
                break;
            }
            if(i == MAX_NO_OF_ITERATIONS){
               console.log("Maximum number of iterations has been reached!");
            }
        }
    };

    var foo = function () {
        console.log("Called form the Network class!");
    };

    return {
        foo: foo
    };

};