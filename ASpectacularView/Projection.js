

var images = ['mossel.jpg','spruitje.png', 'mosterd.png'];
var vids =['tiktak6.mp4','nacho.mp4','lidl.mp4'];
var txt = ["ASPECULACTUARVIWE!!!", "ISDITALLES", "A fish doesn't think, because a fish knows everything"];


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
  var vormpje=window.MAAK2(2.8, cen, 400, 1);//solve(tt,1);
  vormpje['strokeStyle']='#000';
  vormpje['fillStyle']='#0f0';
  vormpje['layer']=true;
  vormpje['close']=false;

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




var vvv={
  strokeStyle: 'white',
  x: 200, y: 100,
  radius: 50, sides: 3
};

$('canvas').drawPolygon(vvv);/*{
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
      var vormpje=window.MAAK2(3, cen, 400, 2);
      vormpje['strokeStyle']='none';
      vormpje['fillStyle']='#0f0';
      vormpje['layer']=true;
      vormpje['close']=false;



      $('#c').drawBezier(vormpje);
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
  .restorCanvas();

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
