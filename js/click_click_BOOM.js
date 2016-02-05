function Box(){
  this.hidden = true;       // box is NOT shown
  this.mine = false;        // box is NOT a mine
  this.check = false;       // box has NOT been checked yet
  this.show = function(){   // shows the object
    this.hidden = false;
    this.check = true;  };
  this.isMine = function(){ // box is NOW A MINE
    this.mine = true;   };
};

function Board(){
  this.board;               // holds array of Box objects
  this.level;               // stores game board dimension (easy:5 med:10 hard:15)
  var $board = $('#board');

  // START A NEW GAME
  this.startGame = function(level){   
    this.board = [];                            // empties game board
    this.level = level;                         // stores game dimension value
    var mines = (Math.pow(level,2))/5;          // 20% of total area of boxes
    var size = ((30/level)-.125)+"em";

    for(var i=0; i<Math.pow(level,2); i++){
      var box = new Box();                      // creates a new Box object
      this.board.push(box);                     // adds new Box object to board array
      
      var $cell = $('<div>');                   // creates a new <div> tag
      $cell.addClass('box').attr('id', i+1).css({"width":size,"height":size});    // <div class="boxes" id="i+1">
      $cell.click(function(event){
        $boxNum = parseInt($(event.target).attr('id'));
        console.log('You clicked Box #'+$boxNum + '. It is a: ' +typeof($boxNum));
        
      });
      $board.append($cell);                     // adds to HTML $board 
    }
    
    for(var a=0; a<mines; a++){             // randomly places mines
      do{                                   // ensures no repetitive random numbers
        var random = Math.floor(Math.random()*Math.pow(level,2)); 
      } while (this.board[random].mine);
      this.board[random].isMine();          // Box object is now a mine
    }
  };

  // checks & displays current box and its neighboring boxes ( RECURSION )
  this.checkBox = function(box, depth){           // box is called from clicked <div> id (dont forget to -1!)
    var numOfMines, neighbors;
    if(depth === 0){
      this.board[box-1].show();                    
      // is this a mine ??
      if(this.board[box-1].mine === true){        // ITS A MINE! - call this.gameOver()
        this.gameOver();                          // GAME OVER YOU LOSE !!! 
      } else {                                   
        numOfMines = countMines(box);             // gets # of mines around box(input)                                                // how do i call this?
        neighbors = checkAround(box);             // gets array of neighboring boxes                                                       // how do i call this?
        $current.text(numOfMines);                // adds to <div> to be seen on webpage
        for(var i=0; i<neighbors.length; i++){
          checkBox(neighbors[i], 1);              // calls itself with new box value (RECURSION!!)
        }   
      }         
    } 
    if(depth === 1){                              
      if(this.board[box-1].mine === true){          // is this a mine ??
        this.board[box-1].check = true;
      } else {
        numOfMines = countMines(box);             // gets # of mines around box(input)
        this.board[box-1].show();
        $current.text(numOfMines);                // adds to <div> to be seen on webpage
      }
      return;
    }
  };

  // returns array of neighboring boxes of the input
  this.checkAround = function(box){
    var neighbors = [];                   // holds array of neighboring boxes
    var neighborBox = [];                 // algorithm to find neighboring boxes depending on box location on board
    var max = Math.pow(this.level,2); 

    if(box%this.level === 0){             // box is on right edge of game board
      neighborBox = [box-this.level-1, box-this.level, box-1, box+this.level-1, box+this.level];
    } else if (box%this.level === 1){     // box is on left edge of game board
      neighborBox = [box-this.level, box-this.level+1, box+1, box+this.level, box+this.level+1];
    } else {                              // box is somewhere inside the game board
      neighborBox = [box-this.level-1, box-this.level, box-this.level+1, box-1, box+1, box+this.level-1, box+this.level, box+this.level+1];
    }

    // original code REMIX
    for(var i=1; i<=neighborBox.length; i++){                         // i represents each box # starting at 1
      var current = neighborBox[i-1];                                 // neighborBox[0]
      if(current>0 && current<=max && !this.board[current].check){    // ONLY IF num is between 0-max && check===false
        neighbors.push(current);
      }
    } return neighbors;
  };

  // returns total num of mines around box(input)
  this.countMines = function(box){      
    var total_mines = 0;                                      // total number of mines
    var neighbors = this.checkAround(box);  

    for(var i=1; i<=neighbors.length; i++){
      var current = neighbors[i-1];                           // neighbors[0]
      if(this.board[(current-1)].mine){ total_mines+= 1; }    // this box is a mine
    } return total_mines;
  };

  // check if all boxes are shown (default hidden: false)
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
  this.gameOver = function(){
    alert(this.checkWin() ? 'Great Game! You Win!' : 'GAME OVER! YOU LOSE!'); 
  };      
};












$(document).ready(function(){
    console.log('lock and loaded');
    var $board = $('#board');                 // gets game board <div>
    var $num, $players;                       // $num=game-level $players=2players

    var $boxNum;   // gets clicked <div> id number

    $('.game-level').click(function(event){
      $num = $(event.target).attr('id');      // grabs id of easy|medium|hard
      console.log('this game will be: ' + $num);
      
      $('#levels').remove();                  // removes buttons
      $('#instructions').remove();            // removes instructions
      $('.container').append($('<div id="board">'));     // add new gameBoard to HTML
      var ccb = new Board();
      ccb.startGame($num);

    });
  });
