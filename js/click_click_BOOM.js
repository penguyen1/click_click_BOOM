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
  this.player;              // determines 1 or 2 players
  var that = this;          // stores the 'this' into context!!

  // START A NEW GAME
  this.startGame = function(level, players){   
    this.board = [];                            
    this.level = level;                         
    this.player = players>1 ? 'Player A' : '';  
    var mines = (Math.pow(level,2))/5;          // 20% of total area of boxes
    var size = ((30/level)-.125)+"em";          // size of each <div> on game board
    var $help = $('<div>').addClass('help');
    $help.append($('<button>').attr('id', 'help').text('Forgot the rules?'));
    $('#top').after($help);
    $help.after($('<div>').attr('id', 'info').text(this.player));
    $board = $('#board');

    for(var i=0; i<Math.pow(level,2); i++){
      var box = new Box();                      // new Box object
      this.board.push(box);                     // adds new Box object to board array
      
      var $cell = $('<div>');                   
      $cell.addClass('box').attr('id', i+1).css({"width":size,"height":size}).text('');    // <div class="boxes" id="i+1">
      $board.append($cell);                    
    }
    
    // randomly selects & sets mines on game board
    for(var a=0; a<mines; a++){             
      do{                                   // ensures no repetitive random numbers
        var random = Math.floor(Math.random()*Math.pow(level,2));     
      } while (this.board[random].mine);
      this.board[random].isMine();          // Box object is now a mine
      $('#'+(random+1)).addClass('mine').click(function(){
        $('#board').hide('explode', {pieces: 130}, 3000);
      });   // addClass('mine'); to all mine boxes
    }
  };

  // waits for a click and continues game
  this.play = function(event){
    $boxNum = parseInt($(event.target).attr('id'));   // gets target id value
    that.checkBox($boxNum,0);                         // use 'THAT' !!
    if(that.checkWin()){ that.gameOver(); }           // checks for winner
  };

  // checks + displays box & its neighboring boxes ( RECURSION )
  this.checkBox = function(box, depth){    
    var numOfMines = that.countMines(box);                      // gets # of mines around box input 
    var neighbors = that.checkAround(box);                      // gets array of neighboring boxes 

    // first, is this a mine ??
    if(depth<1 && this.board[box-1].mine) { that.gameOver(); } // first click & its a mine - GAME OVER
    if(depth>0 && this.board[box-1].mine) {                    // box is a neighbor & a mine - check but do not show
      this.board[box-1].check = true;
      return;
    } 
    
    // ok, its NOT a mine. now what?
    this.board[box-1].show();                             
    $('#'+(box)).addClass('shown').text(numOfMines);      // add class 'shown' & display mine count
    if(depth<1){
      for(var i=0; i<neighbors.length; i++){
        that.checkBox(neighbors[i], 1);                   // call itself with neighbor box (RECURSION!!)
      }
      // console.log('player: '+this.player);
      this.player = (this.player === '' ? '' : (this.player === 'Player A' ? 'Player B' : 'Player A'));
      $('#info').text(this.player); 
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
      if(current>0 && current<=max){  
        neighbors.push(current);  
      }
    } 
    return neighbors;
  };

  // returns total num of mines around box(input)
  this.countMines = function(box){      
    var total_mines = 0;                      // total number of mines
    var neighbors = this.checkAround(box);    // get neighboring boxes

    // checks each neighbor box for a mine
    for(var i=0; i<neighbors.length; i++){   
      var current = neighbors[i];
      if(this.board[current-1].mine){ total_mines+= 1; }    // Its a mine!
    } 
    return total_mines;
  };

  // check if all boxes are shown
  this.checkWin = function(){                              
    var win = true;

    // determines if player Won 
    for(var x=0; x<this.board.length; x++){
      if(!this.board[x].mine && !this.board[x].check){ 
        win = false;      // LOSE: if any box is STILL hidden
      }                 
    } return win;         // WIN: ALL non-mines are not hidden
  };

  // displays Game Over message
  this.gameOver = function(){
    var $gameOver = $('<div>').attr('id', 'gg');
    $('#board').hide();                     // clears all boxes on game board 
    $('.help').hide();
    $('#info').hide();
    $('#instructions').hide();
    var current = (this.player==='') ? 'You' : this.player;
    this.player = this.player ==='You' ? 'You': (this.player==='Player A' ? 'Player B' : 'Player A');
    var result = !that.checkWin() ? 'GAME OVER! '+current+' lost!' : (current==='You' ? 'CONGRATS!! You win!' : this.player+' wins!'); 
    
    $gameOver.text(result).fadeIn(3000);
    $('#top').after($gameOver);
  };      
};

$(document).ready(function(){
    var $level, $players, $boxNum;              // $level=game-level $boxNum=clicked div id#
    $('#instructions').hide();                  // hides instructions

    $('.players').click(function(event){        // 1 or 2 players
      $players = $(event.target).attr('id');
     });  

    $('.game-level').click(function(event){
      $level = $(event.target).attr('id');      // gets value of easy|medium|hard
      
      $('#players').remove();                   // removes 1 & 2 player buttons
      $('#levels').remove();                    // removes easy|medium|hard buttons
      var $board = $('<div id="board">').fadeIn(2000);
      $('.container').append($board);           // add new gameBoard to HTML
      var ccb = new Board();
      ccb.startGame($level, $players);

      $('.box').each(function(i){               // adds clickEventListener to each box
        var $box = $('.box').eq(i);
        $box.on('click', ccb.play);
      });

      $('#help').click(function(){              // toggles instruction button
        $('#instructions').toggle(1000);
      });
    });   // game-level 

}); // document.ready
