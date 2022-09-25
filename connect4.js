/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {

board = new Array(WIDTH);
for(let i = 0; i<WIDTH; i++){
  board[i]= new Array(HEIGHT).fill(null);

}
console.log(board);
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');

  // TODO: add comment for this code
  //This code creats a top row and connects a dynampic click that will call the hendelClick function 
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
//It uses the establised const width to determin the number of cells that will exist in the above established row
//creating an id that is associated to the array key. It then appends the cell to the top row
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  //connects the top row that now also has cells to the table with id board 
  htmlBoard.append(top);

  // TODO: add comment for this code
  //this creates new rows the number of rows is determined by the const HEIGHT
  //it also creates new cells with in each row determined by the const WIDTH 
  //Sets the id of each cell the the keys in the 2d array that was created to associate to the cell
  //connects these cells to the rows 
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    //connects the created gameBoard rows to the HTMLboard that already has the top-Column and cells from above
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // loop over each cell in the column starting from bottom moving up
  for (let y = HEIGHT-1; y >= 0; y-- ){
    if (!board[y][x]){
      return y;
    }
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */
//This function creacte a new div in the cell that the new piece is placed 
//it gives that dive a class name associated to the curent play 
function placeInTable(y, x) {
 const newPiece = document.createElement('div');
 newPiece.classList.add('piece',`p${currPlayer}`);
 const place = document.getElementById(`${y}-${x}`);
 place.append(newPiece)
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  setTimeout(alert(msg), 500);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
board[y][x]= currPlayer;
  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }


  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if(board.every(row => row.every(cell => null))){
  return endGame('TIE No one is a winner')
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;


}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
//This code runs to look for all possible winning out comes
//When a new piece is added to the board this fuction first check to see is if there are 4 pieces of the current across a given row by adjusting the x value
//then check to see if there are 4 pieces in a row of the current player in a column by adjusting the the y value
//then check to see if there are 4 pieces in a row of the current player in a diagonal to the right by adjusting the the  x and y position
//then check to see if there are 4 pieces in a row of the current player in a diagonal to the lect  by adjusting the the x and y positions 

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
//Determine if any of the abjove checks for winner are true if one of them is true their is a winner and returns true 
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
