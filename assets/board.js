/*
  Authors:
    Valerie Martinez (valeriemartnz@csu.fullerton.edu)
    Anthony Sanchez (sanchezanthony244@csu.fullerton.edu)
    Bradley Diep (bdippin12@csu.fullerton.edu)
    Jason Duong (reddkingdom@csu.fullerton.edu)

  Description:
    color border for each cell on the grid
*/

function board(rminor, rmajor, rstroke, rfill) {
	stroke(rstroke);
  fill(rfill);

  let sz = ant_canvas.size;
  let width = ant_canvas.width * sz;
  let height = ant_canvas.height * sz

  for (var ix = 0; ix < width; ix += rminor) {
    let big_linep = (ix % rmajor == 0);
    let line_wgt = 1;
    if (big_linep) line_wgt = 2;
    strokeWeight(line_wgt);
    line(ix, 0, ix, height);
    strokeWeight(1);
	  if (ix % rmajor == 0) { text(ix, ix, 10); }
	}

  for (var iy = 0; iy < height; iy += rminor) {
	  let big_linep = (iy % rmajor == 0);
    let line_wgt = 1;
    if (big_linep) line_wgt = 2;
    strokeWeight(line_wgt);
    line(0, iy, width, iy);
    strokeWeight(1);
    if (iy % rmajor == 0) { text(iy, 0, iy + 10); }
  }
}