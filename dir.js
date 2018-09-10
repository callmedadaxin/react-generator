const fs = require('fs')
const path = require('path')
const config = require('./config.report')
const esformatter = require('esformatter');
const chalk = require('chalk');
//register plugin manually
esformatter.register(require('esformatter-jsx'));

const msgType = {
  dir: '创建文件夹',
  file: '生成文件'
}
const logFn = (type = 'file', msg) => {
  console.log(chalk.cyan(`${msgType[type]}: ${msg}`))
}
const log = {
  dir (msg) {
    logFn('dir', msg)
  },
  file (msg) {
    logFn('file', msg)
  }
}

const options = {
  "jsx": {
    "formatJSX": true, //Duh! that's the default
    "attrsOnSameLineAsTag": false, // move each attribute to its own line
    "maxAttrsOnTag": 2, // if lower or equal than 3 attributes, they will be kept on a single line
    "firstAttributeOnSameLine": true, // keep the first attribute in the same line as the tag
    "formatJSXExpressions": true, // default true, if false jsxExpressions won't be recursively formatted
    "JSXExpressionsSingleLine": true, // default true, if false the JSXExpressions might span several lines
    "alignWithFirstAttribute": false, // do not align attributes with the first tag
    "spaceInJSXExpressionContainers": " ", // default to one space. Make it empty if you don't like spaces between JSXExpressionContainers
    "removeSpaceBeforeClosingJSX": false, // default false. if true <React.Something /> => <React.Something/>
    "closingTagOnNewLine": false, // default false. if true attributes on multiple lines will close the tag on a new line
    "JSXAttributeQuotes": "", // possible values "single" or "double". Leave it as empty string if you don't want to modify the attributes' quotes
  },
}

module.exports = (config) => {
  const resolve = p => path.join(config.root, p)

  const make = (p) => {
    if (fs.existsSync(resolve(p))) return
    fs.mkdirSync(resolve(p))
    log.dir(p)
  }

  make('')
  make('components')
  make('actions')
  make('reducers')
  make('containers')

  return {
    make: make,
    write: (p, content) => {
      fs.writeFileSync(
        resolve(p),
        esformatter.format(content, options),
        // content,
        'utf8'
      )
      log.file(p)
    }
  }
}