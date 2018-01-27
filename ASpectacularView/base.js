// Generated by CoffeeScript 2.1.1
(function() {
  var Cirkel, Koffie, Lijn, Midden, Pad, Punt, Q0, Q1, Q2, Q3, Rechthoek, SCREENH, SCREENW, Uq, VeelHoek, Venster, colors, doek, door2puntenX, door2puntenY, draw, isnul, j, kr, len, lijn1, lijn2, maakrecht, nieuw, nulPunt, nulhoek, omtr, omtrek, p, q0, q1, q2, q3, rand, spt12, t, testen, testl1, testl1l2, testl2, testpunt12, veelhoek1, veelpad,
    boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

  Koffie = document.getElementById("koffie");

  Koffie.innerHTML = "Hallco! <br>";

  testen = [];

  p = function(t) {
    return testen.push(t);
  };

  isnul = function(t) {
    return Math.abs(t) < 0.00001;
  };

  SCREENW = 640;

  SCREENH = 420;

  Uq = (function() {
    //venster1 = SVG('drawing').size(SCREENW, SCREENH)
    class Uq {
      constructor(fn, prps) {
        this.uq = `ding${Uq.qs}`;
        Uq.qs++;
        this.fn = fn;
        this.prps = prps;
      }

    };

    Uq.qs = 0;

    return Uq;

  }).call(this);

  Punt = class Punt extends SVG.Point {
    constructor(x = 0, y = 0) {
      super(x, y);
      this.assign = this.assign.bind(this);
      this.reassign = this.reassign.bind(this);
      this.recalc = this.recalc.bind(this);
      this.afstand = this.afstand.bind(this);
      this.x = x;
      this.y = y;
      this.vormen = [];
    }

    s(r) {
      return ` M ${this.x - r}, ${this.y} a ${r},${r} 0 1,0 ${2 * r},0 a ${r},${r} 0 1,0 -${2 * r},0 `;
    }

    static copy(p) {
      return new Punt(p.x, p.y);
    }

    static zero() {
      return new Punt(0, 0);
    }

    assign(k, para) {
      boundMethodCheck(this, Punt);
      //Koffie.insertAdjacentHTML 'beforeend', "#{t}<br>" for t in testen
      this.vormen.push(k);
      return k.prps[para] = this;
    }

    valid() {
      if (this.y < 0 || this.x < 0) {
        return false;
      }
      if (this === null) {
        return false;
      }
      if (this.x >= SCREENW || this.y >= SCREENH) {
        return false;
      }
      return true;
    }

    reassign(k, para, p2) {
      boundMethodCheck(this, Punt);
      if (this.vormen.indexOf(k) !== -1) {
        this.vormen.splice(this.vormen.indexOf(k), 1);
      }
      p2.vormen.push(k);
      k.prps[para] = p2;
      return p2.recalc();
    }

    recalc() {
      var j, k, len, ref, results;
      boundMethodCheck(this, Punt);
      ref = this.vormen;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        k = ref[j];
        results.push(k.fn());
      }
      return results;
    }

    str(r = true) {
      if (r) {
        return `(${Math.floor(this.x)}, ${Math.floor(this.y)})`;
      } else {
        return `(${this.x}, ${this.y})`;
      }
    }

    static delt(a, b) {
      return Math.sqrt(Math.abs((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y)));
    }

    static mid(a, b) {
      return new Punt((a.x + b.x) / 2.0, (a.y + b.y) / 2.0);
    }

    static midden(a, b) {
      return {
        x: (a.x + b.x) / 2.0,
        y: (a.y + b.y) / 2.0
      };
    }

    copyto(p) {
      p.x = this.x;
      p.y = this.y;
      return p.recalc();
    }

    afstand(p) {
      boundMethodCheck(this, Punt);
      return Punt.delt(this, p);
    }

    reflectom(p) {
      this.x = 2 * p.x - this.x;
      this.y = 2 * p.y - this.y;
      return this.recalc();
    }

    isBetween(p1, p2) {
      if (this.x <= Math.min(p1.x, p2.x)) {
        return false;
      } else if (this.x >= Math.max(p1.x, p2.x)) {
        return false;
      } else if (this.y <= Math.min(p1.y, p2.y)) {
        return false;
      } else if (this.y >= Math.max(p1.y, p2.y)) {
        return false;
      } else {
        return true;
      }
    }

    teken(r = 2, str = 'red', fill = 'none') {
      return doek.teken(this.s(r), 2, str, fill);
    }

    move(alfa, d) {
      this.x += d * Math.cos(alfa);
      this.y += d * Math.sin(alfa);
      return this.recalc();
    }

    moveto(pt, d) {
      var del, dx2, dy2;
      if (isnul(pt.x - this.x)) {
        //alert("het is nul in x")
        this.y += d;
        this.recalc();
        return;
      }
      if (isnul(pt.y - this.y)) {
        //alert("het is nul in y")
        this.x += d;
        this.recalc();
        return;
      }
      del = (pt.x - this.x) / (pt.y - this.y);
      dx2 = Math.abs((del * del * d * d) / (1 - del * del));
      dy2 = Math.abs(d * d - dx2);
      if (d > 0) {
        this.x += Math.sqrt(dx2);
        if (pt.x < this.x) {
          this.x -= 2.0 * Math.sqrt(dx2);
        }
        this.y += Math.sqrt(dy2);
        if (pt.y < this.y) {
          this.y -= 2.0 * Math.sqrt(dx2);
        }
      }
      if (d < 0) {
        this.x -= Math.sqrt(dx2);
        if (pt.x < this.x) {
          this.x += 2.0 * Math.sqrt(dx2);
        }
        this.y -= Math.sqrt(dy2);
        if (pt.y < this.y) {
          this.y += 2.0 * Math.sqrt(dx2);
        }
      }
      this.recalc();
      return 1;
    }

  };

  nulPunt = new Punt(0, 0);

  rand = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  door2puntenY = function(a, b) {
    return function(X) {
      return ((b.y - a.y) / (b.x - a.x)) * (X - a.x) + a.y;
    };
  };

  door2puntenX = function(a, b) {
    return function(Y) {
      return ((b.x - a.x) / (b.y - a.y)) * (Y - a.y) + a.x;
    };
  };

  Midden = function(a, b) {
    return new Punt((a.x + b.x) / 2.0, (a.y + b.y) / 2.0);
  };

  Lijn = (function() {
    class Lijn {
      constructor(p1 = nulPunt, p2 = nulPunt, color = 'black') {
        this.reassign = this.reassign.bind(this);
        this.recalc = this.recalc.bind(this);
        this.color = color;
        this.ptn = [p1, p2, new Punt((p1.x + p2.x) / 2.0, (p1.y + p2.y) / 2.0), new Punt((p1.x + p2.x) / 2.0, (p1.y + p2.y) / 2.0)];
        this.p1 = this.ptn[0];
        this.p2 = this.ptn[1];
        this.cen = this.ptn[2];
        this.cen2 = this.ptn[3];
        this.key = new Uq(this.recalc, this.ptn);
        this.ptn[0].assign(this.key, 0);
        this.ptn[1].assign(this.key, 1);
        this.ptn[2].assign(this.key, 2);
        this.ptn[3].assign(this.key, 3);
        this.recht = true;
        if (isnul(this.ptn[1].x - this.ptn[0].x)) {
          this.A = 1;
          this.B = 0;
          this.C = -this.ptn[0].x;
        } else {
          this.A = -(this.ptn[1].y - this.ptn[0].y) / (this.ptn[1].x - this.ptn[0].x);
          this.B = 1;
          this.C = -this.ptn[0].y - this.A * this.ptn[0].x;
        }
      }

      test() {
        return doek.v.line(this.p1.x, this.p1.y, this.p2.x, this.p2.y).attr({
          stroke: 'none',
          'stroke-width': 0
        });
      }

      afstandTotPunt(p) {
        return Math.abs(this.A * p.x + this.B * p.y + this.C) / Math.sqrt(this.A * this.A + this.B * this.B);
      }

      reassign(i, pn) {
        return this.ptn[Lijn.PARA[i]].reassign(this.key, Lijn.PARA[i], pn);
      }

      str() {
        return `p1 = ${this.ptn[0].str()} <br>p2 = ${this.ptn[1].str()}`;
      }

      s() {
        return `M ${this.ptn[0].x}, ${this.ptn[0].y} L${this.ptn[1].x}, ${this.ptn[1].y} `;
      }

      sn() {
        return ` L${this.ptn[1].x}, ${this.ptn[1].y} `;
      }

      teken(sw = 2) {
        return doek.teken(this.s(), sw, this.color);
      }

      setp1(pn) {
        return this.reassign('p1', pn);
      }

      setp2(p) {
        return this.reassign('p2', pn);
      }

      recalc() {
        this.cen.x = (this.p1.x + this.p2.x) / 2.0;
        this.cen.y = (this.p1.y + this.p2.y) / 2.0;
        this.recht = isnul(this.cen.afstand(this.cen2));
        if (isnul(this.ptn[1].x - this.ptn[0].x)) {
          this.A = 1;
          this.B = 0;
          return this.C = -this.ptn[0].x;
        } else {
          this.A = -(this.ptn[1].y - this.ptn[0].y) / (this.ptn[1].x - this.ptn[0].x);
          this.B = 1;
          return this.C = -this.ptn[0].y - this.A * this.ptn[0].x;
        }
      }

      X(y) {
        if (isnul(this.A)) {
          return null;
        }
        return (-1) * (this.B * y - this.C) / this.A;
      }

      Y(x) {
        if (isnul(this.B)) {
          return null;
        }
        return (-1) * (this.A * y - this.C) / this.B;
      }

      M() {
        return this.Y(1) - this.Y(0);
      }

      snijdt(L) {
        var sps, temp1, temp2;
        temp1 = this.test();
        temp2 = L.test();
        sps = temp1.intersectsLine(temp2);
        if (sps !== void 0) {
          return true;
        }
        return false;
      }

      snijpt(L) {
        var temp, temp1, temp2;
        temp1 = this.test();
        temp2 = L.test();
        temp = temp1.intersectsLine(temp2);
        if (temp !== void 0) {
          return new Punt(temp.x, temp.y);
        }
        return null;
      }

      snijptdel(L) {
        var temp, temp1, temp2, tmp;
        temp1 = this.test();
        temp2 = L.test();
        temp = temp1.intersectsLine(temp2);
        if (temp !== void 0) {
          tmp = new Punt(temp.x, temp.y);
          return this.p1.afstand(tmp);
        }
        return null;
      }

      /*
      snijptdel: (L) ->
      p "sniijpt del"
      return 5

      temp1 = @test()
      temp2= L.test()
      temp = temp1.intersectsLine(temp2)
      if(temp)
      ptmp=new Punt(temp.x, temp.y)
      return ptmp.afstand(@p1)
      else
      return
      */
      snijd(L) {
        var xt;
        if (isnul(this.A) && isnul(L.A)) {
          //alert("fuck het snijdt niet")
          return null;
        }
        //if ( isnul( @M() - L.M() ))
        //  return null
        if (isnul(L.B)) { //L.B == 0)
          //alert("het snijd in #{(-1) * L.C} , #{(-1) * @A * L.C - @C}")
          return new Punt((-1) * L.C, (-1) * this.A * L.C - this.C);
        } else if (isnul(this.B)) { //@B == 0)
          //alert("snijdt: x= #{(-1) * @C}  y: #{(-1) * L.A * @C - L.C}")
          return new Punt((-1) * this.C, (-1) * L.A * this.C - L.C);
        } else {
          xt = (L.C - this.C) / (this.A - L.A);
          return new Punt(xt, (-1) * this.A * xt - this.C);
        }
      }

    };

    Lijn.PARA = {
      'p1': 0,
      'p2': 1,
      'cen': 2,
      'cen2': 3
    };

    return Lijn;

  }).call(this);

  Rechthoek = class Rechthoek {
    constructor(a = new Punt, b = new Punt, c = new Punt, d = new Punt) {
      var i, j, len, ref;
      this.recalc = this.recalc.bind(this);
      this.ptn = [a, b, c, d];
      this.a = this.ptn[0];
      this.b = this.ptn[1];
      this.c = this.ptn[2];
      this.d = this.ptn[3];
      this.key = new Uq(this.recalc, this.ptn);
      ref = [0, 1, 2, 3];
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        this.ptn[i].assign(this.key, i);
      }
      this.s = `M${this.a.x},${this.a.y}L${this.b.x},${this.b.y}L${this.c.x},${this.c.y}L${this.d.x},${this.d.y}Z`;
      this.w = Punt.delt(this.a, this.b);
      this.h = Punt.delt(this.b, this.c);
      this.Ln = [new Lijn(this.a, this.b), new Lijn(this.b, this.c), new Lijn(this.c, this.d), new Lijn(this.d, this.a)];
      this.D1 = new Lijn(this.a, this.c);
      this.D2 = new Lijn(this.b, this.d);
      this.cen = this.D1.snijd(this.D2);
    }

    recalc() {
      this.s = `M${this.a.x} ${this.a.y} L${this.b.x} ${this.b.y} L${this.c.x} ${this.c.y} L${this.d.x} ${this.d.y} Z`;
      this.w = Punt.delt(this.a, this.b);
      return this.h = Punt.delt(this.b, this.c);
    }

    //@D1.recalc
    //@D2.recalc
    //@cen = @D1.snijd(@D2)
    str() {
      return `A = ${this.a.str()}<br>B = ${this.b.str()}<br>C = ${this.c.str()}<br>D = ${this.d.str()}`;
    }

    test() {
      return doek.v.path(this.s).attr({
        stroke: 'none',
        fill: 'none',
        'stroke-width': 0
      });
    }

    teken(sw = 2, str = 'black', fill = 'none') {
      return doek.teken(this.s, sw, str, fill);
    }

    coords() {
      return `a = (${this.a.x}, ${this.a.y})  b = (${this.b.x}, ${this.b.y})  c = (${this.c.x}, ${this.c.y})  d = (${this.d.x}, ${this.d.y})`;
    }

    krimp(m) {
      this.a.moveto(this.cen, m);
      this.b.moveto(this.cen, m);
      this.c.moveto(this.cen, m);
      return this.d.moveto(this.cen, m);
    }

    copyto(r) {
      this.a.copyto(r.a);
      this.b.copyto(r.b);
      this.c.copyto(r.c);
      return this.d.copyto(r.d);
    }

    //r.recalc()
    quadr(q) {
      switch (q) {
        case 0:
          return {
            a: this.a,
            b: Punt.midden(this.a, this.b),
            c: Punt.midden(this.a, this.c),
            d: Punt.midden(this.a, this.d)
          };
        case 1:
          return {
            a: Punt.midden(this.a, this.b),
            b: this.b,
            c: Punt.midden(this.b, this.c),
            d: Punt.midden(this.a, this.c)
          };
        case 2:
          return {
            a: Punt.midden(this.a, this.c),
            b: Punt.midden(this.b, this.c),
            c: this.c,
            d: Punt.midden(this.d, this.c)
          };
        case 3:
          return {
            a: Punt.midden(this.a, this.d),
            b: Punt.midden(this.a, this.c),
            c: Punt.midden(this.d, this.c),
            d: this.d
          };
      }
    }

    krulhaak() {
      return {
        a: this.a,
        b: this.b,
        c: this.c,
        d: this.d
      };
    }

    rpunt() {
      return new Punt(Math.random() * (this.b.x - this.a.x) + this.a.x, Math.random() * (this.d.y - this.a.y) + this.a.y);
    }

    rx() {
      return Math.random() * (this.b.x - this.a.x) + this.a.x;
    }

    ry() {
      return Math.random() * (this.d.y - this.a.y) + this.a.y;
    }

  };

  nulhoek = new Rechthoek(new Punt, new Punt, new Punt, new Punt);

  Venster = class Venster {
    constructor(w = SCREENW, h = SCREENH, m1 = 0.07, n = 'drawing') {
      this.teken = this.teken.bind(this);
      this.w = w;
      this.h = h;
      this.m = m1;
      this.n = n;
      this.A = new Punt(0.0, 0.0);
      this.B = new Punt(this.w, 0.0);
      this.C = new Punt(this.w, this.h);
      this.D = new Punt(0.0, this.h);
      this.binnen = new Rechthoek(new Punt(0.0, 0.0), new Punt(this.w, 0.0), this.C, new Punt(0, this.h));
      this.v = SVG('drawing').size(this.w, this.h);
    }

    teken(string, sw = 2, stro = 'black', fill = 'none') {
      return this.v.path(string).attr({
        fill: fill,
        stroke: stro,
        'stroke-width': sw
      });
    }

  };

  doek = new Venster();

  VeelHoek = class VeelHoek {
    constructor(args) {
      var j, len, ln;
      this.Ln = [args];
      this.ptn = [];
      for (j = 0, len = args.length; j < len; j++) {
        ln = args[j];
        this.ptn.push(ln.p1.x, ln.p1.y, ln.p2.x, ln.p2.y);
      }
    }

    svgstring() {
      var i, svgs;
      svgs = " ";
      svgs += `M ${this.ptn[0]},${this.ptn[1]} `;
      svgs += (function() {
        var j, ref, results;
        results = [];
        for (i = j = 1, ref = this.ptn.length / 2 - 1; 1 <= ref ? j < ref : j > ref; i = 1 <= ref ? ++j : --j) {
          results.push(`L ${this.ptn[2 * i]},${this.ptn[2 * i + 1]}`);
        }
        return results;
      }).call(this);
      svgs += "Z";
      return svgs;
    }

    str() {
      var i, s;
      s = "";
      return s += (function() {
        var j, ref, results;
        results = [];
        for (i = j = 0, ref = this.ptn.length - 1; j < ref; i = j += 2) {
          results.push(`${this.ptn[i]}, ${this.ptn[i + 1]} <br>`);
        }
        return results;
      }).call(this);
    }

  };

  Pad = (function() {
    class Pad {
      constructor(stri = `M ${nulPunt}`, name = 'hhh') {
        this.s = stri;
        this.begin = nulPunt;
        this.eind = nulPunt;
        this.name = name;
        if (name === 'hhh') {
          this.name = `PAD_${Pad.names}`;
          Pad.names++;
        }
      }

      teken(sw = 0, str = 'none', fi = 'none') {
        return Pad.venster.path(this.s).attr({
          fill: fi,
          stroke: str,
          'stroke-width': sw
        });
      }

    };

    Pad.venster = doek.v;

    Pad.names = 0;

    return Pad;

  }).call(this);

  Cirkel = class Cirkel {
    constructor(c1, r1) {
      this.c = c1;
      this.r = r1;
      this.s = ` M ${this.c.x - this.r}, ${this.c.y} a ${this.r},${this.r} 0 1,0 ${2 * this.r},0 a ${this.r},${this.r} 0 1,0 -${2 * this.r},0 `;
    }

    teken(sw = 2, str = 'black', fill = 'none') {
      return doek.teken(this.s, sw, str, fill);
    }

    static tekentest(p, c = 'red', r = 5) {
      return Pad.venster.path(`M ${p.x - r}, ${p.y} a ${r},${r} 0 1,0 ${2 * r},0 a ${r},${r} 0 1,0 -${2 * r},0`).attr({
        fill: c,
        stroke: c
      });
    }

  };

  //----------------------------------------------------------------------
  maakrecht = function(rh) {
    return new Rechthoek(new Punt(rh.a.x, rh.a.y), new Punt(rh.b.x, rh.b.y), new Punt(rh.c.x, rh.c.y), new Punt(rh.d.x, rh.d.y));
  };

  draw = function(s, sw, c) {
    return doek.v.path(s).attr({
      'stroke-width': sw,
      stroke: c,
      fill: 'none'
    });
  };

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  colors = ['rgb(242,2,2)', 'rgb(227,130,16)', 'rgb(196,199,31)', 'rgb(102,200,49)', 'rgb(21,200,173)', 'rgb(5,84,237)', 'rgb(200,36,154)', 'rgb(0,255,79)', 'rgb(32,248,255)'];

  //888888888888888888888888888888888888888888888888888888888888888888888888888888
  //888888888888888888888888888888888888888888888888888888888888888888888888888888
  kr = 15;

  omtrek = maakrecht(doek.binnen.krulhaak());

  omtrek.krimp(kr);

  omtr = new Pad(omtrek.s);

  omtr.teken(1, 'orange');

  doek.binnen.teken();

  //draw(omtrek.s,3,'blue')
  q0 = maakrecht(doek.binnen.quadr(0));

  q0.krimp(kr);

  Q0 = new Pad(q0.s);

  //Q0.teken(1, 'blue')
  doek.teken(q0.s, 1, 'green');

  q1 = maakrecht(doek.binnen.quadr(1));

  q1.krimp(kr);

  Q1 = new Pad(q1.s);

  Q1.teken(1, 'blue');

  q2 = maakrecht(doek.binnen.quadr(2));

  q2.krimp(kr);

  Q2 = new Pad(q2.s);

  Q2.teken(1, 'green');

  q3 = maakrecht(doek.binnen.quadr(3));

  q3.krimp(kr);

  Q3 = new Pad(q3.s);

  Q3.teken(1, 'green');

  lijn1 = new Lijn(q0.a, q0.c);

  lijn2 = new Lijn(q0.b, q0.d);

  spt12 = lijn1.snijpt(lijn2);

  spt12.teken();

  p(lijn1.snijdt(lijn2));

  testl1 = lijn1.test();

  testl2 = lijn2.test();

  testl1l2 = testl1.intersectsLine(testl2);

  p(testl1l2.y);

  testpunt12 = new Cirkel(testl1l2, 5);

  //testpunt12.teken(5, 'red')
  //lijn1.teken()
  //lijn2.teken()
  nieuw = function() {
    /*
    set= (ln) ->
      #Koffie.insertAdjacentHTML 'beforeend', "#{t}<br>" for t in testen
      #it =its
      if check(ln)
        ttt= ln.snijpt(Lt)
        its = 1
        p "SNIJDT!!!!!"
        dmax = Punt.delt(s, ttt) *0.9
        d= dmax/2
        return

        p2t.move(a, (dmax-d)/2)
        dmax -= (dmax-d)/2

        dmax = d
        d -= (d-dmin)/2
        if dmax < 1
          p "dmax is kleiner dan 1 -> #{dmax} "
          dmax = 0
          return
        else
          p "dmax is nog niet ok -> #{dmax}"
          set(ln)

      else

        if its == 0
          dmax += 10
          d= dmax / 2
          p2t.move(a,10)
          while (!check(ln) && dmax< (doek.binnen.h + doek.binnen.w))
            dmax += 10
            d = dmax/2
            p2t.move(a,10)

          its=1
          dmax-=10
          dmin=0
          d=dmax/2
          p2t.move(a,-10)
          p "snijd niet en its was 0"
          return

        dmin = d
        p2t.move(a, (dmax-d)/2)
        d += (dmax-d)/2
        if(dmax-dmin < 10 )
          #p "ver genoeg -> #{dmax} "
          d=dmax/2
          dmin=0
          return
        else
          #p "dmax - dmin = #{dmax - dmin}"
          set(ln)

     */
    var LN, Ll, Lr, Lt, P0, P01, P1, P12, P2, P23, P233, P3, P30, PTN, a, check, checkl, d, dmax, dmin, i, ind, iters, its, j, kader, l, len, len1, len2, lnc, lnn, moved, n, o, p2t, ref, s, set, sl, spl, spt1, sr, t, testlijn, u;
    P0 = q0.rpunt();
    P1 = q1.rpunt();
    P01 = Punt.mid(P0, P1);
    P2 = q2.rpunt();
    P3 = q3.rpunt();
    P12 = Punt.mid(P1, P2);
    P23 = Punt.mid(P2, P3);
    P30 = Punt.mid(P3, P0);
    P233 = Punt.mid(P23, P3);
    PTN = [P0, P01, P1, P12, P2, P23, P3, P30];
    //PTN=[P0, P1, P12, P2, P23, P3, P30]
    spl = fns.ran([0, 0, 1, 1, 2, 2, 3, 3, 3, 5, 5]);
    //PTN.splice(Math.floor(Math.random() * (PTN.length-1)),1) for i in [0...spl]
    LN = [];
    moved = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i = j = 0, ref = PTN.length - 1; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      LN.push(new Lijn(PTN[i], PTN[i + 1], colors[i]));
    }
    LN.push(new Lijn(PTN[7], PTN[0], colors[8]));
    //doek.teken(ln.s, 2 ) for ln in LN
    //lnc.teken(5) for lnc in LN
    //p "color "#{index} = #{c}" for c in colors
    //iters= Math.floor(Math.random() * 10)
    iters = 1;
    while (iters > 0) {
      iters -= 1;
      ind = Math.floor(Math.random() * PTN.length);
      s = PTN[ind];
      sr = PTN[(ind + 1) % PTN.length];
      if (ind === 0) {
        sl = PTN[PTN.length - 1];
      } else {
        sl = PTN[ind - 1];
      }
      a = Math.random() * 2 * Math.PI;
      dmax = doek.binnen.h * doek.binnen.w;
      dmin = 0;
      p2t = new Punt(s.x + dmax * Math.cos(a), s.y + dmax * Math.sin(a));
      Lt = new Lijn(s, p2t, 'green');
      Ll = new Lijn(sl, p2t);
      Lr = new Lijn(sr, p2t);
      kader = doek.binnen.test();
      testlijn = Lt.test();
      spt1 = testlijn.intersectsPath(kader, 10)[0];
      if (spt1 != null) {
        spt1 = new Punt(spt1.x, spt1.y);
        spt1.teken();
        p2t.move(a, -dmax);
        dmax = Punt.delt(s, spt1) * 0.9;
        d = dmax / 2;
        p2t.move(a, dmax);
        p2t.teken();
        Lt.teken(2);
      } else {
        p2t.move(a, -dmax);
        dmax = 70;
        d = 35;
        p2t.move(a, -dmax);
      }
      d = dmax / 2;
      check = function(ln) {
        if ((ln.p1 !== sl) && (ln.p2 !== sl)) {
          if (Ll.snijdt(ln)) {
            return true;
          }
        }
        if ((ln.p1 !== sr) && (ln.p2 !== sr)) {
          if (Lr.snijdt(lnn)) {
            /*

            */
            return true;
          }
        }
        return false;
      };
      its = 0;
      set = function(ln, its = 1) {
        var it, l, len, t;
        return;
        it = its;
        p(`aaa ${Ll.snijdt(ln)}`);
        p("fuck");
        if ((Ll.snijdt(ln) && !((ln.p1 === sl) || (ln.p2 === sl))) || (Lr.snijdt(lnn) && !((ln.p1 === sr) || (ln.p2 === sr)))) {
          dmax = d;
          p("aaa");
          for (l = 0, len = testen.length; l < len; l++) {
            t = testen[l];
            Koffie.insertAdjacentHTML('beforeend', `${t}<br>`);
          }
          p2t.move(a, (dmin - d) / 2);
          d -= (d - dmin) / 2;
          set(ln, it);
        } else {
          dmin = d;
          p2t.move(a, (dmax - d) / 2);
          d += (dmax - d) / 2;
          it--;
          if (it === 0) {
            d = dmax / 2;
            dmin = 0;
          } else {
            set(ln, it);
          }
        }
      };
      for (l = 0, len = LN.length; l < len; l++) {
        lnn = LN[l];
        //set(lnn) for lnn in doek.binnen.Ln
        set(lnn);
      }
      checkl = function(LL) {
        var len1, ll, n;
        for (n = 0, len1 = LL.length; n < len1; n++) {
          ll = LL[n];
          if (check(ll)) {
            return true;
          }
        }
      };
      d = Math.random() * dmax;
      s.move(a, d);
      while (dmax > 10) {
        if (checkl(LL)) {
          s.move(a, -d);
          dmax *= 0.75;
          d = Math.random() * dmax;
          s.move(a, d);
        } else {
          dmax = 9;
        }
      }
      moved[ind] += 1;
      p(`stoofvlees ${d}`);
      for (n = 0, len1 = testen.length; n < len1; n++) {
        t = testen[n];
        Koffie.insertAdjacentHTML('beforeend', `${t}<br>`);
      }
    }
    for (o = 0, len2 = LN.length; o < len2; o++) {
      lnc = LN[o];
      lnc.teken(1);
    }
    for (i = u = 0; u < 9; i = ++u) {
      p(`p${i} moved ${moved[i]} times`);
    }
    return new VeelHoek((function() {
      var len3, results, v;
      results = [];
      for (v = 0, len3 = LN.length; v < len3; v++) {
        lnn = LN[v];
        results.push(lnn);
      }
      return results;
    })());
  };

  veelhoek1 = nieuw();

  veelpad = new Pad(veelhoek1.svgstring());

  veelpad.teken(2, 'black');

  //p veelhoek1.str()
  p("fudffdddck");

  for (j = 0, len = testen.length; j < len; j++) {
    t = testen[j];
    Koffie.insertAdjacentHTML('beforeend', `${t}<br>`);
  }

}).call(this);