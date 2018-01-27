
CW=400
CH=400
###
draw   = SVG('drawing').size(CW, CH)
rood = draw.path()
        .attr({
            fill          : 'none',
            stroke        : 'red',
            'stroke-width': 2
        })

groen  = draw.path()
        .attr({
            fill          : 'none',
            stroke        : 'green',
            'stroke-width': 2
        })

oranje  = draw.path()
        .attr({
            fill          : 'none',
            stroke        : 'darkorange',
            'stroke-width': 2
        })




###
class Punt
  constructor: (x, y) ->
    @x=x
    @y=y

  mirrorX: (x) ->
    @x += 2 * (x-@x)



window.Punt = ( x, y) ->
  new Punt(x,y)

###

PTN = [
  new Punt(10,50)
  new Punt(100,200)
  new Punt(100,300)
  new Punt(50,350)
  new Punt(90,210)
]
#groen.setShape(PTN)

pt.mirrorX(75) for pt in PTN

#rood.setShape(PTN)

groenroodpunten = groen.intersectsPath(rood, 10)



_drawTestPoint = (point, color, radius) ->
    color  = color || 'red'
    radius = radius || 5
    draw.circle(radius).move(point.x - radius / 2, point.y - radius / 2).attr({'fill': color})


_drawTestPoint(pt,'purple') for pt in groenroodpunten


Koffie = document.getElementById("koffie")
Koffie.innerHTML = "Hallco! <br>"
say = (t) ->
  Koffie.insertAdjacentHTML('beforeend', "#{t}")
  console.log("#{t}")

warn = (t) ->
  Koffie.insertAdjacentHTML('beforeend', "<p style=\"color:red;\">#{t}</p>")
  console.warn("%c#{t}","color: red")



_spliceCorner= (ptn, index, corner, shape) ->
  console.time("tijder")
  corner.setShape([ptn[index], ptn[(index+1) % ptn.length], ptn[(index+2) % ptn.length]])
  tmp= []
  tmp.push(ptn[(index + 2 + i) % ptn.length]) for i in[0...ptn.length-1]
  shape.setShape(tmp)
  console.timeEnd("tijder")

  #shape.setShape([ptn[(index + 2 + i) % ptn.length] ] for i in[0...ptn.length-2])


PTN2 = [
  new Punt(10,50)
  new Punt(350,200)
  new Punt(270,300)
  new Punt(50,350)
  new Punt(90,210)
  new Punt(30,210)
]

rpunt = (c, alfa, r) ->
  new Punt(c.x + r * Math.cos(alfa), c.y + r * Math.sin(alfa))



center= new Punt(CW/2, CH/2)

medianx = (ptn) ->
  tmp=0
  tmp += pt.x for pt in ptn
  tmp /= ptn.length
  #say( "&&&&&& tmp= #{tmp} &&&&&&&")

###
window.MAAK2 = (h,c,r,tens) ->
  TMP = []
  del = Math.random()*2*Math.PI
  pi2 = 2* Math.PI + del
  while(del< pi2)
    d= r* Math.random()
    TMP.push(c.x + d * Math.cos(del))
    TMP.push(c.y + d * Math.sin(del))
    del += Math.random() * h
  parray=solve(TMP, tens)
  return parray


###

MAAK = (h, shape=oranje) ->
  TMP = []
  del = Math.random()*2*Math.PI
  pi2 = 2* Math.PI + del
  while(del< pi2)
    TMP.push(rpunt(center, del, Math.random() * CH / 2))
    del += Math.random() * h
  shape.setShape(TMP)
  shape.Z()
  #mdx = medianx(TMP)
  #return mdx

mx1 = MAAK(2,oranje)
say( "mx1 = #{mx1}")


aantal = (del) ->
  tmp = 0
  i = 0
  while(tmp < 2 * Math.PI)
    tmp += del * Math.random()
    i++
  return i

avrg = (f, a, n) ->
  res = 0
  res += f(a) for i in [0...n]
  return (res/n)

say("met x = #{x} :  #{avrg(MAAK, x, 150)}") for x in [1, 1.5, 2.5, 3 ]

rood.clearPath()
groen.clearPath()
oranje.clearPath()
MAAK(2.8,oranje)
MAAK(2.8,groen)
MAAK(2.8,rood)
rood.redraw()
groen.redraw()
oranje.redraw()

stringr =rood.getString()
stringg =groen.getString()
string0 =oranje.getString()


say(stringr)




groen.animate('loop').plot(stringr)
groen.animate().plot(string0)
oranje.animate().plot(stringr)

try
  groen.animate().plot(stringr)
catch error
  warn(error)
  warn("FUCK SHIT")

say("huhdd?")



#$('#koffie').text( "#{PTN2[(1+1) % PTN2.length].x}")
#say("ok")
#_spliceCorner(PTN2, 2, rood, groen)
#say("ok")
###
