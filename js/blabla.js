

function rgbp(arg){
	return "rgba(0, c, 0, 1)".replace("c", ""+arg);
}

var xx =0.0;
var X =0.0;
function doX(){
	//requestAnimationFrame(doX);
	X = Math.abs(Math.sin(x));
	x += 0.02;
	
}

// Vector point
class Vec {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
	set(x, y) {
		this.x = x;
		this.y = y;
	}
	copy(p) {
		this.x = p.x;
		this.y = p.y;
	}
}


// Faces
class Face {
	constructor(cube, p0, p1, p2, p3, fill) {
		this.p0 = cube.points[p0];
		this.p1 = cube.points[p1];
		this.p2 = cube.points[p2];
		this.p3 = cube.points[p3];
		this.fill = fill;
		this.del = 255 - fill;
	}
	draw(bo) {
		if (
			((this.p1.y - this.p0.y) / (this.p1.x - this.p0.x) -
				(this.p2.y - this.p0.y) / (this.p2.x - this.p0.x) < 0) ^
			(this.p0.x <= this.p1.x == this.p0.x > this.p2.x)
		) {
			ctx.beginPath();
			ctx.globalCompositeOperation = "source-over";
			ctx.strokeStyle = "#000";
			ctx.lineJoin = "round";
			//ctx.fillStyle = bo ? "#0f0" : rgba(0, 60, 0, 1);
			//ctx.fillStyle = "rgba(0, 60, 0, 1)";
			var t= Math.floor(this.del * X) +this.fill;
			ctx.fillStyle = rgbp(t);
			ctx.lineWidth = 0;
			ctx.moveTo(this.p0.x, this.p0.y);
			ctx.lineTo(this.p1.x, this.p1.y);
			ctx.lineTo(this.p2.x, this.p2.y);
			ctx.lineTo(this.p3.x, this.p3.y);
			ctx.closePath();
			ctx.fill();
			//ctx.stroke();
		}
	}
}
// Cubes
class Cube {
	constructor(ox, oy, oz, lf, rf, hf) {
		this.ox = ox * 1000;
		this.oy = oy * 1000;
		this.oz = oz;
		this.lf = lf;
		this.rf = rf;
		this.hf = hf * 2000;
		this.points = [];
		for (let i = 0; i < 8; i++) {
			this.points.push(
				new Vec()
			);
		}
		this.s = new Vec();
		this.faces = [/*
			new Face(this, 0, 1, 2, 3, '#00ff00'),
			new Face(this, 0, 4, 5, 1, '#008800'),
			new Face(this, 7, 5, 4, 6, '#00ff00'),
			new Face(this, 2, 7, 6, 3, '#00ff00'),
			new Face(this, 1, 5, 7, 2, '#00dd00'),
			new Face(this, 0, 3, 6, 4, '#003300')
			*/
			new Face(this, 0, 1, 2, 3, 255),
			new Face(this, 0, 4, 5, 1, 136),
			new Face(this, 7, 5, 4, 6, 255),
			new Face(this, 2, 7, 6, 3, 255),
			new Face(this, 1, 5, 7, 2, 221),
			new Face(this, 0, 3, 6, 4, 51)
		];
	}
	// draw cube
	draw() {
		for (let face of this.faces) {
			face.draw();
		}
	}
	// draw vanishing lines
	drawVP() {
		ctx.beginPath();
		ctx.globalCompositeOperation = "destination-over";
		ctx.strokeStyle = "#f80";
		ctx.lineWidth = 1;
		[2,3,7,6].forEach((i) => {
			ctx.moveTo(vpRight.x, vpRight.y);
			ctx.lineTo(this.points[i].x, this.points[i].y);
		});
		[7,6,5,4].forEach((i) => {
			ctx.moveTo(vpLeft.x, vpLeft.y);
			ctx.lineTo(this.points[i].x, this.points[i].y);
		});
		ctx.stroke();
	}
	// two points projection
	project(ox, oy) {
		this.s.set(ox + this.ox, oy - this.oy);
		project.rl(this.s, this.oz, this.oz);
		project.pr(this.points[0]);
		project.rl(this.points[0], this.lf, this.rf);
		this.points[3].copy(project.r);
		this.points[4].copy(project.l);
		project.pr(this.points[6]);
		this.s.y -= this.hf;
		project.rl(this.s, this.oz, this.oz);
		project.pr(this.points[1]);
		project.rl(this.points[1], this.lf, this.rf);
		this.points[2].copy(project.r);
		this.points[5].copy(project.l);
		project.pr(this.points[7]);
	}
  //change face color
  editface(fa,col){
    this.faces[fa].fill=col;
  }
}
// two points projection functions
const project = {
	r: new Vec(),
	l: new Vec(),
	rl(p, l, r) {
		this.r.set(p.x + (vpRight.x - p.x) * r, vpRight.y + (p.y - vpRight.y) * (1 - r));
		this.l.set(p.x + (vpLeft.x - p.x) * l, vpLeft.y + (p.y - vpLeft.y) * (1 - l));
	},
	pr(p) {
		const a = (this.r.y - vpRight.y) / (this.r.x - vpLeft.x);
		const b = (vpLeft.y - this.l.y) / (vpRight.x - this.l.x);
		const c = ((vpRight.x - vpLeft.x) * this.l.y - (this.l.x - vpLeft.x) * vpLeft.y) / (vpRight.x - this.l.x);
		p.set((c - vpLeft.y) / (a - b) + vpLeft.x, a * (c - vpLeft.y) / (a - b) + vpLeft.y);
	}
};
// set canvas
const canvas = {
	width: 0,
	height: 0,
	elem: document.createElement('canvas'),
	init() {
		const ctx = this.elem.getContext('2d');
		document.body.appendChild(this.elem);
		this.width = this.elem.width = 2000;
		this.height = this.elem.height = 1000;
		vpLeft.set(this.width * 0.2, this.height * 0.45);
		vpRight.set(this.width - this.width * 0.2, this.height * 0.45);
		return ctx;
	}
};
// set pointer
const pointer = {
	x: 0,
	y: 0,
	cx: 0,
	cy: 0,
	move(e) {
		let touchMode = e.targetTouches, p;
		if (touchMode) {
			e.preventDefault();
			p = touchMode[0];
		} else p = e;
		this.x = -canvas.elem.offsetLeft + p.clientX * canvas.width / canvas.elem.offsetWidth;
		this.y = -canvas.elem.offsetTop + p.clientY * canvas.height / canvas.elem.offsetHeight;
	},
	lerp() {
		this.cx += (this.x - this.cx) * 0.1;
		this.cy += (this.y - this.cy) * 0.1;
	}
};
window.addEventListener('mousemove', e => pointer.move(e), false);
canvas.elem.addEventListener('touchmove', e => pointer.move(e), false);

var klik = true;

window.addEventListener("click", function(){
	klik =  klik ? false : true ;
//	X += 0.05;
});

// main loop
function run() {
	requestAnimationFrame(run);
	X = Math.abs(Math.sin(xx));
	xx += 0.004;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	pointer.lerp();
	ctx.fillStyle = "rgba(255,255,255,0.1)";
	ctx.fillRect(0,0,canvas.width, vpRight.y);
	ctx.moveTo(0,vpLeft.y);
	ctx.lineTo(canvas.width, vpRight.y);
	//ctx.stroke();
	//vpLeft.draw();
	//vpRight.draw();
	for (let cube of cubes) {
		cube.project(pointer.cx, pointer.cy);
		//cube.drawVP();
		for (let face of cube.faces) {
			face.draw(klik);
		}
	}
}
// init
const vpLeft = new Vec();
const vpRight = new Vec();
vpLeft.draw = vpRight.draw = function () {
	ctx.beginPath();
	ctx.arc(this.x, this.y, 6, 0, 2 * Math.PI);
	ctx.fillStyle = "#fff";
	ctx.fill();
};
const ctx = canvas.init();
 cubes = new Set();
// scene
cubes.add(new Cube(0, -3, 0.8, 0.08, 0.08, 3));
cubes.add(new Cube(1.6, -1.6, 0.6, 0.4, 0.8, 0.15));
cubes.add(new Cube(0, -0.5, 0.5, 0.5, 0.5, 0.5));
cubes.add(new Cube(0.8, 0.1, 0.4, 0.2, 0.2, 0.2));
cubes.add(new Cube(0.8, -0.5, 0.4, 0.2, 0.2, 0.2));
cubes.add(new Cube(-0.4, -0.5, 0.1, 0.8, 0.1, 0.5));


// start 
pointer.x = pointer.cx = canvas.width / 2;
pointer.y = canvas.height / 2;
pointer.cy = 20000;
run();