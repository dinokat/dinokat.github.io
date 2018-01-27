Koffie = document.getElementById("koffie")
Koffie.innerHTML = "we testen die shit! <br>"
testen = []
p = (t) -> testen.push t
pp = () =>
  testen.push(this)


class Uq
  constructor: (fn, prps) ->
    @uq = "ding#{Uq.qs}"
    Uq.qs++
    @fn = fn
    @prps = prps
  @qs = 0

class P
  constructor: (@x=0, @y=0) ->
    @slaves = []

  assign: (k, para) ->
    @slaves.push(k)
    k.prps[para] = @


  reassign: (k, para, p2) ->
    p "reassigning"

    if @slaves.indexOf(k) != -1
      @slaves.splice(@slaves.indexOf(k),1)

    p2.slaves.push(k)

    k.prps[para] = p2

    p2.recalc()

  recalc: () ->
    k.fn() for k in @slaves

  str: () ->
    "(#{@x}, #{@y})"


pA = new P(3, 5)
pB = new P(7, 4)

class S
  constructor: (pp1 , pp2 ) ->
    @ps = [pp1, pp2]
    @key=new Uq(@recalc, @ps )
    pp1.assign(@key,0)
    pp2.assign(@key,1)

  recalc: () ->
    p "recalcfffffing"


  @PAR={
    'p1': 0
    'p2': 1
  }

  reassign: (i, pn) ->
    #@"#{para}".reassign(@, para, pn)
    p "in reassign"
    Koffie.insertAdjacentHTML 'beforeend', "#{t}<br>" for t in testen
    @ps[S.PAR[i]].reassign(@key, S.PAR[i], pn)

  str: () ->
     "----------------------<br> \
     p1 = #{@ps[0].str()} <br> \
     p2 = #{@ps[1].str()}) <br> \
     key = #{@key.uq} <br> \
     -------------------------"




s1 = new S(pA, pB)
s2 = new S(pB, pA)
p s1.str()
s1.reassign('p1', pB)
p s1.str()
p s2.str()

s2 = new S(pA, new P(0, 0))
s4 = new S(pA, new P(0, 0))

#s1.toString()


draw   = SVG('drawing').size(400, 400)
line1  = draw.line(19, 127, 252, 386)
        .attr({
            stroke        : 'blueviolet',
            'stroke-width': 2
        })

line2  = draw.line(140, 45, 18, 250)
        .attr({
            stroke        : 'darkorange',
            'stroke-width': 2
        })
p "fuckfuckfffHOERA HOERA HOERA ff"
Koffie.insertAdjacentHTML 'beforeend', "#{t}<br>" for t in testen        
line1Line2Point   = line1.intersectsLine(line2)


p line1Line2Point

_drawTestPoint = (point, color, radius) ->
    color  = color
    radius = radius
    draw.circle(radius).move(point.x - radius / 2, point.y - radius / 2).attr({'fill': color})

line1Line2Point && _drawTestPoint(line1Line2Point, 'red', 5)


p "fuckfuckfffHOERA HOERA HOERA ff"
Koffie.insertAdjacentHTML 'beforeend', "#{t}<br>" for t in testen
