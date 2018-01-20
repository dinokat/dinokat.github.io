

var images = ['mossel.jpg','spruitje.png', 'mosterd.png'];
var vids =['tiktak6.mp4','nacho.mp4','lidl.mp4'];


function ran(r){
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


var cw = 1680; // canvas width
var ch = 800; // canvas height
var xw = 560; // canvas width divided by 3


$("canvas").attr({width: cw, height: ch}).css("border", "1px solid black");
//$("canvas").css("with": "840", "height": "525", "border": "1px solid black");

  //var ctx= $("CAN").getContext('2d');

//$('video').hide();
$('#vF').attr('src', vids[1]);
$("video").each(function(){
  $(this).get(0).pause();
  $(this).hide();
});


$('div').click(function(){

  $('#c').clearCanvas();
  $("video").each(function(){
    $(this).get(0).pause();
    $(this).hide();
});

  var randttt = Math.random();
  if(randttt>0.5){

    var t=ran([3,2,1,1]);
    var t2 = (t==3)?0 : (t==2) ? 1 : ran([2,1]);
    //var t3 = (t2==1 && t==1) 1 : 0;
    $('#c').drawImage({
        source: images[Math.floor(Math.random()*3)],
        x: 0, y: 0, width: t*xw, height: ch,
        fromCenter: false,
    });
    $('#c').drawImage({
        source: images[Math.floor(Math.random()*3)],
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
    $('#vF').attr('src', vids[Math.floor(Math.random()*3)]);
    //$('#vF').get(0).load();
    //$('#vF').get(0).pauze();
    $('#vF').show();
    $('#vF').get(0).play();
  };
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
        source: images[Math.floor(Math.random()*3)],
        x: 0, y: 0, width: t*xw, height: ch,
        fromCenter: false,
    });
    $('#c').drawImage({
        source: images[Math.floor(Math.random()*3)],
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



//$('#vC').attr('src', 'http://techslides.com/demos/sample-videos/small.mp4');
//$('#vC').attr('src', vids[1]);
  //.css("left", "33%");
/*
  var imL = new Image();
  var imC = new Image();
  var imR = new Image();
  var imF = new Image();

  imL.onload=function(){
    ctx.drawImage(imL,0,0);
  }
  imC.onload=function(){
    ctx.drawImage(imC,xw,0,xw,ch);
  }
  imR.onload=function(){
    ctx.drawImage(imR,2*xw,0,xw,ch);
  }
  imF.onload=function(){
    ctx.drawImage(imF,0,0,cw,ch);
  }

  imL.src="spruitje.png";
*/






})
