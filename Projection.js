

$.jCanvas.extend({
  name: 'drawPath2d',
  type: 'Path2d',
  props: {
    dataa: 'M1 10 h 80 v 80 h -80 Z',
    fillStyle: 'red',
    strokeWidth: 2
  },
  fn: function(ctx, params) {
    // Just to keep our lines short
    var p = params;
    // Enable layer transformations like scale and rotate
    //$.jCanvas.transformShape(this, ctx, p);
    // Draw shape
    $('canvas').draw({
      fn: function(ctx) {

        var shape = new Path2D(p.dataa);
        //ctx.fillStyle=p.fillStyle;
        ctx.strokeStyle=p.fillStyle;
        ctx.strokeWidth=p.strokeWidth;
        ctx.stroke(shape);
        }
      });


  }
});

function rann(r){
  var l = r.length;
  return r[Math.floor(Math.random()*l)];
}



$(document).ready(function(){
  console.log("klaar met laden")

  var points2 = [
  100,350,
  200,100,
  450,50,
  280,200,
  500,300,
  600,100,
  700,350
];
  //var res = solve(points2,2);
//  alert(res.cx3);


  var points = [
    100,350,
    200,100,
    450,50,
    280,200,
  //  500,300,
    //600,100,
    700,350,
  //  600,450
  ];
  var cw = 1680; // canvas width
  var ch = 800; // canvas height
  var xw = 560; // canvas width divided by 3
  var cen = window.Punt(cw/2, ch/2);



$("canvas").attr({width: cw, height: ch})//.css("border", "1px solid black");



var vvv={
  strokeStyle: 'white',
  x: 200, y: 100,
  radius: 50, sides: 3
};


$('div').click(function(){

  $('#c').removeLayers();
  $('#c').clearCanvas();
  /*$("video").each(function(){
    $(this).get(0).pause();
    $(this).hide();
  });*/

    var randttt = Math.random();
    randttt= 0.1;
    if(randttt>0.9){

    }
    else{

      var map2= {
        strokeStyle: '#000',
        strokeWidth: 0,
        fillStyle: '#0f0',
        close: true,
        x1: 25,
        y1: 50,
        cx1: 175,
        cy1: 50,
        cx2: 25,
        cy2: 150,
        x2: 175,
        y2: 150,
        cx3: 275,
        cy3: 150,
        cx4: 125,
        cy4: 1,
        x3: 300,
        //y3: 50
      };
      map2['y'+3] = 200;

    var vormpje=window.MAAK2(2, cen, 400, 1.5);

    console.log("vormpje");
    console.log(vormpje);
    if(!vormpje){
      vormpje=window.MAAK2(2, cen, 400, 1.5);
    }
    if(!vormpje){
      vormpje=window.MAAK2(2, cen, 400, 1.5);
    }if(!vormpje){
      vormpje=window.MAAK2(2, cen, 400, 1.5);
    }if(!vormpje){
      vormpje=window.MAAK2(2, cen, 400, 1.5);
    }if(!vormpje){
      vormpje=window.MAAK2(2, cen, 400, 1.5);
    }if(!vormpje){
      vormpje=window.MAAK2(2, cen, 400, 1.5);
    };

    var vormpje2=vormpje.offset(-50);

    cur0= vormpje.curves[0].toSVG();
    cur1 = vormpje.curves[1].toSVG();
    curL = vormpje.curves[vormpje.curves.length-1].toSVG();
    curLL = vormpje.curves[vormpje.curves.length-2].toSVG();

    str1= vormpje.ZtoSVG();
    str1v2 = vormpje2.ZtoSVG();
    vormpje.setTension(1.1);
    str2= vormpje.ZtoSVG();
    vormpje.setTension(0.8);
    str3= vormpje.ZtoSVG();
    vormpje.setTension(1.5);
    str4= vormpje.ZtoSVG();
    $('#c').drawPath2d({
      dataa: str1,
      fillStyle: 'green'
    });
    $('#c').drawPath2d({
      layer: true,
      dataa: str1v2,
      fillStyle: 'blue',
      strokeWidth: 3
    });
    $('#c').drawPath2d({
      layer: true,
      dataa: str1,
      fillStyle: 'red',
      strokeWidth: 3
    });
    $('#c').drawPath2d({
      dataa: curL,
      fillStyle: 'orange'
    });
    $('#c').drawPath2d({
      dataa: curLL,
      fillStyle: 'white'
    });



    };



});




})
