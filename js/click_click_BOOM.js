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
  var $cell;
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
      $cell.addClass('box').attr('id', i+1).css({"width":size,"height":size}).text('');    // <div class="boxes" id="i+1">
      $board.append($cell);                     // adds to HTML $board 
    }
    
    for(var a=0; a<mines; a++){             // randomly places mines
      do{                                   // ensures no repetitive random numbers
        var random = Math.floor(Math.random()*Math.pow(level,2));     // 0-24
      } while (this.board[random].mine);
      // console.log('random: '+random);
      this.board[random].isMine();          // Box object is now a mine
      $('#'+(random+1)).addClass('mine');   // addClass('mine'); to all mine boxes
    }
  };

  // waits for a click action and continues game
  this.play = function(event){
    // var $div = $('.box');
    // console.log('div: '+$div.length);      // what's div length?
    // for(var i=0; i<$div.length; i++){
      // $div.eq(i).click(function(event){
      //   event.stopPropagation();
        $boxNum = parseInt($(event.target).attr('id'));
        // console.log('\nYou clicked Box '+$boxNum);
        // console.log('Did you win? '+ that.checkWin());
        that.checkBox($boxNum,0);           // ERRRRORRRRRR -- used 'that'
        // return;
      // });
    // }
    event.stopPropagation();
    return;
  };

  // checks + displays box & its neighboring boxes ( RECURSION )
  this.checkBox = function(box, depth){           
    var numOfMines = that.countMines(box);                      // gets # of mines around box input 
    var neighbors = that.checkAround(box);                      // gets array of neighboring boxes 
    
    console.log('Checking box '+box+' at depth '+depth);        // testing --- WORKS @2:20pm today
    console.log('Box'+box+' has '+numOfMines+' mines nearby');
    console.log('Neighbors of Box'+box+': '+neighbors); 

    // first, is this a mine ??
    if(depth<1 && this.board[box-1].mine) { that.gameOver(); } // first click & its a mine - GAME OVER
    if(depth>0 && this.board[box-1].mine) {                    // box is a neighbor & a mine - check but do not show
      this.board[box-1].check = true;
      return;
    } 
    
    // ok, its NOT a mine. now what?
    this.board[box-1].show();                             // display it
    $('#'+(box)).addClass('shown').text(numOfMines);      // add class 'shown' & display mine count
    if(depth<1){
      for(var i=0; i<neighbors.length; i++){
        that.checkBox(neighbors[i], 1);                   // call itself with neighbor box (RECURSION!!)
      } 
    }   return;
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

    // filters neighborBox
    for(var i=0; i<neighborBox.length; i++){
      var current = neighborBox[i];          
      // && !this.board[current-1].check -removed bc it skips checked mine boxes & ruins mine count
      if(current>0 && current<=max){  neighbors.push(current);  }
    } return neighbors;
  };

  // returns total num of mines around box(input)
  this.countMines = function(box){      
    var total_mines = 0;                      // total number of mines
    var neighbors = this.checkAround(box);    // get neighboring boxes

    // checks each neighbor box for a mine
    for(var i=0; i<neighbors.length; i++){   
      var current = neighbors[i];
      // debugger;
      if(this.board[current-1].mine){ total_mines+= 1; }    // Its a mine!
    } return total_mines;
  };

  // check if all boxes are shown (default hidden: false)
  this.checkWin = function(){                                   // how would this work with 2 players?               
    // var notMines = [];
    var win = true;
    // // array of NON-MINES 
    // for(var i=0; i<this.board.length; i++){                                   // DRY THIS!
    //   if(this.board[i].mine === false){ notMines.push(this.board[i]); }
    // }
    // determines if player Won 
    for(var x=0; x<this.board.length; x++){
      if(this.board[x].check === false){ win = false; }        // LOSE: if any box is STILL hidden              -- DRY this
    } 
    return win;                                            // WIN: ALL non-mines are not hidden
  };

  // displays Game Over message
  this.gameOver = function(){
    alert(that.checkWin() ? 'Great Game! You Win!' : 'GAME OVER! YOU LOSE!'); 
    // display all mine boxes with an img
    // how do you kill this game ???
  };      
};

$(document).ready(function(){
    console.log('lock and loaded');
    var $level, $players, $boxNum;              // $level=game-level $players=2players  $boxNum=clicked div id#

    $('.game-level').click(function(event){
      $level = $(event.target).attr('id');      // grabs id of easy|medium|hard
      //console.log('this game will be: ' + $level);
      
      $('#levels').remove();                  // removes buttons
      $('#instructions').remove();            // removes instructions
      $('.container').append($('<div id="board">'));     // add new gameBoard to HTML
      var ccb = new Board();
      ccb.startGame($level);
      // ccb.play();



      $('.box').each(function(i){
        var $box = $('.box').eq(i);
        $box.on('click', function(event){
          // console.log('test');
          // $boxNum = parseInt($(event.target).attr('id'));
          // console.log('\nYou clicked Box '+$boxNum);
          // console.log(ccb.checkWin());
          ccb.play(event);
          event.stopPropagation();
        });
      });

      
      // event.stopPropagation();
      // while(!ccb.checkWin()){
      //   ccb.play();
      // }
      // console.log('ok, game ends here.');
      // ccb.gameOver();
    });  

    // $('.box').each(function(i){
    //   var $box = $('.box').eq(i);
    //   $box.on('click', function(event){
    //     event.stopPropagation();
    //     console.log('test');
    //     // $boxNum = parseInt($(event.target).attr('id'));
    //     // console.log('\nYou clicked Box '+$boxNum);
    //   });
    // });

});
    


