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

function Board(){
  this.board = [];                  // holds array of Box objects
  //var $board = $('#board');         // gets HTML #board selector

  this.startGame = function(num){   // creates Box objects & appends to HTML board
    var mines = (num*num)/5;        // 20% of num*num are mines

    for(var i=0; i<(num*num); i++){
      var box = new Box();          // creates a new Box object
      this.board.push(box);         // adds new Box object to board array
      
      // var $cell = $('<div class="boxes"></div>');   // creates a new <div> tag
      // $cell.attr('id', i+1);                        // <div class="boxes" id="#"></div>
      // $board.append($cell);                         // adds to HTML $board 
    }
    
    for(var a=0; a<mines; a++){                     // randomly places mines
      var random = Math.floor(Math.random()*(num*num));
      if (this.board[random].mine){                 // this.board[random] is already true   
        random = Math.floor(Math.random()*(num*num)); }
      this.board[random].isMine();                  // sets Box object mine = true
    }
  };

  this.checkWin = function(){                       // checks if all boxes are shown (hidden: false)
    var notMines = [];
    for(var i=0; i<this.board.length; i++){
      if(this.board[i].mine === false){ notMines.push(this.board[i]); }      // array of NON-MINES
    }

    for(var x=0; x<notMines.length; x++){
      if(notMines[x].hidden === true){ return false; }        // a box is STILL hidden
    } return true;                                            // all boxes are shown - YOU WIN!
  };

  this.gameOver = function(){               // displays Game Over message
    // if checkWin() - true ---> player wins
    // else 'GAME OVER YOU LOSE!'
  };      
};