var t = require('tap')
var psEval = require('../lib/photoshop-eval')

t.test("script return the correct result", function(t){
  t.plan(1)
  psEval('1 + 1').on('data', function(data){
    t.is(JSON.parse(data), 2)
  })
})

t.test("consecutive scripts wait for the previous script to end", function(t){
  t.plan(2)
  psEval('$.sleep(1000)').on('end', function(){
    t.pass('first script')
  })
  psEval('"lulz"').once('end', function(){
    t.pass('second script')
  })
})

t.test("multiple scripts return the correct result", function(t){
  t.plan(5)
  var e
  e = psEval('1 + 1')
  e.on('data', function(data){ t.is(JSON.parse(data), 1+1) })
  e.on('error', t.fail.bind(t))
  
  e = psEval('2 + 2')
  e.on('data', function(data){ t.is(JSON.parse(data), 2+2) })
  e.on('error', t.fail.bind(t))
  
  e = psEval('3 + 3')
  e.on('data', function(data){ t.is(JSON.parse(data), 3+3) })
  e.on('error', t.fail.bind(t))
  
  e = psEval('4 + 4')
  e.on('data', function(data){ t.is(JSON.parse(data), 4+4) })
  e.on('error', t.fail.bind(t))
  
  e = psEval('5 + 5')
  e.on('data', function(data){ t.is(JSON.parse(data), 5+5) })
  e.on('error', t.fail.bind(t))
  
})
