const Handle = require('handlebars')
const fs = require('fs')
const path = require('path')

const resolve = p => path.resolve(__dirname, p)

const getObjectStr = obj => {
  const ret = JSON.stringify(obj) || ''
  return ret.replace(/"/g, '')
}

Handle.registerHelper('upper', name => {
  return name.split('').map((item, index) => {
    return index === 0 ? item.toUpperCase() : item
  }).join('')
})

const formMap = {
  Input: () => `<Input />`,
  Textarea: () => `<Input type="textarea" />`,
  Radio: () => {
    return `<RadioGroup>
      <Radio label="男" value="male" />
      <Radio label="女" value="female" />
    </RadioGroup>`
  },
  Select: field => `<Select options={fields.${field.key}.options} />`,
  MultiInput: () => `<MultiInput />`
}

const getDefault = (item) => {
  return {
    Input: "''",
    Textarea: "''",
    Radio: "''",
    Select: "''",
    MultiInput: '[]'
  }[item.type] || "''"
}

Handle.registerHelper('field', fields => {
  return fields.map(field => {
    return `<div className="row">
      <FormItem label="${field.label}" field="${field.key}"${field.placeholder ? ` placeholder="${field.placeholder}"` : ''}>
        ${formMap[field.type](field)}
      </FormItem>
    </div>`
  }).join(`\n`)
})

Handle.registerHelper('fieldObject', fields => {
  let ret = []
  
  fields.forEach(item => {
    ret.push(
      `${item.key}: {
        value: field.${item.key} || ${getDefault(item)},${item.validators ? `\n        validators: ${getObjectStr(item.validators)},` : ''}${item.options ? `\noptions: ${getObjectStr(item.options)}` : ''}
      }`,
    )
  })
  return ret.join(',\n')
})

Handle.registerHelper('fieldImport', fields => {
  return fields.map(item => item.type).join(', ')
})

module.exports = (path, data) => {
  const tpl = fs.readFileSync(resolve(path), 'utf8')
  return Handle.compile(tpl)(data)
}