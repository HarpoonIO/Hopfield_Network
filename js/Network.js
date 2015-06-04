var networkModule = function (_args) {
    //alert("Starting!");
    console.log('starting!');
    // Constants
    var COLUMNS = 5;
    var ROWS = 7;
    var NO_OF_SYMBOLS = 3; // 3
    var MAX_NO_OF_ITERATIONS = 20;
    var SYMBOLS = [[ // Consists of 1, 2, 3, 3, pattern characters
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
    // The Number 2
    /*
    1, 1, 1, 1, 1,
        1, -1, -1, -1, 1,
        -1, -1, -1, 1, -1,
        -1, -1, 1, -1, -1,
        -1, 1, -1, -1, -1,
        1, -1, -1, 1, -1,
        1, 1, 1, 1, -1
    */
    var TEST_B = [
      1, 1, 1, 1, 1,
          1, -1, -1, -1, 1,
          -1, -1, -1, 1, -1,
          -1, -1, 1, -1, -1,
          -1, 1, -1, -1, -1,
          1, -1, -1, 1, -1,
          1, 1, 1, 1, -1
    ];

/*
         1, 1, 1, 1, 1,
        -1, -1, 1, -1, 1,
        -1, -1, -1, -1, 1,
        -1, -1, -1, -1, 1,
        -1, -1, -1, -1, 1,
        -1, -1, -1, -1, 1,
        -1, -1, -1, -1, 1
*/
    var TEST_C = [
      1, 1, 1, 1, 1,
        -1, -1, -1, -1, 1,
        -1, -1, -1, -1, 1,
        1, 1, 1, 1, 1,
        -1, -1, -1, -1, 1,
        -1, 1, 1, -1, 1,
        1, -1, -1, 1, 1
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

    var state = [];               // ints
    var newValue;                 // int
    var stateChanged;             // Boolean
    var command;                  // String

    // Constructor with String[] args...
    command = _args[0];
    setMatrix();
    printMatrix();
    console.log('\nSymbol 1');
    printSymbol(SYMBOLS[0]);
    console.log('\nSymbol 2');
    printSymbol(SYMBOLS[1]);
    console.log('\nSymbol 3');
    printSymbol(SYMBOLS[2]);
    switch(command){
        case "0":
            console.log('0 selected');
            printSymbol(SYMBOLS[0]);
            printSymbol(SYMBOLS[1]);
            printSymbol(SYMBOLS[2]);
            break;
        case "1":
            console.log('1 selected');
            printMatrix();
            break;
        case "2":
            console.log('2 selected');
            simulate(SYMBOLS[0]);
            break;
        case "3":
            console.log('3 selected');
            simulate(SYMBOLS[1]);
            break;
        case "4":
            console.log('4 selected');
            simulate(SYMBOLS[2]);
            break;
        case "5":
            console.log('5 selected');
            simulate(TEST_A);
            break;
        case "6":
            console.log('6 selected');
            simulate(TEST_B);
            break;
        case "7":
            console.log('7 selected');
            simulate(TEST_C);
            break;
        case "8":
            console.log('8 selected');
            simulate(TEST_D);
            break;
        case "9":
            console.log('9 selected');
            simulate(TEST_E);
            break;
        case "10":
            console.log('10 selected');
            simulate(TEST_F);
            break;
        default :
            console.log('Inside default');
            //alert("Give a command between 0 and 10, all inclusive...")
    }

    // ------------------------------ functions ------------------------------
    function printSymbols(){
      var rowString = '';
      for (var i = 0; i < SYMBOLS.length; i++) {
        for (var j = 0; j < SYMBOLS[i].length; j++) {
          rowString = (SYMBOLS[i][j] == 1) ? "(#)" : " • ";
          if(j+1 % 5 == 0){
            console.log(rowString);
            rowString = '';
          }
        }
      }
    }

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
        var rowString = '';
        for (var i = 0; i < (ROWS * COLUMNS); i++) {
            for (var j = 0; j < (ROWS * COLUMNS); j++) {
                //console.log((matrix[i][j] >= 0) ? "+" : ""); // I think we missed something here...
                rowString += (((matrix[i][j] >= 0) ? "+" : "") + matrix[i][j] + " ");
            }
            console.log(rowString);
            rowString = '';
        }
      //  console.log("");
    };

    function printSymbol(input) { // Input is int[] input
        var rowString = '';
        for (var i = 0; i < ROWS; i++) {
            for (var j = 0; j < COLUMNS; j++) {
                //console.log((input[i * COLUMNS + j] == 1) ? "x" : "");
                rowString += (input[i * COLUMNS + j] == 1) ? "(#)" : " • ";
            }
            console.log(rowString);
            rowString = '';
        }
        console.log();
    };

    // This is here the actual Hopfield Logic is happening
    function simulate(input) { // Input is int[] input

        // Iterates through the number of rows * columns, and sets all
        // values equivalent to the input-values ub tge state array. Where the matrix is a 2d-array
        // ROWS * COLUMNS
        for (var i = 0; i < (ROWS * COLUMNS); i++) {
            state[i] = input[i];
        }
        // The symbol is printed so the tester, can see
        // what the symbol looks like.
        console.log("Given symbol: ");
        printSymbol(state);

        // Iterations, async, random sequence...

        // Runs the amount of MAX_NO_OF_ITERATIONS
        for (var i = 0; i < MAX_NO_OF_ITERATIONS; i++) {
            console.log("Iteration number " + i);
            // We reset the stateChanged flag
            stateChanged = false;
            // Iterate for every item in our matrix
            for (var j = 0; j < (ROWS * COLUMNS); j++) {
                // The value the respective unit should
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
                //alert("Solution has been found in " + (i + 1) + " iterations!");
                console.log('solution has been found');
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

    var commands = ["6"];
    var foo = new networkModule(commands);
