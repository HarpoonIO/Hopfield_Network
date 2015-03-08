var networkModule = function (_args) {
    alert("Starting!");
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
    var matrix = createMatrix();  // ints
    printMatrix();
    var state = [];               // ints
    var newValue;                 // int
    var stateChanged;             // Boolean
    var command;                  // String

    // Constructor with String[] args...
    command = _args[0];
    setMatrix();
    switch(command){
        case "0":
            printSymbol(SYMBOLS[0]);
            printSymbol(SYMBOLS[1]);
            printSymbol(SYMBOLS[2]);
            break;
        case "1":
            printMatrix();
            break;
        case "2":
            simulate(SYMBOLS[0]);
            break;
        case "3":
            simulate(SYMBOLS[1]);
            break;
        case "4":
            simulate(SYMBOLS[2]);
            break;
        case "5":
            simulate(TEST_A);
            break;
        case "6":
            simulate(TEST_B);
            break;
        case "7":
            simulate(TEST_C);
            break;
        case "8":
            simulate(TEST_D);
            break;
        case "9":
            simulate(TEST_E);
            break;
        case "10":
            simulate(TEST_F);
            break;
        default :
            alert("Give a command between 0 and 10, all inclusive...")
    }

    // ------------------------------ functions ------------------------------
    function setMatrix() {

        for (var i = 0; i < (ROWS * COLUMNS); i++) {

            for (var j = 0; j < (ROWS * COLUMNS); j++) {
                matrix[i][j] = 0;
                for (var k = 0; k < NO_OF_SYMBOLS; k++) {
                    matrix[i][j] += SYMBOLS[k][i] * SYMBOLS[k][j];
                }
                if (i == j) {
                    matrix[i][j] -= NO_OF_SYMBOLS;
                }
            }
        }
    };

    function printMatrix() {

        for (var i = 0; i < (ROWS * COLUMNS); i++) {
            for (var j = 0; j < (ROWS * COLUMNS); j++) {
                console.log((matrix[i][j] >= 0) ? "+" : ""); // I think we missed something here...
            }
            console.log();
        }
        console.log("");
    };

    function printSymbol(input) { // Input is int[] input

        for (var i = 0; i < ROWS; i++) {
            for (var j = 0; j < COLUMNS; j++) {
                console.log((input[i * COLUMNS + j] == 1) ? "x" : "");
            }
            console.log();
        }
        console.log();
    };

    function simulate(input) { // Input is int[] input

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
                if (newValue > 0) {
                    newValue = 1;
                } else {
                    if (newValue < 0) {
                        newValue = -1;
                    } else {
                        newValue = state[j];
                    }
                }
                if (newValue != state[j]) {
                    stateChanged = true;
                }
                state[j] = newValue;
            }
            printSymbol(state);
            if (!stateChanged) {
                alert("Solution has been found in " + (i + 1) + " iterations!");
                break;
            }
            if (i == MAX_NO_OF_ITERATIONS) {
                console.log("Maximum number of iterations has been reached!");
            }
        }
    };

    function createMatrix() {
        var temp = new Array(ROWS * COLUMNS);
        for (var i = 0; i < temp.length; i++) {
            temp[i] = new Array(ROWS * COLUMNS);
        }
        return temp;
    };

    return {
        foo: createMatrix
    };

};