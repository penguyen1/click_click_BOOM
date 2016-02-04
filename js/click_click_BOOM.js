function Box(){
  this.hidden = true;       // box is not shown
  this.mine = false;        // box is not a mine
  this.check = false;       // box has not been checked yet
  this.show = function(){   // shows the object
    this.hidden = false;
    this.check = true;
  };
  this.isMine = function(){ // makes box a mine
    this.mine = true;       
  };
};

function Board(){
  this.board;                   // holds array of Box objects
  this.num;                     // stores game difficulty level (easy:5 med:10 hard:15)
  // var $board = $('#board');     // gets HTML #board selector

  // START A NEW GAME
  this.startGame = function(num){   
    this.board = [];                // new game = empty game board
    this.num = num;                 // stores difficulty level value
    var mines = (num*num)/5;        // 20% of num*num are mines

    for(var i=0; i<(num*num); i++){
      var box = new Box();          // creates a new Box object
      this.board.push(box);         // adds new Box object to board array
      
      // var $cell = $('<div>');       // creates a new <div> tag
      // $cell.addClass('boxes').attr('id', i+1);                        // <div class="boxes" id="#"></div>
      // // add click event listener here???   // use stopPropagation!
      // $board.append($cell);                         // adds to HTML $board 
    }
    
    for(var a=0; a<mines; a++){                         // randomly places mines
      var random = Math.floor(Math.random()*(num*num));
      if (this.board[random].mine){                     // if object mine value is already true   -- use a while loop??
        random = Math.floor(Math.random()*(num*num)); } // get another random number
      this.board[random].isMine();                      // sets Box object mine = true
    }
  };

  // checks current box -> calls neighbors of neighboring boxes
  this.checkBox = function(box, depth){
    // box.check = true;
    if(depth === 0){
      this.board[box].show();                    // shows box object
      if(this.board[box].mine === true){         // its a mine!
        // GAME OVER YOU LOSE !!! 
      } else {                                      // not a mine
        var neighbors = checkAround(box);        // gets array of neighbors
        for(var i=0; i<neighbors.length; i++){
          checkBox(neighbors[i], 1);                // checks box of depth 1
        }   // ^^^ return statement ????
      }         
    } 

    if(depth === 1){
      var neighbors2 = checkAround(box);         // gets 2nd layer array of neighbors 
      var numOfMines = countMines(neighbors2);      // # of mines in 2nd layer array
      var $div = $('#'+(box-1));                    // get <div> tag with id=(box-1)

      if(numOfMines > 0){
        this.board[box].show();                  // show the box (hidden: false & check: true)
        $div.text(numOfMines);                      // adds numOfMines count to <div> tag
      } else {    // numOfMines = 0
        this.board[box].show();
        $div.text('');                              // displays blank
      }
    }
  };

  // check if all boxes are shown (hidden: false)
  this.checkWin = function(){                           
    var notMines = [];
    for(var i=0; i<this.board.length; i++){
      if(this.board[i].mine === false){ notMines.push(this.board[i]); }      // array of NON-MINES    -- DRY this
    }

    for(var x=0; x<notMines.length; x++){
      if(notMines[x].hidden === true){ return false; }        // a box is STILL hidden                -- DRY this
    } return true;                                            // all boxes are shown - YOU WIN!
  };

  // displays Game Over message
  this.gameOver = function(){                   // can i call this.checkWin() from here ????    
    // if checkWin() - true ---> player wins
    // else 'GAME OVER YOU LOSE!'
  };      
};

// returns array of neighboring boxes of the input
// apparently you can add this into Board() constructor! - remove level when you do!
function checkAround(box, level, board){
  var result = [];              // determines location of box on the board
  var neighbors = [];           // array of neighboring boxes within 0-level^2
  var max = Math.pow(level,2); 
  //if(box<1 || box>max){ return null; }   // or return 0 -- is this necessary?
  if(box%level === 0){          // box is on right edge of game board
    neighbors = [box-level-1, box-level, box-1, box+level-1, box+level];
  } else if (box%level === 1){  // box is on left edge of game board
    neighbors = [box-level, box-level+1, box+1, box+level, box+level+1];
  } else {                      // box is somewhere inside the game board
    neighbors = [box-level-1, box-level, box-level+1, box-1, box+1, box+level-1, box+level, box+level+1];
  }

  // original code REMIX
  for(var i=1; i<=neighbors.length; i++){
    var current = neighbors[i-1];
    if(current>0 && current<=max && !board[current].check){   // betw 0-max && check===false
      result.push(current);
    }
  } return result;
};
// 
  // this is the ORIGINAL code
  // for(var i=0; i<neighbors.length; i++){
  //   if(neighbors[i]>0 && neighbors[i]<=max){    // also check=false!
  //     result.push(neighbors[i]);
  //   }
  // } return result;

// returns total num of mines around box input
// apparently you can add this into Board() constructor! - remove boardArray when you do!
function countMines(box, boardArray){      
  var total_mines = 0;                      // total number of mines
  var neighbors = checkAround(box, 4, boardArray);      // 4 is for testing

  for(var i=1; i<=neighbors.length; i++){
    var current = neighbors[i-1];
    if(boardArray[(current-1)].mine){ total_mines+= 1; }     // current box is a mine
  } return total_mines;
};
