const compile = require('./comileTpl')

const ret = compile('./templates/action.js', {
  name: 'aciton',
  namespace: '/test'
})

console.log(ret)
