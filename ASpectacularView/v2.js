

var images = ['./media/mossel.jpg','./media/spruitje.png', './media/mosterd.png'];
var vids =['./media/tiktak6.mp4','./media/nacho.mp4','./media/lidl.mp4'];
var txt = ["ASPECULACTUARVIWE!!!", "ISDITALLES", "A fish doesn't think, because a fish knows everything"];

// Create a drawHeart() method
$.jCanvas.extend({
  name: 'drawPath2d',
  type: 'Path2d',
  props: {
    dataa: 'M1 10 h 80 v 80 h -80 Z',
    fillStyle: 'none',
    strokeWidth: 2,
    strokeStyle: 'red'
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
        ctx.fillStyle=p.fillStyle;
        ctx.strokeStyle=p.strokeStyle;

        ctx.strokeWidth=p.strokeWidth;
        ctx.stroke(shape);
        ctx.fill(shape);
        }
      });






    // Call the detectEvents() function to enable jCanvas events
    // Be sure to pass it these arguments, too!
    //$.jCanvas.detectEvents(this, ctx, p);
    // Call the closePath() functions to fill, stroke, and close the path
    // This function also enables masking support and events
    // It accepts the same arguments as detectEvents()
    //$.jCanvas.closePath(this, ctx, p);
  }
});

function rann(r){
  var l = r.length;
  return r[Math.floor(Math.random()*l)];
}

/*

function assignCanvas(){
  im = new Image();
  im.src=images[1];
  im.onload=function(){
    ctx.drawImage(im,0,0,Math.floor(840/3.0),525);
  }
  im = new Image();
  im.src=images[1];
  im.onload=function(){
      ctx.drawImage(images[1],Math.floor(840/3.0),0,Math.floor(840/3.0),525);
  }
}
*/

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
  //var tt= window.MAAK2(2.8, cen, 400);

  //var points= fns.nieuw().ptn;
  //$("#deb").text(JSON.stringify(points,undefined,4));
//  var vormpje=window.MAAK2(2.8, cen, 400, 1);//solve(tt,1);
  //vormpje['strokeStyle']='#000';
  //vormpje['fillStyle']='#0f0';
  //vormpje['layer']=true;
  //vormpje['close']=false;

//$("#deb").text(JSON.stringify(vormpje,undefined,4));

$("canvas").attr({width: cw, height: ch}).css("border", "1px solid black");
//$("canvas").css("with": "840", "height": "525", "border": "1px solid black");

  //var ctx= $("CAN").getContext('2d');

//$('video').hide();
$('#vF').attr('src', vids[1]);
$("video").each(function(){
  $(this).get(0).pause();
  $(this).hide();
});

// Use the drawHeart() method
$('canvas').drawPath2d({
  dataa: 'M1 10 h80 v80 h-80 z'
});


var vvv={
  strokeStyle: 'white',
  x: 200, y: 100,
  radius: 50, sides: 3
};
/*
$('canvas').drawPolygon(vvv){
  strokeStyle: 'white',
  x: 200, y: 100,
  radius: 50, sides: 3
});*/

$('div').click(function(){

  $('#c').removeLayers();
  $('#c').clearCanvas();
  $("video").each(function(){
    $(this).get(0).pause();
    $(this).hide();
  });

    var randttt = Math.random();
    randttt= 0.1;
    if(randttt>0.9){

      var t=fns.ran([3,2,1,1]);
      var t2 = (t==3)?0 : (t==2) ? 1 : fns.ran([2,1]);
      //var t3 = (t2==1 && t==1) 1 : 0;
      $('#c').drawImage({
          //source: images[Math.floor(Math.random()*3)],
          layer: true,
          source: fns.ran(images),
          x: 0, y: 0, width: t*xw, height: ch,
          fromCenter: false,
        //  load: drawtxt,
      });
      $('#c').drawImage({
          //source: images[Math.floor(Math.random()*3)],
          layer: true,
          index: -1,
          source: fns.ran(images),
          x: t*xw, y: 0, width: t2*xw, height: ch,
          fromCenter: false,
        //  load: drawtxt,
      });
      if(t2==1 && t==1){
        $('#c').drawImage({
            //source: images[Math.floor(Math.random()*3)],
            layer: true,
            index: -1,
            source: fns.ran(images),
            x: 2*xw, y: 0, width: xw, height: ch,
            fromCenter: false,
          //  load: drawtxt,
        });
      }
    }
    else if(randttt>0.85){
      //$('#vF').attr('src', vids[Math.floor(Math.random()*3)]);
      $('#vF').attr('src', fns.ran(vids));
      //$('#vF').get(0).load();
      //$('#vF').get(0).pauze();
      $('#vF').show();
      $('#vF').get(0).play();
    }
    else{
/*
      var map = new Map();
      map.set(x1, 25);
      map.set(y1, 50);
      map.set(cx1, 175);
      map.set(cy1, 50);
      map.set(cx2, 25);
      map.set(cy2, 50);
      map.set(x2, 175);
      map.set(y2, 150);

      map.set(cx3, 175);
      map.set(cy3, 50);
      map.set(cx4, 25);
      map.set(cy4, 50);
      map.set(x3, 175);
      map.set(y3, 150);

      map.set("strokeStyle", '#f00');
      map.set("strokeWidth", '5');
*/
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

    //  tt= window.MAAK2(2.8, cen, 400);
      //vormpje=solve(tt,1);
      /*var vormpje=window.MAAK2(3, cen, 400, 1);

      vormpje['strokeStyle']='#0f0';
      vormpje['fillStyle']='#0f0';
      vormpje['strokeWidth']='30';
      vormpje['layer']=true;
      vormpje['close']=false;

      *///$('#c').drawBezier(vormpje); //dit werkt!!!

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




      /*
      $('#c').drawBezier({
  strokeStyle: '#fff',
  strokeWidth: 5,
  x1: 25, y1: 50, // Start point
  cx1: 175, cy1: 50, // Control point
  cx2: 25, cy2: 150, // Control point
  x2: 175, y2: 150, // Start/end point
  cx3: 275, cy3: 150, // Control point
  cx4: 125, cy4: 1, // Control point
  x3: 300, y3: 50 // Start/end point
});*/

        /*
        strokeStyle: '#f00',
        strokeWidth: 5,
        x1: 25, y1: 50, // Start point
        cx1: 175, cy1: 50, // Control point
        cx2: 25, cy2: 150, // Control point
        x2: 175, y2: 150, // Start/end point
        cx3: 275, cy3: 150, // Control point
        cx4: 125, cy4: 1, // Control point
        x3: 300, y3: 50 // Start/end point
        */



    };


/*

  $('#c').drawText({
    layer: true,
    //mask: true,
    fillStyle: '#fff',
    strokeStyle: '#fff',
    strokeWidth: 1,
    x: cw/2, y: 90+ch/2,
    fontSize: '50pt',
    fontFamily: 'Arial',
    text: fns.ran(txt),
    allign: 'center',
    baseline: 'middle',
    // Measure (x, y) from the text's top-left corner
    fromCenter: true,
  })
  .restoreCanvas();
*/
});


function generate(){

  $('this').clearCanvas();
  $("video").each(function(){
    $(this).get(0).pause();
    $(this).hide();
});

  var randttt = Math.random();
  if(randttt>0.5){

    var t=ran([3,3,3,2,2,1,1]);
    var t2 = (t==3)?0 : (t==2) ? 1 : ran([2,2,1]);
    //var t3 = (t2==1 && t==1) 1 : 0;
    $('#c').drawImage({
        //source: images[Math.floor(Math.random()*3)],
        source: ran(images),
        x: 0, y: 0, width: t*xw, height: ch,
        fromCenter: false,
    });
    $('#c').drawImage({
        //source: images[Math.floor(Math.random()*3)],
        source: ran(images),
        x: t*xw, y: 0, width: t2*xw, height: ch,
        fromCenter: false,
    });
    if(t2==1 && t==1){
      $('#c').drawImage({
          source: images[Math.floor(Math.random()*3)],
          x: 2*xw, y: 0, width: xw, height: ch,
          fromCenter: false,
      });
    }
  }
  else{
    //$('#vF').attr('src', vids[1]);
    //$('#vF').get(0).load();
    //$('#vF').get(0).pauze();
    $('#vF').show();
    $('#vF').get(0).play();
  };
}


})
