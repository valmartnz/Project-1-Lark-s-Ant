README - CPSC 335-03 - Project-1-Lark-s-Ant


Team Members
    Valerie Martinez (valeriemartnz@csu.fullerton.edu)
    Anthony Sanchez (sanchezanthony244@csu.fullerton.edu)
    Bradley Diep (bdippin12@csu.fullerton.edu)
    Jason Duong (reddkingdom@csu.fullerton.edu)


Introduction
    This program uses HTML, Javascript (JS), and P5.js to create
    an invisible bot that draws a grid. As it moves across the grid,
    depending on the cell's color to action index, the bot will face
    and move in a specific direction and afterward, each cell's color
    will be incremented from its current color index. In addition,
    the bot may ignore the current cell's color and continue straight
    for a finite number of moves, countdown. If it reaches the edge of
    the canvas, the bot will wrap around and continue to move from
    cell to cell.

    The data structure used is an adjacency matrix that holds the states
    and transitions for implementing the finite state machine. Every state, 
    will have a transition; thus, no cell in the matrix is undefined.
    
    We also use the Javascript Standard built-in objects, Map. Each key
    represents a unique string to a particular cell. The values will be the
    cell's color index. We opted for a map instead of an array or list since
    its lookup efficiency is O(1) while others are subjected their input size,
    O(n).


Zip Contents
    1. README.txt. This file containing how to operate the program.
    2. assets/decorate.css. Controlling web page style.
    3. ant.js. Contains functions that control the Larks Ant functionality. 
    4. index.html. Sets up the webpage where the program is set.
    5. p5.js. The P5 package that is loaded into html.


How to Build (Setup + Installation)
    1. Extract .zip file
    2. Drag + Drop HTML file "index.html" into a browser window.
    3. Press either the spacebar, 'w', or 'r' key to see the ant move 


Features
    Keystroke input allowing users to manipualate how fast
    the bot moves. Each keystroke can be interrupted by a
    different keytroke.

    Pressing the spacebar will produce one move
    Pressing the letter 'w' (walk) will move the bot continuously for every 24 frames
    Pressing the letter 'r' (run) will move the bot continuously (essentially every frame)


External Requirements
    None


Bugs
    No bugs have been found at the time of writing this.


Warnings
    Testing is light and future changes could be made.


Testing
    Followed the installation instruction above and watched it run
    a couple of times. Looks good.
