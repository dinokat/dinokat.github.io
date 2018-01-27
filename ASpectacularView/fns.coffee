fns={}

fns.ran = (r) ->
  r[Math.floor(Math.random()*r.length)]

fns.isnul = (t) ->
  Math.abs(t) < 0.001

window.fns = fns
