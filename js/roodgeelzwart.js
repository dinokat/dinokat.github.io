

function rgbp(arg){
	return "rgba(0, c, 0, 1)".replace("c", ""+arg);
}


function randc(){
	c = Math.floor(Math.random()*3);
	if (c==1) return 'red';
	if (c==0) return 'black';
	if (c==2) return 'yellow'; 
}

// set canvas
const canvas = {
	width: 0,
	height: 0,
	elem: document.createElement('canvas'),
	init(x,y,cols,rows) {
		const ctx = this.elem.getContext('2d');
		document.body.appendChild(this.elem);
		this.width = this.elem.width = x*cols;
		this.height = this.elem.height = y*rows;
		

		for(xx=0; xx<cols; x++){
			for(yy=0; yy<rows; y++){
				ctx.beginPath();
				ctx.rect(xx*x,yy*y,x,y);
				ctx.fillStyle= randc();
				ctx.fill();
			}
		}
		return ctx;
	}

};







// init
const ctx = canvas.init(150, 150, 6, 6 );

