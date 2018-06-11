const fs = require('fs')
const path = require('path')
const config = require('./config')
const resolve = p => path.resolve(__dirname, path.join(config.root, p))

exports.make = (p) => {
  if (fs.existsSync(resolve(p))) return
  fs.mkdirSync(resolve(p))
}

exports.write = (p, content) => {
  fs.writeFileSync(resolve(p), content, 'utf8')
}