# click_click_BOOM


#### `click_click_BOOM` works just like the classic game, Minesweeper. Depending on the level of difficulty of your choosing, you are given a finite amount of boxes where you must strategically determine and avoid randomly placed mines throughout the gameboard using given number indicators. 

---
  
### Levels of difficulties: 
-  Easy - 5 x 5 boxes
-  Medium - 10 x 10 boxes
-  Hard - 15 x 15 boxes


##### The number indicators will tell you how many mines are adjacent to the box. (example: `1` indicates that there is only 1 mine adjacent to it, whereas `3` indicates that there are 3 mines adjacent to the box) To win, dodge all the mines until all the boxes are gone! Otherwise, `Game Over, You lose!`

---

#### The Mine constructor:

###### The Mine constructor would have the following attributes:
-  `this.mine` -- holds boolean value indicating if current object is a mine or not **(default: false)**
-  `this.hidden` -- holds boolean value indicating if current object is hidden **(default: true)**
-  `this.val` -- holds a value of the current object (this will help you refer back to the index location of the object in the board array!)

###### And the following methods:
-  `this.show( )` -- sets `this.hidden` to `false`
-  `this.isMine()`
    - sets `this.mine` value to `true` 
    - sets `this.value` to `"X"`

---

#### The Board constructor:

###### The Board constructor should have the following attributes:
-  `this.board = []` -- array that will store `Mine` objects
-  `this.total = 0` -- total number of boxes in the board 

###### And the following methods:
-  `this.createBoard(num)`:
    - accepts an argument (**easy:** `num = 5` **medium:** `num = 10` **hard:** `num = 15` )
    - assigns `num` to `this.total`
    - 20% of the `num` mines will be mines
    - creates a mine field with the `num` of `Mine` objects
    - creates a `<div>` tag for each new object
-  `this.checkBox(value)`:
    - accepts `value` indicating current box location
    - checks the board array's index `value` if box object is a mine
        - returns `true` if `this.board[value].mine === true;` ( you lose )
        - otherwise, `.show()` the box & return `false` ( you're safe to continue ) **<--- recursive??**
- `this.checkAround(value)`:
    - accepts `value` indicating current box location (from `<div> id`!)
    - create an empty array `var surround = []` to store adjacent box values 
    - computes & returns an array of all adjacent box values
    - if an adjacent box value is less than or equal to zero **OR** more than the total number of boxes, push nothing
        - if adjacent box value is between 0 && this.total, push it to the `surround` array 
- `this.countMines(value)`: 
    - accepts `value` indicating current box location
    - has a mine `counter` set to zero
    - calls `checkAround(value)` to get array of surrounding box values & stores it in `var point`
    - iterates through each `point` array & calls `checkBox(point[i])`
        - if false, add zero to `counter` & call `checkAround(point[i])` again? ** <--- is this recursive??**
        - otherwise, increment counter by 1
        - display counter value to appropriate div on board