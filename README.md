# click_click_BOOM


**click_click_BOOM** operates like the classical game: **Minesweeper.** Based on the level of difficulty of your choosing, you will be presented a minefield filled with empty boxes and explosive bombs! You must strategically & logically locate and avoid all the scattered explosives that are planted within the minefield using nothing but your **gut instincts** and provided number indicators. 

The number indicators on the minefield will help guide and tell you how many mines are adjacent to the box. It may be located above, below, to the left, to the right or even diagonal!

**For example:** `"1"` indicates that there is only 1 bomb adjacent to the box, whereas `"3"` indicates that there are 3 bombs adjacent to the box. 

To win, you must dodge all the bombs until the entire minefield has been revealed. Otherwise, if you click on a bomb, you lose!

---

### Levels of difficulties: 
-  **Easy:** 5 x 5 boxes
-  **Medium:** 10 x 10 boxes
-  **Hard:** 15 x 15 boxes

---

To create this game, you must have:

#### A Mine constructor:

###### The constructor would have the following attributes:
-  `this.mine` -- holds a boolean value indicating if the current object is a bomb or not **(default: false)**
-  `this.hidden` -- holds a boolean value indicating if the current object is hidden on the browser **(default: true)**
-  `this.check` -- holds a boolean value if current box object has been checked 

###### And the following methods:
-  `this.show()` 
    - sets `this.hidden` value to `false`
    - set `this.check` value to `true`
-  `this.isMine()`
    - sets `this.mine` value to `true` 

---

#### A Board constructor:

###### The constructor should have the following attributes:
-  `this.board` -- empty array that will store the `Mine` objects
-  `this.level` -- holds value of game dimensions (easy:5 medium:10 hard:15)
-  `this.player` -- holds value of the number of players
-  `var that = this` -- stores `this` into context!

###### And the following methods:
-  `this.startGame(level, players)`:
    - accepts two number arguments: ( Easy: 25; Medium: 100; Hard: 225 ) and number of players (1 or 2)
    - assigns `level` to `this.level`
    - 20% of `level*level` mines will be bombs
    - creates a mine field with `level*level` of `Mine` objects
    - creates a `<div>` tag for each new object
-  `this.play(event)`:
    - accepts an event and parseInts its id value
    - calls `checkBox(idVal, 0)`
    - calls `checkWin()` for a winner 
        - if there's a winner, call `gameOver()`
        - otherwise, do nothing
-  `this.checkBox(boxVal, depth)`:
    - accepts a `value` depicting the box location on the minefield and depth 
    - `depth=0` indicates the user's click and `depth=1` indicates checking the neighboring boxes
    - at depth 0: is the box a mine?
        - if yes, call `gameOver()` - player loses
        - if no, 
            - display number of mines around the box
            - find its neighboring boxes and call `checkBox(boxVal, 1)` for each neighbor box
    - at depth 1: is the box a mine?
        - if yes, convert the `box.check = true` and `return`
        - if no, 
            - switch players (only for 2-player mode)
            - display the box with the number of mines around the current box and `return`
- `this.checkAround(value)`:
    - accepts a `value` indicating the box location
    - creates an empty array `var surround` to store all neighboring box values 
    - creates an empty array `var neighbors` to store all valid neighboring box values
    - computes & returns an array of the adjacent box values depending on the box location:
        - if box is located on the left edge
        - if box is located on the right edge
        - if box is located elsewhere
    - iterate through `surround` array and only push values into `neighbors` array for vlaues between 0 and `this.level*this.level`
    - `return` neighbors array
- `this.countMines(value)`:
    - accepts `value` indicating current box location
    - has a mine `counter` set to zero
    - calls `checkAround(value)` to get array of neighboring box values & stores it in `var neighbors`
    - iterates through each `neighbors` array & checks each neighbor if there is a mine
        - if true, increment `counter` by 1
        - if false, do nothing & continue
    - return `counter` 
- `this.checkWin()`:
    - create and set `var winner` to be true
    - iterate through entire `this.board`
        - set winner to `false` if a box is not a mine & not checked
    - return `win`
- `this.gameOver()':
    - check for current player and switch players (if in 2-player mode)
    - call `checkWin()` and display
        - game over message if false
        - congrats, you win message if true
