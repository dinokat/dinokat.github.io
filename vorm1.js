



function solve(data, k) {

  if (k == null) k = 1;

  var size = data.length;
  var last = size - 4;

  var path = "M" + [data[0], data[1]];
  var pc = {x1: data[0] , y1: data[1]};
  var curves = []

  for (var i = 0; i < size - 2; i +=2) {

    var x0 = i ? data[i - 2] : data[size-2];
    var y0 = i ? data[i - 1] : data[size-1];

    var x1 = data[i + 0];
    var y1 = data[i + 1];

    var x2 = data[i + 2];
    var y2 = data[i + 3];

    var x3 = i !== last ? data[i + 4] : data[0];
    var y3 = i !== last ? data[i + 5] : data[1];

    var cp1x = x1 + (x2 - x0) / 6 * k;
    var cp1y = y1 + (y2 - y0) / 6 * k;

    var cp2x = x2 - (x3 - x1) / 6 * k;
    var cp2y = y2 - (y3 - y1) / 6 * k;

    pc['cx'+(i+1)] = cp1x;
    pc['cy'+(i+1)] = cp1y;
    pc['cx'+(i+2)] = cp2x;
    pc['cy'+(i+2)] = cp2y;
    pc['x'+((i/2)+2)] = x2;
    pc['y'+((i/2)+2)] = y2;

    
/*
    pc['cx'+((i/2)+1)] = cp1x;
    pc['cy'+((i/2)+1)] = cp1y;
    pc['cx'+((i/2)+2)] = cp2x;
    pc['cy'+((i/2)+2)] = cp2y;
    pc['x'+((i/2)+2)] = x2;
    pc['y'+((i/2)+2)] = y2;
*/
    //pc += "cx1: " + cp1x + ", cy1: " + cp1y + ", cx2: " + cp2x + ", cy2: "+ cp2y + ", x2: " +x2 +", y2: "+ y2+", ";
  }
    var x0 = data[size - 4];
    var y0 = data[size - 3];

    var x1 = data[size - 2];
    var y1 = data[ size - 1];

    var x2 = data[ 0];
    var y2 = data[ 1];

    var x3 =  data[2];
    var y3 =  data[3];

    var cp1x = x1 + (x2 - x0) / 6 * k;
    var cp1y = y1 + (y2 - y0) / 6 * k;

    var cp2x = x2 - (x3 - x1) / 6 * k;
    var cp2y = y2 - (y3 - y1) / 6 * k;



    pc['cx'+(size-1)] = cp1x;
    pc['cy'+(size-1)] = cp1y;
    pc['cx'+(size)] = cp2x;
    pc['cy'+(size)] = cp2y;
    pc['x'+((size/2)+1)] = x2;
    pc['y'+((size/2)+1)] = y2;
/*
    pc['cx'+((size/2)+1)] = cp1x;
    pc['cy'+((size/2)+1)] = cp1y;
    pc['cx'+((size/2)+2)] = cp2x;
    pc['cy'+((size/2)+2)] = cp2y;
    pc['x'+((size/2)+2)] = x2;
    pc['y'+((size/2)+2)] = y2;
*/

  //  pc += "cx1: " + cp1x + ", cy1: " + cp1y + ", cx2: " +cp2x +", cy2: "+ cp2y+", x2: " +x2 +", y2: "+ y2+", ";
  return pc;
}

/*
var tension = 1;

var poly = document.querySelector("polyline");
var path = document.querySelector("path");

var points = [
  100,350,
  200,100,
  450,50,
  280,200,
  500,300,
  600,100,
  700,350
];

poly.setAttribute("points", points);
path.setAttribute("d", solve(points, tension));


function solve(data, k) {

  if (k == null) k = 1;

  var size = data.length;
  var last = size - 4;

  var path = "M" + [data[0], data[1]];
  var pc = "x1: "+ data[0] +", y1: "+data[1]+ ", " ;

  for (var i = 0; i < size - 2; i +=2) {

    var x0 = i ? data[i - 2] : data[size-2];
    var y0 = i ? data[i - 1] : data[size-1];

    var x1 = data[i + 0];
    var y1 = data[i + 1];

    var x2 = data[i + 2];
    var y2 = data[i + 3];

    var x3 = i !== last ? data[i + 4] : data[0];
    var y3 = i !== last ? data[i + 5] : data[1];

    var cp1x = x1 + (x2 - x0) / 6 * k;
    var cp1y = y1 + (y2 - y0) / 6 * k;

    var cp2x = x2 - (x3 - x1) / 6 * k;
    var cp2y = y2 - (y3 - y1) / 6 * k;

    path += "C" + [cp1x, cp1y, cp2x, cp2y, x2, y2];
    pc += "cx1: " + cp1x + ", cy1: " + cp1y + ", cx2: " + cp2x + ", cy2: "+ cp2y + ", x2: " +x2 +", y2: "+ y2+", ";
  }

    var x0 = data[size - 4];
    var y0 = data[size - 3];

    var x1 = data[size - 2];
    var y1 = data[ size - 1];

    var x2 = data[ 0];
    var y2 = data[ 1];

    var x3 =  data[2];
    var y3 =  data[3];

    var cp1x = x1 + (x2 - x0) / 6 * k;
    var cp1y = y1 + (y2 - y0) / 6 * k;

    var cp2x = x2 - (x3 - x1) / 6 * k;
    var cp2y = y2 - (y3 - y1) / 6 * k;

    path += "C" + [cp1x, cp1y, cp2x, cp2y, x2, y2];
    pc += "cx1: " + cp1x + ", cy1: " + cp1y + ", cx2: " +cp2x +", cy2: "+ cp2y+", x2: " +x2 +", y2: "+ y2+", ";
  document.getElementById('fuck').innerHTML=""+pc+"";
  return path;
}
*/
