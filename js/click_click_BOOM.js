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
<<<<<<< HEAD
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
      $cell.on('click',function(event){
        $boxNum = parseInt($(event.target).attr('id'));
        console.log('You clicked Box '+$boxNum + '. It is a: ' +typeof($boxNum));
        this.checkBox($boxNum,0);           // ERRRRORRRRRR 
        //console.log(this);
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
    //console.log('Checking box '+box+' at depth '+depth);        // testing

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
=======
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
>>>>>>> development
  };

  // returns array of neighboring boxes of the input
  this.checkAround = function(box){
    var neighbors = [];                   // holds array of neighboring boxes
    var neighborBox = [];                 // algorithm to find neighboring boxes depending on box location on board
    var max = Math.pow(this.level,2); 

    if(box%this.level === 0){             // box is on right edge of game board
<<<<<<< HEAD
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
    } 

    console.log('Neighbors of box '+box+': '+neighbors);

=======
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
>>>>>>> development
    return neighbors;
  };

  // returns total num of mines around box(input)
  this.countMines = function(box){      
<<<<<<< HEAD
    var total_mines = 0;                                      // total number of mines
    var neighbors = this.checkAround(box);  

    for(var i=1; i<=neighbors.length; i++){
      var current = neighbors[i-1];                           // neighbors[0]
      if(this.board[(current-1)].mine){ total_mines+= 1; }    // this box is a mine
    } 

    console.log('There\s '+total_mines+' mines at box '+box);

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
=======
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
>>>>>>> development
  };

  // displays Game Over message
  this.gameOver = function(){
<<<<<<< HEAD
    alert(this.checkWin() ? 'Great Game! You Win!' : 'GAME OVER! YOU LOSE!'); 
=======
    var $gameOver = $('<div>').attr('id', 'gg');
    $('#board').hide();                     // clears all boxes on game board 
    $('.help').hide();
    $('#info').hide();
    var current = (this.player==='') ? 'You' : this.player;
    this.player = this.player ==='You' ? 'You': (this.player==='Player A' ? 'Player B' : 'Player A');
    var result = !that.checkWin() ? 'GAME OVER! '+current+' lost!' : (current==='You' ? 'CONGRATS!! You win!' : this.player+' wins!'); 
    
    $gameOver.text(result).fadeIn(3000);
    $('#top').after($gameOver);
>>>>>>> development
  };      
};

$(document).ready(function(){
<<<<<<< HEAD
    console.log('lock and loaded');
    var $cell;
    var $level, $players, $boxNum, $box;              // $level=game-level $players=2players 
                                                      // $boxNum=clicked div id#
    $('.game-level').click(function(event){
      $level = $(event.target).attr('id');      // grabs id of easy|medium|hard
      console.log('this game will be: ' + $level);
      
      $('#levels').remove();                  // removes buttons
      $('#instructions').remove();            // removes instructions
      $('.container').append($('<div id="board">'));     // add new gameBoard to HTML
      var ccb = new Board();
      ccb.startGame($level);


      console.log('Here\'s all the div boxes: '+ccb.board.length);
      // do{
      //   ccb.checkBox(,0);
      // } while(!ccb.checkWin());
      // ccb.gameOver();
    });  
  });
=======
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



>>>>>>> development

