function Box(){
  this.hidden = true;       // box is not shown
  this.mine = false;        // box is not a mine
  this.check = false;       // box has not been checked yet
  
  this.show = function(){   // shows the object
    this.hidden = false;
    this.check = true;
  };

  this.isMine = function(){ // box is a mine!
    this.mine = true;       
  };
};

// function getAround(boxNum){

// };

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
      
      var $cell = $('<div>');       // creates a new <div> tag
      $cell.addClass('boxes').attr('id', i+1);                        // <div class="boxes" id="#"></div>
      // add click event listener here???   // use stopPropagation!
      $board.append($cell);                         // adds to HTML $board 
    }
    
    for(var a=0; a<mines; a++){                         // randomly places mines
      var random = Math.floor(Math.random()*(num*num));
      if (this.board[random].mine){                     // if object mine value is already true   -- use a while loop??
        random = Math.floor(Math.random()*(num*num)); } // get another random number
      this.board[random].isMine();                      // sets Box object mine = true
    }
  };

  // checks current box -> calls neighbors of neighboring boxes
  this.checkBox = function(boxNum, depth){
    if(depth === 0){
      this.board[boxNum].show();                    // shows box object
      if(this.board[boxNum].mine === true){         // its a mine!
        // GAME OVER YOU LOSE !!! 
      } else {                                      // not a mine
        var neighbors = checkAround(boxNum);        // gets array of neighbors
        for(var i=0; i<neighbors.length; i++){
          checkBox(neighbors[i], 1);                // checks boxNum of depth 1
        }   // ^^^ return statement ????
      }         
    } 

    if(depth === 1){
      var neighbors2 = checkAround(boxNum);         // gets 2nd layer array of neighbors 
      var numOfMines = countMines(neighbors2);      // # of mines in 2nd layer array
      var $div = $('#'+(boxNum-1));                    // get <div> tag with id=(boxNum-1)

      if(numOfMines > 0){
        this.board[boxNum].show();                  // show the box (hidden: false & check: true)
        $div.text(numOfMines);                      // adds numOfMines count to <div> tag
      } else {    // numOfMines = 0
        this.board[boxNum].show();
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

