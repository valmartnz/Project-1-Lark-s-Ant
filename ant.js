/*
  Authors:
    Valerie Martinez (valeriemartnz@csu.fullerton.edu)
    Anthony Sanchez (sanchezanthony244@csu.fullerton.edu)
    Bradley Diep (bdippin12@csu.fullerton.edu)
    Jason Duong (reddkingdom@csu.fullerton.edu)

  Description:
    The brain/logic of the ant
*/

var c_index = 0; // color index
var n_index = 0; // nose index
var ant_canvas = { cell: 10, width: 60, height: 40 };
var ant_bot = { x: 300, y: 200, state: 0, counter: 0, color: ['#000000', '#89CFF0', '#FFF300', '#FF6347'], nose: ['N', 'E', 'S', 'W'], action: [0, 1, 2, 1]};

// start pos = (300, 200)
// nose = North, East, South, West
// array of colors { Black, Blue, Yellow, Red }

function setup() {
  createCanvas(ant_canvas.cell * ant_canvas.width, ant_canvas.cell * ant_canvas.height);
  board(10, 50, 'white', 'black'); // COPIED CODE FROM PROFESSOR
}

function draw() {
  if (frameCount % 50 === 0) { // slows down animation
    fsm(ant_bot.action[Math.floor(Math.random() * 4)]); /***REMOVE THIS WHEN DONE***/
    // fsm(ant_bot.action[get_color(/* parameters */)]); /***IMPLEMENT THIS WHNE DONE***

    // TODO:
    // Assumptions:
    //    get_color()       returns a hex color code => '#??????'
    //    array.indexOf()   returns the index of a value in an array
    //
    // Example:
    //    get_color() = '#FFFFFF' = Black
    //    c.indexOf(get_color()) = -1
    //    ++c.indexOf(get_color()) % 3 = (0 + 1) % 4 = 1 
    //    c[(++c.indexOf(get_color())) % 3] = c[1] = Blue
    // 
    // Implementation:
    //    let t = ant_bot.color;
    //    let inc = (++t.indexOf(get_color())) % 3;
    //    fill(ant_bot.color[inc]);

    fill(ant_bot.color[c_index]); /***REPLACE THIS WHEN DONE***/
    rect(ant_bot.x, ant_bot.y, ant_canvas.cell, ant_canvas.cell);

    move_ant(); // Move to Neighbor Cell in Nose Direction
  }
}

function move_ant() {
    let dx = ant_bot.x;
    let dy = ant_bot.y;
    let size = ant_canvas.cell; // each cell is 10px
    let max_width = size * ant_canvas.width;
    let max_height = size * ant_canvas.height;

    switch (ant_bot.nose[n_index]) {
      case 'N' : { dy = (dy == 0 ? max_height : dy - size); break; }
      case 'E' : { dx = (dx + size) % max_width;  break; }  // example: (600 + 10) % 600 = 10
      case 'S' : { dy = (dy + size) % max_height; break; }  // example: (400 + 10) % 400 = 10
      case 'W' : { dx = (dx == 0 ? max_width : dx - size); break; }
    }

    ant_bot.x = dx; // move ant in x-dir
    ant_bot.y = dy; // move ant in y-dir

    c_index = ++c_index % 4; /***REMOVE THIS WHEN DONE***/
}

function fsm(action) {
  switch (ant_bot.state) {
    case 0 : { // Normal Mode
      if (action == 0 || action == 1) { // L/R Action
        ant_bot.counter = c_index; /***COLOR INDEX OR ACTION INDEX ???***/
        switch (action) {
          case 0 : ++n_index % 4; break;
          case 1 : (n_index == 0 ? 3 : --n_index);
        }
      } else { // Countdown-Straight Action
        ant_bot.state = 1;
      }
      break;
    }
    case 1 : { // Countdown-Straight Mode
      if (ant_bot.counter < 0) { ant_bot.state = 0; }
      else { ant_bot.counter--; }
    }
  }
}

function get_color(dx, dy, size, max_width) {
  let colors = get( dx, dy); // Get pixel color [RGBA] array.
  let pix_rgb =  // Ignore A = acolors[3], the transparency.
      (256 // Compose via Horner's Method.
       * (256 * (colors[ 2 ]) // B
          +  colors[ 1 ])) // G
      + colors[ 0 ]; // R
  //console.log( "acolors,pix_rgb = " + acolors + ", " + pix_rgb );
  return pix_rgb;
}