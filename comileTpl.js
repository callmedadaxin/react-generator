const Handle = require('handlebars')
const fs = require('fs')
const path = require('path')

const resolve = p => path.resolve(__dirname, p)

Handle.registerHelper('upper', name => {
  return name.split('').map((item, index) => {
    return index === 0 ? item.toUpperCase() : item
  }).join('')
})

module.exports = (path, data) => {
  const tpl = fs.readFileSync(resolve(path), 'utf8')
  return Handle.compile(tpl)(data)
}