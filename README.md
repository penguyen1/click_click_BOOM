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
-  `this.bomb` -- holds a boolean value indicating if the current object is a bomb or not **(default: false)**
-  `this.hidden` -- holds a boolean value indicating if the current object is hidden on the browser **(default: true)**
-  `this.val` -- holds a value of the current object (this will help you refer back to the index location of the object in the board array!)  ** <------- do i need this ???**

###### And the following methods:
-  `this.show()` 
    - sets `this.hidden` value to `false`
-  `this.isMine()`
    - sets `this.mine` value to `true` 
    - sets `this.value` to `"X"` *(because "X" is the universal language for "bomb")*

---

#### A Board constructor:

###### The constructor should have the following attributes:
-  `this.board` -- empty array that will store the `Mine` objects
-  `this.total` -- holds total number of boxes in the minefield 

###### And the following methods:
-  `this.createBoard(num)`:
    - accepts a number argument ( Easy: 25; Medium: 100; Hard: 225 )
    - assigns `num` to `this.total`
    - 20% of the `num` mines will be bombs
    - creates a mine field with the `num` of `Mine` objects
    - creates a `<div>` tag for each new object
-  `this.checkBox(value)`:
    - accepts a `value` depicting the box location on the minefield
    - checks the object's `.mine` property if it is a mine
        - returns `true` if `this.board[value].mine === true;` ( you lose )  **<--- is there more stuff to add here ??**
        - otherwise, call `.show()` & return `false` ( you're safe to continue ) **<--- is there more stuff to add here ??**
- `this.checkAround(value)`:
    - accepts a `value` indicating the box location
    - creates an empty array `var surround` to store all the adjacent boxes 
    - computes & returns an array of the adjacent box values ** <----- left edge, right edge, around - in another function ?? (DRY)**
    - if an adjacent box value is less than or equal to zero **OR** more than the total number of boxes, push nothing ** <---- correct this **
        - if adjacent box value is between 0 && this.total, push it to the `surround` array ** <----- correct this **
- `this.countMines(value)`: ** <----- correct this WHOLE METHOD **
    - accepts `value` indicating current box location
    - has a mine `counter` set to zero
    - calls `checkAround(value)` to get array of surrounding box values & stores it in `var point`
    - iterates through each `point` array & calls `checkBox(point[i])`
        - if false, add zero to `counter` & call `checkAround(point[i])` again? ** <--- is this recursive??**
        - otherwise, increment counter by 1
        - display counter value to appropriate div on board