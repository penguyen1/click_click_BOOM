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
  var $cell;//whats this for??
  var that = this;          // stores the 'this' into context!!

  // START A NEW GAME
  this.startGame = function(level){   
    this.board = [];                            // empties game board
    this.level = level;                         // stores game dimension value
    var mines = (Math.pow(level,2))/5;          // 20% of total area of boxes
    var size = ((30/level)-.125)+"em";
    $board = $('#board');
    for(var i=0; i<Math.pow(level,2); i++){
      var box = new Box();                      // creates a new Box object
      this.board.push(box);                     // adds new Box object to board array
      
      $cell = $('<div>');                   // creates a new <div> tag
      $cell.addClass('box').attr('id', i+1).css({"width":size,"height":size}).text(i+1);    // <div class="boxes" id="i+1">
      $cell.on('click',function(event){
        $boxNum = parseInt($(event.target).attr('id'));
        console.log('\nYou clicked Box '+$boxNum);
        //that.checkBox($boxNum,0);           // ERRRRORRRRRR -- used 'that'
        // that.checkAround($boxNum);            // testing checkAround  --- WORKS 12:30pm today
        that.countMines($boxNum);             // testing countMines
      });
      $board.append($cell);                     // adds to HTML $board 
    }
    
    for(var a=0; a<mines; a++){             // randomly places mines
      do{                                   // ensures no repetitive random numbers
        var random = Math.floor(Math.random()*Math.pow(level,2));     // 0-24
      } while (this.board[random].mine);
      console.log('random: '+random);
      this.board[random].isMine();          // Box object is now a mine
    }
    // console.log('the board: '+this.board[19].check);
  };

  // checks & displays current box and its neighboring boxes ( RECURSION )
  this.checkBox = function(box, depth){           // box is called from clicked <div> id (dont forget to -1!)
    var numOfMines, neighbors;
    //console.log('Checking box '+box+' at depth '+depth);        // testing

    if(depth === 0){
      this.board[box-1].show();                    
      // is this a mine ??
      if(this.board[box-1].mine === true){        // ITS A MINE! - call this.gameOver()
        that.gameOver();                          // GAME OVER YOU LOSE !!! 
      } else {                                   
        numOfMines = that.countMines(box);             // gets # of mines around box(input)                                                // how do i call this?
        neighbors = that.checkAround(box);             // gets array of neighboring boxes                                                       // how do i call this?
    console.log('WHAT IS THE CELL? '+$cell);
      // jQuery current object
        console.log($cell.eq(box-1));
        $board[box-1].text(numOfMines);                // adds to <div> to be seen on webpage
        for(var i=0; i<neighbors.length; i++){
          that.checkBox(neighbors[i], 1);              // calls itself with new box value (RECURSION!!)
        }   
      }         
    } 
    if(depth === 1){                              
      if(this.board[box-1].mine === true){          // is this a mine ??
        this.board[box-1].check = true;
      } else {
        numOfMines = that.countMines(box);             // gets # of mines around box(input)
        this.board[box-1].show();
        $board[box-1].text(numOfMines);                // adds to <div> to be seen on webpage
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
      neighborBox = [box-this.level-1, box-this.level, box-1, parseInt(box)+parseInt(this.level)-1, parseInt(box)+parseInt(this.level)];
    } else if (box%this.level === 1){     // box is on left edge of game board
      neighborBox = [box-this.level, box-this.level+1, box+1, parseInt(box)+parseInt(this.level), parseInt(box)+parseInt(this.level)+1];
    } else {                              // box is somewhere inside the game board
      neighborBox = [box-this.level-1, box-this.level, box-this.level+1, box-1, box+1, parseInt(box)+parseInt(this.level)-1, parseInt(box)+parseInt(this.level), parseInt(box)+parseInt(this.level)+1];
    }
    // console.log('All neighbors: '+neighborBox);

    // filters neighborBox
    for(var i=0; i<neighborBox.length; i++){                         // i represents each box # starting at 1
      var current = neighborBox[i];                                 // value of neighborBox[0]
      // console.log('checked?: '+this.board[current].check);
      if(current>0 && current<=max && !(this.board[current - 1].check)){    // ONLY IF num is between 0-max && check===false
        neighbors.push(current);
      }
    } 

    console.log('Neighbors of Box'+box+': '+neighbors);
    return neighbors;
  };

  // returns total num of mines around box(input)
  this.countMines = function(box){      
    var total_mines = 0;                     // total number of mines
    var neighbors = this.checkAround(box);   // get neighboring boxes

    for(var i=1; i<=neighbors.length; i++){
      var current = neighbors[i-1];                           // neighbors[0]
      if(this.board[(current-1)].mine){ total_mines+= 1; }    // this box is a mine
    } 

    console.log('There\s '+total_mines+' mines at Box'+box);

    return total_mines;
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
    var $cell;//do i need this here???
    var $level, $players, $boxNum, $box;              // $level=game-level $players=2players 
                                                      // $boxNum=clicked div id#
    $('.game-level').click(function(event){
      $level = $(event.target).attr('id');      // grabs id of easy|medium|hard
      //console.log('this game will be: ' + $level);
      
      $('#levels').remove();                  // removes buttons
      $('#instructions').remove();            // removes instructions
      $('.container').append($('<div id="board">'));     // add new gameBoard to HTML
      var ccb = new Board();
      ccb.startGame($level);


      //console.log('Here\'s all the div boxes: '+ccb.board.length);
      // do{
      //   ccb.checkBox(,0);
      // } while(!ccb.checkWin());
      // ccb.gameOver();
    });  
  });

