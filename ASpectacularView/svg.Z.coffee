




CW=400
CH=400

class Punt
  constructor: (x, y) ->
    @x=x
    @y=y

  mirrorX: (x) ->
    @x += 2 * (x-@x)



window.Punt = ( x, y) ->
  new Punt(x,y)


window.solvecheck = (data, k) ->
  if k == null
    k = 1
  size = data.length
  console.log(data)
  last = size - 4
  #alert("we proberen nu een gewone te maken")
  #bzz = new Bezier([])
  #alert("het is ons misschien gelukt: #{bzz}")
  alert("we proberen nu een polybez te maken")
  #pbezier = new PolyBezier([])
  alert("het is ons misschien gelukt: #{pbezier}")



  i = 0
  while i < size - 2
    x0 = if i then data[i - 2] else data[size - 2]
    y0 = if i then data[i - 1] else data[size - 1]
    x1 = data[i + 0]
    y1 = data[i + 1]
    x2 = data[i + 2]
    y2 = data[i + 3]
    x3 = if i != last then data[i + 4] else data[0]
    y3 = if i != last then data[i + 5] else data[1]
    cp1x = x1 + (x2 - x0) / 6 * k
    cp1y = y1 + (y2 - y0) / 6 * k
    cp2x = x2 - ((x3 - x1) / 6 * k)
    cp2y = y2 - ((y3 - y1) / 6 * k)
    bz= new Bezier(x1,y1,cp1x,cp1y,cp2x,cp2y,x2,y2)

    if bz.intersects().length
      return null

    if(! pbezier?)
      console.log(i)
      console.log(bz)
      pbezier=new Bezier([bz])

    return null if bz.intersects(BZ).length for BZ in pbezier.curves

    pbezier.addCurve(bz)
    i += 2

  x0 = data[size - 4]
  y0 = data[size - 3]
  x1 = data[size - 2]
  y1 = data[size - 1]
  x2 = data[0]
  y2 = data[1]
  x3 = data[2]
  y3 = data[3]
  cp1x = x1 + (x2 - x0) / 6 * k
  cp1y = y1 + (y2 - y0) / 6 * k
  cp2x = x2 - ((x3 - x1) / 6 * k)
  cp2y = y2 - ((y3 - y1) / 6 * k)

  bz= new Bezier(x1,y1,cp1x,cp1y,cp2x,cp2y,x2,y2)

  if bz.intersects().length
    return null

  return null if bz.intersects(BZ).length for BZ in pbezier.curves

  pbezier.addCurve(bz)
  return pbezier


# ---
# generated by js2coffee 2.2.0





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
  parray=solvecheck(TMP, tens)
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
###
solve = (data, k) ->
  if k == null
    k = 1
  size = data.length
  last = size - 4
  path = 'M' + [
    data[0]
    data[1]
  ]
  pc =
    x1: data[0]
    y1: data[1]
  curves = []
  i = 0
  while i < size - 2
    x0 = if i then data[i - 2] else data[size - 2]
    y0 = if i then data[i - 1] else data[size - 1]
    x1 = data[i + 0]
    y1 = data[i + 1]
    x2 = data[i + 2]
    y2 = data[i + 3]
    x3 = if i != last then data[i + 4] else data[0]
    y3 = if i != last then data[i + 5] else data[1]
    cp1x = x1 + (x2 - x0) / 6 * k
    cp1y = y1 + (y2 - y0) / 6 * k
    cp2x = x2 - ((x3 - x1) / 6 * k)
    cp2y = y2 - ((y3 - y1) / 6 * k)
    pc['cx' + i + 1] = cp1x
    pc['cy' + i + 1] = cp1y
    pc['cx' + i + 2] = cp2x
    pc['cy' + i + 2] = cp2y
    pc['x' + i / 2 + 2] = x2
    pc['y' + i / 2 + 2] = y2
    i += 2
  x0 = data[size - 4]
  y0 = data[size - 3]
  x1 = data[size - 2]
  y1 = data[size - 1]
  x2 = data[0]
  y2 = data[1]
  x3 = data[2]
  y3 = data[3]
  cp1x = x1 + (x2 - x0) / 6 * k
  cp1y = y1 + (y2 - y0) / 6 * k
  cp2x = x2 - ((x3 - x1) / 6 * k)
  cp2y = y2 - ((y3 - y1) / 6 * k)
  pc['cx' + size - 1] = cp1x
  pc['cy' + size - 1] = cp1y
  pc['cx' + size] = cp2x
  pc['cy' + size] = cp2y
  pc['x' + size / 2 + 1] = x2
  pc['y' + size / 2 + 1] = y2
  pc

# ---
# generated by js2coffee 2.2.0
###
