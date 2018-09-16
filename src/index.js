module.exports = function solveSudoku(matrix) {
    
    let noRepeatChecker = Array([9]);

    const clearChecker = () => {
        //noRepeatChecker.fill(false); - slowly
        for (let i = 1; i <= 9; i++) noRepeatChecker[i] = false;
        
    };

    const isRowValid = (row) => {
        clearChecker();
        for (let column = 0; column < 9; column++) {
            if (matrix[row][column] != 0) {
                if (noRepeatChecker[matrix[row][column]]) 
                    return false; // it's repeat one
                noRepeatChecker[matrix[row][column]] = true;
            }
        }
        return true;
    }

    const isColValid = (column) => {
        clearChecker();
        for (let row = 0; row < 9; row++) {
            if (matrix[row][column] != 0) {
                if (noRepeatChecker[matrix[row][column]])  
                    return false; // it's repeat one
                noRepeatChecker[matrix[row][column]] = true;
            }
        }
        return true;
    }

    const isBlock3x3Valid = (startRow, startColumn) =>
    {
        clearChecker();
        for (let row = startRow; row < startRow+3; row++) {
            for (let column = startColumn; column < startColumn+3; column++) {
                if (matrix[row][column] != 0) {
                    if (noRepeatChecker[matrix[row][column]]) 
                        return false; // it's repeat one
                    noRepeatChecker[matrix[row][column]] = true;
                }  
            }
        }
        return true;
    }

    const recursiveSolver =(row, column) =>
    {
        // Skip all filled cells
        while (row < 9 && matrix[row][column] != 0) {
            column++;
            if (column == 9) {
                row++;      // go to neхt row  
                column = 0; // & first column
            }
        }
        /* Need no more recursion */
        if (row == 9) return true;

        /* Try each value in recursion */
        for (let k = 1; k <= 9; k++) {
            matrix[row][column] = k;
            if (isRowValid(row) && isColValid(column) 
                && isBlock3x3Valid(row - row%3, column - column%3) 
                && recursiveSolver(row, column)) 
                return true;
        }  
      
        /* Close branch */
        matrix[row][column] = 0;
        return false;
    } 

    recursiveSolver(0, 0);
    return matrix;
}

