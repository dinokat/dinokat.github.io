Koffie = document.getElementById("koffie")
Koffie.innerHTML = "Hallco! <br>"
testen = []


p = (t) -> testen.push t

isnul = (t) ->
  Math.abs(t) < 0.00001

SCREENW = 640
SCREENH = 420
#venster1 = SVG('drawing').size(SCREENW, SCREENH)


class Uq
  constructor: (fn, prps) ->
    @uq = "ding#{Uq.qs}"
    Uq.qs++
    @fn = fn
    @prps = prps
  @qs = 0

class Punt extends SVG.Point
  constructor: (x=0, y=0) ->
    super(x, y)
    @x=x
    @y=y
    @vormen =[]

  s: (r) ->
    " \
                   M #{@x - r}, #{@y} \
                   a #{r},#{r} 0 1,0 #{2 * r},0 \
                   a #{r},#{r} 0 1,0 -#{2 * r},0 \
                   "

  @copy: (p) -> new Punt(p.x, p.y)
  @zero: ->new Punt(0,0)
  assign: (k, para) =>
    #Koffie.insertAdjacentHTML 'beforeend', "#{t}<br>" for t in testen
    @vormen.push(k)
    k.prps[para] = @

  valid: () ->
    if (@y < 0 || @x < 0)
      return false
    if (@ == null)
      return false
    if (@x >= SCREENW || @y >= SCREENH)
      return false
    return true

  reassign: (k, para, p2) =>
    if @vormen.indexOf(k) != -1
      @vormen.splice(@vormen.indexOf(k),1)
    p2.vormen.push(k)
    k.prps[para] = p2
    p2.recalc()

  recalc: () =>
    k.fn() for k in @vormen
  str: (r = true) ->
    if r
      return "(#{Math.floor(@x)}, #{Math.floor(@y)})"
    else
      return "(#{@x}, #{@y})"
  @delt = (a, b) ->
    Math.sqrt(Math.abs((b.x-a.x)*(b.x-a.x)+(b.y-a.y)*(b.y-a.y)))
  @mid = (a, b) ->
    new Punt((a.x + b.x )/2.0 , (a.y + b.y )/2.0)
  @midden = (a, b) ->
    {
      x: (a.x + b.x )/2.0
      y: (a.y + b.y )/2.0
      }
  copyto: (p) ->
    p.x = @.x
    p.y = @.y
    p.recalc()
  afstand: (p) =>
    Punt.delt(this, p)
  reflectom: (p) ->
    @.x = 2 * p.x - @.x
    @.y = 2 * p.y - @.y
    @.recalc()
  isBetween: (p1,p2) ->
    if @x <= Math.min(p1.x, p2.x)
      return false
    else if @x >= Math.max(p1.x, p2.x)
      return false
    else if @y <= Math.min(p1.y, p2.y)
      return false
    else if @y >= Math.max(p1.y, p2.y)
      return false
    else
      return true

  teken: (r=2, str='red',fill='none') ->
    doek.teken(@s(r),2,str,fill)


  move: (alfa, d) ->
    @x += d * Math.cos(alfa)
    @y += d * Math.sin(alfa)
    @.recalc()


  moveto: (pt,d) ->
    if isnul(pt.x - @.x)
      #alert("het is nul in x")
      @.y += d
      @.recalc()
      return
    if isnul(pt.y - @.y)
      #alert("het is nul in y")
      @.x += d
      @.recalc()
      return

    del = (pt.x - @.x) / (pt.y - @.y)

    dx2= Math.abs((del * del * d * d) / (1 - del * del))
    dy2= Math.abs(d * d - dx2)

    if d>0
      @.x +=  Math.sqrt(dx2)
      if( pt.x < @.x)
        @.x -=  2.0 * Math.sqrt(dx2)

      @.y +=  Math.sqrt(dy2)
      if( pt.y < @.y)
        @.y -=  2.0 * Math.sqrt(dx2)
    if d<0
      @.x -=  Math.sqrt(dx2)
      if( pt.x < @.x)
        @.x +=  2.0 * Math.sqrt(dx2)

      @.y -=  Math.sqrt(dy2)
      if( pt.y < @.y)
        @.y +=  2.0 * Math.sqrt(dx2)

    @.recalc()
    return 1


nulPunt= new Punt(0,0)
rand= (min, max) ->
  return Math.floor(Math.random()*(max-min+1)) + min
door2puntenY = (a,b) ->
  (X) ->
    ((b.y - a.y)/(b.x - a.x)) * (X - a.x) + a.y
door2puntenX = (a,b) ->
  (Y) ->
    ((b.x - a.x)/(b.y - a.y)) * (Y - a.y) + a.x
Midden = (a,b) ->
  new Punt((a.x + b.x )/2.0, (a.y + b.y )/2.0)



class Lijn
  constructor: (p1 = nulPunt, p2 = nulPunt, @color ='black') ->
    @ptn= [p1, p2, new Punt((p1.x + p2.x )/2.0, (p1.y + p2.y )/2.0 ), new Punt((p1.x + p2.x )/2.0, (p1.y + p2.y )/2.0 )]
    @p1=@ptn[0]
    @p2 =@ptn[1]
    @cen=@ptn[2]
    @cen2=@ptn[3]
    @key=new Uq(@recalc, @ptn)
    @ptn[0].assign(@key, 0)
    @ptn[1].assign(@key, 1)
    @ptn[2].assign(@key, 2)
    @ptn[3].assign(@key, 3)
    @recht = true

    if(isnul(@ptn[1].x - @ptn[0].x ))
      @A = 1
      @B = 0
      @C = - @ptn[0].x
    else
      @A = - (@ptn[1].y - @ptn[0].y) / (@ptn[1].x - @ptn[0].x)
      @B = 1
      @C = - @ptn[0].y - @A * @ptn[0].x

  @PARA = {
    'p1': 0
    'p2': 1
    'cen': 2
    'cen2': 3
  }

  test: () ->
    doek.v.line(@p1.x, @p1.y, @p2.x, @p2.y)
          .attr({
              stroke        : 'none',
              'stroke-width': 0
          })

  afstandTotPunt: (p) ->
    Math.abs(@A * p.x + @B * p.y + @C) / Math.sqrt(@A * @A + @B * @B)

  reassign: (i, pn) =>
    @ptn[Lijn.PARA[i]].reassign(@key, Lijn.PARA[i], pn)

  str: () ->
    "p1 = #{@ptn[0].str()} <br>p2 = #{@ptn[1].str()}"

  s: () ->
    "M #{@ptn[0].x}, #{@ptn[0].y} L#{@ptn[1].x}, #{@ptn[1].y} "
  sn: () ->
    " L#{@ptn[1].x}, #{@ptn[1].y} "

  teken: (sw=2 ) ->
    doek.teken(@s(), sw, @color)

  setp1: (pn) ->
    @reassign('p1', pn)
  setp2: (p) ->
    @reassign('p2', pn)

  recalc: () =>
    @cen.x = (@p1.x + @p2.x )/2.0
    @cen.y = (@p1.y + @p2.y )/2.0
    @recht = isnul(@cen.afstand(@cen2))
    if(isnul(@ptn[1].x - @ptn[0].x ))
      @A = 1
      @B = 0
      @C = - @ptn[0].x
    else
      @A = - (@ptn[1].y - @ptn[0].y) / (@ptn[1].x - @ptn[0].x)
      @B = 1
      @C = - @ptn[0].y - @A * @ptn[0].x

  X: (y) ->
    if isnul(@A)
      return null
    (-1) * (@B * y - @C) / @A
  Y: (x) ->
    if isnul(@B)
      return null
    (-1) * (@A * y - @C) / @B
  M: () ->
    @Y(1) - @Y(0)

  snijdt: (L) ->
    temp1 = @test()
    temp2 = L.test()
    sps = temp1.intersectsLine(temp2)
    if sps != undefined
      return true
    false

  snijpt: (L) ->
    temp1 = @test()
    temp2= L.test()
    temp = temp1.intersectsLine(temp2)
    if temp != undefined
      return new Punt(temp.x, temp.y)
    null

  snijptdel: (L) ->
    temp1 = @test()
    temp2= L.test()
    temp = temp1.intersectsLine(temp2)
    if temp != undefined
      tmp = new Punt(temp.x, temp.y)
      return @p1.afstand(tmp)
    null





###
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
      ###

  snijd: (L) ->

    if(isnul(@A) && isnul(L.A))
      #alert("fuck het snijdt niet")
      return null
    #if ( isnul( @M() - L.M() ))
    #  return null


    if( isnul(L.B))#L.B == 0)
      #alert("het snijd in #{(-1) * L.C} , #{(-1) * @A * L.C - @C}")
      return new Punt((-1) * L.C, (-1) * @A * L.C - @C )
    else if (isnul(@B)) #@B == 0)
      #alert("snijdt: x= #{(-1) * @C}  y: #{(-1) * L.A * @C - L.C}")
      return new Punt((-1) * @C, (-1) * L.A * @C - L.C )
    else

      xt = (L.C - @.C) / (@A - L.A)
      return new Punt(xt, (-1) * @A * xt - @C)



class Rechthoek
  constructor: (a = new Punt, b = new Punt, c = new Punt, d = new Punt) ->
    @ptn= [a, b, c, d]
    @a = @ptn[0]
    @b = @ptn[1]
    @c = @ptn[2]
    @d = @ptn[3]
    @key = new Uq(@recalc, @ptn )

    @ptn[i].assign(@key, i) for i in [0,1,2,3]

    @s = "M#{@a.x},#{@a.y}L#{@b.x},#{@b.y}L#{@c.x},#{@c.y}L#{@d.x},#{@d.y}Z"

    @w = Punt.delt(@a, @b)
    @h = Punt.delt(@b, @c)

    @Ln = [new Lijn(@a,@b), new Lijn(@b,@c), new Lijn(@c,@d), new Lijn(@d,@a)]

    @D1 = new Lijn(@a,@c)
    @D2 = new Lijn(@b,@d)
    @cen = @D1.snijd(@D2)

  recalc: () =>
    @s = "M#{@a.x} #{@a.y} L#{@b.x} #{@b.y} L#{@c.x} #{@c.y} L#{@d.x} #{@d.y} Z"
    @w = Punt.delt(@a, @b)
    @h = Punt.delt(@b, @c)
    #@D1.recalc
    #@D2.recalc
    #@cen = @D1.snijd(@D2)

  str: () ->
    "A = #{@a.str()}<br>B = #{@b.str()}<br>C = #{@c.str()}<br>D = #{@d.str()}"

  test: () ->
    doek.v.path(@s)
          .attr({
              stroke        : 'none',
              fill : 'none',
              'stroke-width': 0
          })

  teken: (sw=2,str='black',fill='none') ->
    doek.teken(@s,sw,str,fill)

  coords: () ->
    "a = (#{@a.x}, #{@a.y})  b = (#{@b.x}, #{@b.y})  c = (#{@c.x}, #{@c.y})  d = (#{@d.x}, #{@d.y})"
  krimp: (m) ->
    @a.moveto(@cen, m)
    @b.moveto(@cen, m)
    @c.moveto(@cen, m)
    @d.moveto(@cen, m)
  copyto: (r) ->
    @.a.copyto(r.a)
    @.b.copyto(r.b)
    @.c.copyto(r.c)
    @.d.copyto(r.d)
    #r.recalc()
  quadr: (q) ->
    switch q
      when 0 then return {
          a: @a
          b: Punt.midden(@a, @b)
          c: Punt.midden(@a, @c)
          d: Punt.midden(@a, @d)
          }
      when 1 then return {
          a: Punt.midden(@a, @b)
          b: @b
          c: Punt.midden(@b, @c)
          d: Punt.midden(@a, @c)
          }
      when 2 then return {
          a: Punt.midden(@a, @c)
          b: Punt.midden(@b, @c)
          c: @c
          d: Punt.midden(@d, @c)
          }
      when 3 then return {
          a: Punt.midden(@a, @d)
          b: Punt.midden(@a, @c)
          c: Punt.midden(@d, @c)
          d: @d
          }
  krulhaak: () ->
    {
      a: @a
      b: @b
      c: @c
      d: @d
    }
  rpunt: () ->
    new Punt(Math.random() * ( @b.x - @a.x) + @a.x, Math.random() * ( @d.y - @a.y) + @a.y)
  rx: () ->
    Math.random() * ( @b.x - @a.x) + @a.x
  ry: () ->
    Math.random() * ( @d.y - @a.y) + @a.y



nulhoek = new Rechthoek(new Punt, new Punt, new Punt, new Punt)

class Venster
  constructor: (@w = SCREENW, @h = SCREENH, @m = 0.07, @n = 'drawing' ) ->
    @A = new Punt(0.0, 0.0)
    @B = new Punt(@w, 0.0)
    @C = new Punt(@w, @h)
    @D = new Punt(0.0, @h)
    @binnen = new Rechthoek(new Punt(0.0, 0.0), new Punt(@w, 0.0), @C, new Punt(0, @h))
    @v = SVG('drawing' ).size(@w, @h)

  teken: (string, sw=2, stro='black', fill='none') =>
    @v.path(string)
     .attr({
       fill : fill
       stroke: stro
       'stroke-width': sw
       })

doek = new Venster()
class VeelHoek
  constructor: (args) ->
    @Ln = [args]
    @ptn = []
    @ptn.push(ln.p1.x, ln.p1.y, ln.p2.x, ln.p2.y) for ln in args
  svgstring: () ->
    svgs =" "
    svgs += "M #{@ptn[0]},#{@ptn[1]} "
    svgs += ("L #{@ptn[2 * i]},#{@ptn[2 * i + 1]}" for i in [1...@ptn.length/2 -1])
    svgs += "Z"
    return svgs

  str: () ->
    s = ""
    s += ("#{@ptn[i]}, #{@ptn[i+1]} <br>" for i in [0...@ptn.length-1] by 2)

class Pad
  constructor: (stri="M #{nulPunt}", name ='hhh') ->
    @s = stri
    @begin = nulPunt
    @eind = nulPunt
    @name = name
    if(name=='hhh')
      @name = "PAD_#{Pad.names}"
      Pad.names++

  @venster: doek.v
  @names =0

  teken: (sw=0, str='none', fi='none') ->
    Pad.venster.path(this.s)
     .attr({
       fill : fi
       stroke: str
       'stroke-width': sw
       })

class Cirkel
  constructor: (@c, @r) ->

    @s = " \
                   M #{@c.x - @r}, #{@c.y} \
                   a #{@r},#{@r} 0 1,0 #{2 * @r},0 \
                   a #{@r},#{@r} 0 1,0 -#{2 * @r},0 \
                   "

  teken: (sw=2, str='black', fill='none') ->
    doek.teken(@s,sw,str,fill)

  @tekentest: (p, c='red', r=5) ->
        Pad.venster.path("
                       M #{p.x - r}, #{p.y}
                       a #{r},#{r} 0 1,0 #{2*r},0
                       a #{r},#{r} 0 1,0 -#{2*r},0
                       ")
                       .attr({
                         fill : c
                         stroke: c
                         })

#----------------------------------------------------------------------

maakrecht = (rh) ->
  new Rechthoek(new Punt(rh.a.x, rh.a.y), new Punt(rh.b.x, rh.b.y), new Punt(rh.c.x, rh.c.y), new Punt(rh.d.x, rh.d.y) )

draw = (s, sw, c) ->
  doek.v.path(s).attr({
    'stroke-width': sw
    stroke: c
    fill: 'none'
    })

#^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

colors = [
  'rgb(242,2,2)'
  'rgb(227,130,16)'
  'rgb(196,199,31)'
  'rgb(102,200,49)'
  'rgb(21,200,173)'
  'rgb(5,84,237)'
  'rgb(200,36,154)'
  'rgb(0,255,79)'
  'rgb(32,248,255)'
]


#888888888888888888888888888888888888888888888888888888888888888888888888888888
#888888888888888888888888888888888888888888888888888888888888888888888888888888
kr =15
omtrek = maakrecht(doek.binnen.krulhaak())
omtrek.krimp(kr)
omtr = new Pad(omtrek.s)
omtr.teken(1, 'orange')
doek.binnen.teken()
#draw(omtrek.s,3,'blue')

q0 = maakrecht(doek.binnen.quadr(0))

q0.krimp(kr)
Q0 = new Pad(q0.s)
#Q0.teken(1, 'blue')
doek.teken(q0.s, 1, 'green')
q1 = maakrecht(doek.binnen.quadr(1))
q1.krimp(kr)
Q1 = new Pad(q1.s)
Q1.teken(1, 'blue')
q2 = maakrecht(doek.binnen.quadr(2))
q2.krimp(kr)
Q2 = new Pad(q2.s)
Q2.teken(1, 'green')
q3 = maakrecht(doek.binnen.quadr(3))
q3.krimp(kr)
Q3 = new Pad(q3.s)
Q3.teken(1, 'green')
lijn1= new Lijn(q0.a, q0.c)
lijn2= new Lijn(q0.b, q0.d)

spt12 = lijn1.snijpt(lijn2)
spt12.teken()
p lijn1.snijdt(lijn2)


testl1=lijn1.test()
testl2=lijn2.test()
testl1l2 = testl1.intersectsLine(testl2)
p testl1l2.y
testpunt12 = new Cirkel(testl1l2, 5)
#testpunt12.teken(5, 'red')
#lijn1.teken()
#lijn2.teken()




nieuw = () ->
  P0 = q0.rpunt()
  P1 = q1.rpunt()
  P01 = Punt.mid(P0, P1)
  P2 = q2.rpunt()
  P3 = q3.rpunt()
  P12 = Punt.mid(P1, P2)
  P23 = Punt.mid(P2,P3)
  P30 = Punt.mid(P3,P0)

  P233 = Punt.mid(P23,P3)
  PTN=[P0, P01, P1, P12, P2, P23, P3, P30]
  #PTN=[P0, P1, P12, P2, P23, P3, P30]
  spl=fns.ran([0,0,1,1,2,2,3,3,3,5,5])

  #PTN.splice(Math.floor(Math.random() * (PTN.length-1)),1) for i in [0...spl]



  LN = []

  moved=[0,0,0,0,0,0,0,0,0]



  LN.push( new Lijn(PTN[i], PTN[i+1], colors[i] )) for i in [0...PTN.length-1]
  LN.push( new Lijn(PTN[7],PTN[0],colors[8]))

  #doek.teken(ln.s, 2 ) for ln in LN
  #lnc.teken(5) for lnc in LN
  #p "color "#{index} = #{c}" for c in colors
  #iters= Math.floor(Math.random() * 10)
  iters = 1
  while iters > 0
    iters -= 1

    ind = Math.floor(Math.random()*PTN.length)
    s = PTN[ind]
    sr = PTN[(ind+1) % PTN.length]
    if(ind==0)
      sl=PTN[PTN.length-1]
    else
      sl=PTN[ind-1]

    a = Math.random()  * 2 * Math.PI
    dmax = doek.binnen.h * doek.binnen.w
    dmin = 0
    p2t = new Punt(s.x + dmax * Math.cos(a), s.y + dmax * Math.sin(a))
    Lt = new Lijn(s, p2t, 'green')
    Ll = new Lijn(sl,p2t)
    Lr = new Lijn(sr,p2t)

    kader = doek.binnen.test()

    testlijn = Lt.test()
    spt1=testlijn.intersectsPath(kader,10)[0]

    if  spt1?
      spt1 = new Punt(spt1.x,spt1.y)
      spt1.teken()
      p2t.move(a, -dmax)
      dmax = Punt.delt(s, spt1) *0.9
      d= dmax/2
      p2t.move(a,dmax)
      p2t.teken()
      Lt.teken(2)
    else
      p2t.move(a, -dmax)
      dmax= 70
      d = 35
      p2t.move(a, -dmax)

    d = dmax/2

    check = (ln) ->
      if (ln.p1 != sl) && (ln.p2 != sl)
        if Ll.snijdt(ln)
          return true
      if (ln.p1 != sr) && (ln.p2 != sr)
        if Lr.snijdt(lnn)
          ###

          ###
          return true
      return false

    its = 0
    ###
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

###



    set = ( ln, its=1) ->
      return
      it = its
      p "aaa #{Ll.snijdt(ln)}"
      p "fuck"
      if( (Ll.snijdt(ln) && !((ln.p1 == sl) || (ln.p2 == sl))) || (Lr.snijdt(lnn) && !((ln.p1 == sr) || (ln.p2 == sr))   ))

         dmax=d
         p "aaa"
         Koffie.insertAdjacentHTML 'beforeend', "#{t}<br>" for t in testen
         p2t.move(a, (dmin-d)/2)
         d -= (d-dmin)/2
         set(ln,it)
         return
      else
         dmin = d
         p2t.move(a, (dmax-d)/2)
         d += (dmax-d)/2
         it--
         if(it==0)
           d=dmax/2
           dmin=0
           return
         else
           set(ln,it)
           return


    #set(lnn) for lnn in doek.binnen.Ln
    set(lnn) for lnn in LN

    checkl= (LL) ->
      return true for ll in LL when check(ll)

    d = Math.random() * dmax
    s.move(a,d)

    while dmax > 10
      if(checkl(LL))
        s.move(a,-d)
        dmax *= 0.75
        d = Math.random() * dmax
        s.move(a,d)
      else
        dmax=9

    moved[ind] += 1
    p "stoofvlees #{d}"
    Koffie.insertAdjacentHTML 'beforeend', "#{t}<br>" for t in testen


  lnc.teken(1) for lnc in LN
  p "p#{i} moved #{moved[i]} times" for i in [0...9]
  return new VeelHoek(lnn for lnn in LN)


veelhoek1 = nieuw()

veelpad = new Pad(veelhoek1.svgstring())
veelpad.teken(2, 'black')

#p veelhoek1.str()

p "fudffdddck"
Koffie.insertAdjacentHTML 'beforeend', "#{t}<br>" for t in testen
