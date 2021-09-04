/*
  Authors:
    Valerie Martinez
    Anthony Sanchez
    Bradley Diep
    Jason Duong

  Description:
    The brain/logic of the ant
*/

var ant_canvas = { cell: 10, width: 60, height: 40 };
var ant_color = ['#000000', '#89CFF0', '#FFF300', '#FF6347']; // array of colors { black, blue, yellow, red }
var ant_bot = { x: 300, y: 200, face: 0, color: ant_color[1] }; // start pos = (30, 20) | 0 = north

function setup() {
  createCanvas(ant_canvas.cell * ant_canvas.width, ant_canvas.cell * ant_canvas.height);
  draw();
}

function draw() {
  // testing
  rect(ant_bot.x, ant_bot.y, ant_canvas.cell, ant_canvas.cell);
  fill(ant_bot.color);
}